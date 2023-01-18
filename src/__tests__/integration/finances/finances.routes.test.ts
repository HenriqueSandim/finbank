import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedUserLogin, mockedUserLogin2, mockedUserRequest, mockedUserRequest2 } from "../../mocks/users.mocks";
import { mockedFinance, mockedFinanceUpdate } from "../../mocks/finances.mocks";
import Category from "../../../entities/category.entity";

describe("Create user route test", () => {
  let con: DataSource;
  const baseUrl: string = "/finances";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (con = res))
      .catch((err) => console.error(err));

    const user = await request(app).post("/users").send(mockedUserRequest);
    const user2 = await request(app).post("/users").send(mockedUserRequest2);
    const confirmUser = await request(app).get(`/users/active/${user.body.id}`);
    const confirmUser2 = await request(app).get(`/users/active/${user2.body.id}`);

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(Category)
      .values([
        {
          name: "Energia",
        },
        {
          name: "Compras",
        },
        {
          name: "Água",
        },
        {
          name: "Internet",
        },
        {
          name: "Boletos",
        },
        {
          name: "Lazer",
        },
        {
          name: "Gasto Mensal",
        },
        { name: "Salário" },
        {
          name: "Transferência",
        },
      ])
      .execute();
  });

  afterAll(async () => {
    await con.destroy();
  });

  it("POST / Should be possible to create finance", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .post(`/finances`)
      .set("Authorization", `Bearer ${userLogin.body.token}`)
      .send(mockedFinance);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toEqual("Finance test");
    expect(response.body).toHaveProperty("value");
    expect(response.body.value).toEqual(1000);
    expect(response.body).toHaveProperty("isIncome");
    expect(response.body.isIncome).toEqual(true);
    expect(response.body).toHaveProperty("isTransference");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.status).toBe(201);
  });

  it("POST / Should not be possible to create finance without token", async () => {
    const response = await request(app).post(baseUrl).send(mockedFinance);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("POST / Should not be possible to create finance with negative value", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .post(baseUrl)
      .send({ ...mockedFinance, value: -10 })
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("POST / Should not be possible to create finance with value zero", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app)
      .post(baseUrl)
      .send({ ...mockedFinance, value: 0 })
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(400);
  });

  it("GET / Should be able to list user finances", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const response = await request(app).get(baseUrl).set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  it("GET / Should not be able to list user finances without token", async () => {
    const response = await request(app).get(baseUrl);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("PATCH / Should be able to update finance", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const createdFinance = await request(app)
      .post(baseUrl)
      .send(mockedFinance)
      .set("Authorization", `Bearer ${userLogin.body.token}`);
    const response = await request(app)
      .patch(`${baseUrl}/${createdFinance.body.id}`)
      .send(mockedFinanceUpdate)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("description");
    expect(response.body.description).toEqual("Test finance att");
    expect(response.body).toHaveProperty("value");
    expect(response.body.value).toEqual(1000);
    expect(response.body).toHaveProperty("isIncome");
    expect(response.body.isIncome).toEqual(true);
    expect(response.body).toHaveProperty("isTransference");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.financesCategory[0].category.name).toEqual("Internet");
    expect(response.body.financesCategory).toHaveLength(1);
    expect(response.status).toBe(200);
  });

  it("PATCH / Should not be able to update finance of another user", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);
    const createdFinance = await request(app)
      .post(baseUrl)
      .send(mockedFinance)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const user2Login = await request(app).post("/login").send(mockedUserLogin2);
    const response = await request(app)
      .patch(`${baseUrl}/${createdFinance.body.id}`)
      .send(mockedFinanceUpdate)
      .set("Authorization", `Bearer ${user2Login.body.token}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });

  it("DELETE / Should be able to delete finances", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const createdFinance = await request(app)
      .post(baseUrl)
      .send(mockedFinance)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app)
      .delete(`${baseUrl}/${createdFinance.body.id}`)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    expect(response.status).toBe(204);
  });

  it("DELETE / Should not be able to delete finances without token", async () => {
    const userLogin = await request(app).post("/login").send(mockedUserLogin);

    const createdFinance = await request(app)
      .post(baseUrl)
      .send(mockedFinance)
      .set("Authorization", `Bearer ${userLogin.body.token}`);

    const response = await request(app).delete(`${baseUrl}/${createdFinance.body.id}`);

    expect(response.body).toHaveProperty("message");
    expect(response.status).toBe(401);
  });
});
