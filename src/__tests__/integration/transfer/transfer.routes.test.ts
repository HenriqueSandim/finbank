import request from "supertest"
import { DataSource, Repository } from "typeorm"
import app from "../../../app"
import AppDataSource from "../../../data-source"
import { mockTransfer } from "../../mocks/transfer.mocks"
import { mockedUserLogin, mockedUserRequest, mockedUserRequest2 } from "../../mocks/users.mocks"

describe("Transfer route test", () => {
    let con: DataSource
    const baseUrl: string = "/transfer"

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => con = res)
        .catch(err => console.error(err))
    })

    afterAll(async () => {
        await con.destroy()
    })

    it("Should be able to do a transfer", async () => {
        await request(app).post("/users").send(mockedUserRequest)
        const user2 = await request(app).post("/users").send(mockedUserRequest2)

        const userLogin = await request(app).post("login").send(mockedUserLogin)

        const mockedTransfer = {
            ...mockTransfer,
            receiverId: "", 
            senderId: ""
        }

        const response = await request(app).post(`${baseUrl}/${user2.body.id}`).set("Authorization", `Bearer ${userLogin.body.token}`).send(mockedTransfer)
    })
})