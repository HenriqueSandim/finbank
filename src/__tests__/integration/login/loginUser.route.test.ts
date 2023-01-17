import request from "supertest"
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import { mockedUserLogin } from "../../mocks/users.mocks"

describe("Login user route test", () => {
    let con: DataSource
    const baseUrl: string = "/login"

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => con = res)
        .catch(err => console.error(err))
    })

    afterAll(async () => {
        await con.destroy()
    })

    it("Should be able to login with user", async () => {
        const response = await request(app).post(baseUrl).send(mockedUserLogin)

        expect(response.body).toHaveProperty("token")
        expect(response.status).toBe(200)
    })

    it("Should not be able to login with incorrect email", async () => {
        const response = await request(app).post(baseUrl).send({...mockedUserLogin, email: "inexistent@mail.com"})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    it("Should not be able to login with incorrect CPF", async () => {
        const response = await request(app).post(baseUrl).send({...mockedUserLogin, cpf: "705.566.260-52"})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    it("Should not be able to login with incorrect password", async () => {
        const response = await request(app).post(baseUrl).send({...mockedUserLogin, password: "bananafrita"})

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })
})