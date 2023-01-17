import request from "supertest";
import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import app from "../../../app";
import { mockedUserLogin, mockedUserRequest } from "../../mocks/users.mocks";
import Category from "../../../entities/category.entity";

describe("Login user route test", () => {
  let con: DataSource;
  const baseUrl: string = "/categories";

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (con = res))
      .catch((err) => console.error(err));

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
        {
          name: "Salário",
        },
        {
          name: "Transferência",
        },
      ])
      .execute();
  });

  afterAll(async () => {
    await con.destroy();
  });

  it("Should be able to list categories", async () => {
    const response = await request(app).get(`${baseUrl}`);

    expect(response.body).toHaveLength(9);
    expect(response.status).toBe(200);
  });
});
