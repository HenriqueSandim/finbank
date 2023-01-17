import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import {
  mockedUserLogin,
  mockedUserRequest,
  mockedUserRequest2,
} from "../../mocks/users.mocks";

describe("Login user route test", () => {
  let con: DataSource;
  const baseUrl: string = "/login";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (con = res))
      .catch((err) => console.error(err));
  });

  afterAll(async () => {
    await con.destroy();
  });

  it("Should be active user", async () => {
    const userIDActive = await request(app)
      .post("/users")
      .send(mockedUserRequest);
    const response = await request(app).get(
      `/users/active/${userIDActive.body.id}`
    );

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(200);
  });

  it("Should be able to login with user", async () => {
    const response = await request(app).post(baseUrl).send(mockedUserLogin);

    expect(response.body).toHaveProperty("token");
    expect(response.status).toBe(200);
  });

  it("Should not be able to login with incorrect email", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send({ ...mockedUserLogin, email: "inexistent@mail.com" });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("Should not be able to login with incorrect CPF", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send({ cpf: "711.526.667-82", password: "Tt123!@#" });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("Should not be able to login with incorrect password", async () => {
    const response = await request(app)
      .post(baseUrl)
      .send({ ...mockedUserLogin, password: "bananafrita" });

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });
});
