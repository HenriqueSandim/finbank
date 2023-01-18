import request from "supertest"
import { DataSource } from "typeorm"
import app from "../../../app"
import AppDataSource from "../../../data-source"
import { mockedUserLogin, mockedUserRequest } from "../../mocks/users.mocks"

describe("User balance route test", () => {
    let con: DataSource
    const baseUrl: string = "/balance"

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => con = res)
        .catch(err => console.error(err))
    })

    afterAll(async () => {
        await con.destroy()
    })

    it("Should be able to list user balance", async () => {
        const user = await request(app).post("/users").send(mockedUserRequest)
        const confirmUser = await request(app).get(`/users/active/${user.body.id}`);
        const userLogin = await request(app).post("/login").send(mockedUserLogin)
   

        const response = await request(app).get(`${baseUrl}`).set("Authorization", `Bearer ${userLogin.body.token}`)



        expect(response.body).toHaveProperty("money")
        expect(response.status).toBe(200)
    })

    it("Should not be able to list user balance without token", async () => {
        const response = await request(app).get(baseUrl)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(401)
    })
})