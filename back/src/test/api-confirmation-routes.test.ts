import supertest from "supertest";
import server from '../server';

import jwt from "jsonwebtoken";

afterEach(() => {
  jest.clearAllMocks();
});

describe("deberias logearte con un nombre", () => {
  it("deberia retornar status 200 si escribiste un usuario", async () => {
    const user = { username: "pablo" }
    const { statusCode, body } = await supertest(server)
      .post("/security/login")
      .set("content-type", "application/json")
      .send(user)
      .expect('Content-Type', /application\/json/)

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty("username")
  });
  it("deberia retornar status 401 si no escribiste un usuario", async () => {
    const { statusCode } = await supertest(server)
      .post("/security/login")
      .send({ username: "" })
      .expect('Content-Type', /application\/json/)

    expect(statusCode).toBe(401)
  });
});

describe("buscar pokemons", () => {
  const $jwt = jwt.sign({ username: "pablo" }, `${process.env.JWT_SECRET}`);
  describe("deberia retornar todos los pokemons", () => {
    it("deberia retornar 200 si encuentra todos los pokemons", async () => {
      const { statusCode, body } = await supertest(server)
      .get("/protected/pokemons")
      .set("Authorization", `Bearer ${$jwt}`)
      .query({ page: 1 })
      .expect('Content-Type', /application\/json/)

    expect(statusCode).toBe(200)
    expect(body).toHaveProperty("data")
    })
    it("deberia retornar 403 si no estas autentificado", async () => {
      const { statusCode, body } = await supertest(server)
      .get("/protected/pokemons")
      .query({ page: 1 })
      .expect('Content-Type', /application\/json/)

      expect(statusCode).toBe(403)
      expect(body.message).toEqual("Token not valid")
    })
  })
  describe("deberia retornar el pokemon de acuerdo al nombre", () => {
    it("deberia retornar 200 si encuentra el pokemon buscado", async () => {
      const name = "bulbasaur"
      const { statusCode, body } = await supertest(server)
      .get(`/protected/pokemon/${name}`)
      .set("Authorization", `Bearer ${$jwt}`)
      .expect('Content-Type', /application\/json/)

      expect(statusCode).toBe(200)
      expect(body).toHaveProperty("data")
    })
    it("deberia retornar 404 si no encuentra el pokemon buscado", async () => {
      const name = "pablo"
      const { statusCode } = await supertest(server)
      .get(`/protected/pokemon/${name}`)
      .set("Authorization", `Bearer ${$jwt}`)
      .expect('Content-Type', /application\/json/)

      expect(statusCode).toBe(404)
    })
  })
  describe("deberia retornar el pokemon de acuerdo al tipo" , () => {
    it("deberia retornar 200 si encuentra todo los tipos de pokemons", async () => {
      const { statusCode, body } = await supertest(server)
      .get("/protected/pokemon_types")
      .set("Authorization", `Bearer ${$jwt}`)
      .expect('Content-Type', /application\/json/)

      expect(statusCode).toBe(200)
      expect(body).toHaveProperty("data")
    })
    it("deberia retornar 200 si encuentra el pokemon buscado de acuerdo a su tipo", async () => {
      const type = "fighting"
      const { statusCode } = await supertest(server)
      .get(`/protected/pokemon_types/${type}`)
      .query({ page: 1 })
      .set("Authorization", `Bearer ${$jwt}`)
      .expect('Content-Type', /application\/json/)

      expect(statusCode).toBe(200)
    })
    it("deberia retornar 404 si no encuentra el pokemon buscado de acuerdo a su tipo", async () => {
      const type = "unknown"
      const { statusCode, body } = await supertest(server)
      .get(`/protected/pokemon_types/${type}`)
      .query({ page: 1 })
      .set("Authorization", `Bearer ${$jwt}`)
      .expect('Content-Type', /application\/json/)

      expect(statusCode).toBe(404)
      expect(body).toHaveProperty("data")
    })
  })
})