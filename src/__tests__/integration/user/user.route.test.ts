import request from "supertest"
import { DataSource } from "typeorm"
import AppDataSource from "../../../data-source"
import app from "../../../app"
import { mockedUserRequest, mockedUserRequest2, mockedUserSameCPF, mockedUserWeakPassword, mockedUserWrongBirthdate, mockedUserWrongCPF } from "../../mocks/users.mocks"

describe("Create user route test", () => {
    let con: DataSource
    const baseUrl: string = "/users"

    beforeAll(async () => {
        await AppDataSource.initialize()
        .then((res) => con = res)
        .catch(err => console.error(err))
    })

    afterAll(async () => {
        await con.destroy()
    })

    it("Should be able to create user", async () => {
        const response = await request(app).post(baseUrl).send(mockedUserRequest)

        expect(response.body).toHaveProperty("id")
        expect(response.body).toHaveProperty("name")
        expect(response.body).toHaveProperty("email")
        expect(response.body).toHaveProperty("birthdate")
        expect(response.body).toHaveProperty("isActive")
        expect(response.body).toHaveProperty("isAdmin")
        expect(response.body).toHaveProperty("createdAt")
        expect(response.body).toHaveProperty("updatedAt")
        expect(response.body).toHaveProperty("account")
        expect(response.body.account).toHaveProperty("money")
        expect(response.body.account).toHaveProperty("id")
        expect(response.body).not.toHaveProperty("password")
        expect(response.body).not.toHaveProperty("deletedAt")
        expect(response.status).toBe(201)
    })

    it("Should not be able to create user with same email", async () => {
        const response = await request(app).post(baseUrl).send(mockedUserRequest) 

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
    })

    it("Should not be able to use the same CPF in two different accounts", async () => {
        const response = await request(app).post(baseUrl).send(mockedUserSameCPF) 

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(409)
    })

    it("Should not be able to create user with invalid CPF", async () => {
        const response = await request(app).post(baseUrl).send(mockedUserWrongCPF)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    it("Should not be able to create user with weak password", async () => {
        const response = await request(app).post(baseUrl).send(mockedUserWeakPassword)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })

    it("Should not be able to create user with invalid date", async () => {
        const response = await request(app).post(`${baseUrl}`).send(mockedUserWrongBirthdate)

        expect(response.body).toHaveProperty("message")
        expect(response.status).toBe(400)
    })


})