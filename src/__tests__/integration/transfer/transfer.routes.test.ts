import request from "supertest"
import { DataSource, Repository } from "typeorm"
import app from "../../../app"
import AppDataSource from "../../../data-source"
import { mockedFinance } from "../../mocks/finances.mocks"
import { mockedInvalidTranfer, mockedTransfer, mockedUserTransfer } from "../../mocks/transfers.mocks"
import { mockedUserLogin, mockedUserLogin2, mockedUserRequest, mockedUserRequest2 } from "../../mocks/users.mocks"

describe("Transfer route test", () => {
    let con: DataSource
    const baseUrl: string = "/transfer"

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => con = res)
        .catch(err => console.error(err))
        
        const user = await request(app).post("/users").send(mockedUserRequest)
        const user2 = await request(app).post("/users").send(mockedUserRequest2)

        mockedUserTransfer.senderAccount = user.body.account.id
        mockedUserTransfer.receiverAccount = user2.body.account.id
    })

    afterAll(async () => {
        await con.destroy()
    })

    it("POST / Should be able to transfer", async () => {
        const userLogin = await request(app).post("login").send(mockedUserLogin)        

        await request(app).post(`/finances`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedFinance)
        const response = await request(app).post(`${baseUrl}/${mockedUserTransfer.receiverAccount}`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedTransfer)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("date")
        expect(response.body).toHaveProperty("value")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("receiverAccount")
        expect(response.body).toHaveProperty("senderAccount")
        expect(response.status).toBe(201)
    })

    it("POST / Should not be able to transfer value zero", async () => {
        const userLogin = await request(app).post("login").send(mockedUserLogin)        

        await request(app).post(`/finances`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedFinance)
        const response = await request(app).post(`${baseUrl}/${mockedUserTransfer.receiverAccount}`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedInvalidTranfer)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    it("POST / Should not be able to create transference without token", async () => {
        const user = await request(app).post("/users").send(mockedUserRequest)

        const response = await request(app).post(`${baseUrl}/${user.body.account.id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    it("POST / Should not be able to create transference with invalid user id", async () => {
        const userLogin = await request(app).post("login").send(mockedUserLogin)

        const response = await request(app).post(`${baseUrl}/9999999`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedTransfer)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })

    it("POST / Should not be able to transfer to inactive user", async () => {
        const user2Login = await request(app).post("login").send(mockedUserLogin2)   
        await request(app).delete(`${baseUrl}/${mockedUserTransfer.receiverAccount}`).set("Authorization", `Bearer ${user2Login.body.token}`)

        const userLogin = await request(app).post("login").send(mockedUserLogin) 
        await request(app).post(`/finances`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedFinance)

        const response = await request(app).post(`${baseUrl}/${mockedUserTransfer.receiverAccount}`).send(mockedFinance).set("Authorization", `Bearer ${userLogin.body.token}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    it("GET / Should list user transfers", async () => {
        const userLogin = await request(app).post("login").send(mockedUserLogin)

        const response = await request(app).get(`${baseUrl}`).set("Authorization", `Bearer ${userLogin.body.token}`)

        expect(response.body).toHaveLength(1)
        expect(response.status).toBe(200)
    })

    it("GET / Should not be able to create transference without token", async () => {
        const user = await request(app).post("/users").send(mockedUserRequest)

        const response = await request(app).get(`${baseUrl}/${user.body.account.id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
})