import request from "supertest"
import { DataSource, Repository } from "typeorm"
import app from "../../../app"
import AppDataSource from "../../../data-source"
import { mockedFinance } from "../../mocks/finances.mocks"
import { mockedTransfer } from "../../mocks/transfers.mocks"
import { mockedUserLogin, mockedUserRequest, mockedUserRequest2 } from "../../mocks/users.mocks"

describe("Transfer route test", () => {
    let con: DataSource
    const baseUrl: string = "/transfer"

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => con = res)
        .catch(err => console.error(err))
        
        const user = await request(app).post("/users").send(mockedUserRequest)
        const user2 = await request(app).post("/users").send(mockedUserRequest2)

        mockedTransfer.senderAccount = user.body.account.id
        mockedTransfer.receiverAccount = user2.body.account.id

        mockedFinance.account = user.body.account.id
    })

    afterAll(async () => {
        await con.destroy()
    })

    it("Should be able to transfer", async () => {
        const { body: {token: userToken} } = await request(app).post("login").send(mockedUserLogin)        

        await request(app).post(`/finances`).set("Authorization", `Bearer ${userToken}`).send()
        const response = await request(app).post(`${baseUrl}/${mockedTransfer.receiverAccount}`).set("Authorization", `Bearer ${userToken}`).send(mockedTransfer)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("description")
        expect(response.body).toHaveProperty("date")
        expect(response.body).toHaveProperty("value")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("receiverAccount")
        expect(response.body).toHaveProperty("senderAccount")
        expect(response.status).toBe(201)
    })

    it("Should not be able to create transference without token", async () => {
        const user = await request(app).post("/users").send(mockedUserRequest)

        const response = await request(app).post(`${baseUrl}/${user.body.account.id}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })

    it("Should not be able to create transference with invalid user id", async () => {
        const userLogin = await request(app).post("login").send(mockedUserLogin)

        const response = await request(app).post(`${baseUrl}/9999999`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedTransfer)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(404)
    })
})