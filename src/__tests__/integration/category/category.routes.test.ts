import request from "supertest"
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import { mockedUserLogin, mockedUserRequest } from "../../mocks/users.mocks"

describe("Login user route test", () => {
    let con: DataSource
    const baseUrl: string = "/categories"

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => con = res)
        .catch(err => console.error(err))
    })

    afterAll(async () => {
        await con.destroy()
    })

    it("Should be able to list categories", async () => {
        await request(app).post("/users").send(mockedUserRequest)
        const user = await request(app).post("/login").send(mockedUserLogin)

        const response = await request(app).get(`${baseUrl}`).set("Authorization", `Bearer ${user.body.token}`)

        expect(response.body).toHaveLength(8)
        expect(response.status).toBe(200)
    })

    it("Should not be able to list categories without token", async () => {
        const response = await request(app).get(`${baseUrl}`)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
})