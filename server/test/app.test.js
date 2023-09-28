const supertest = require("supertest");
const app = require("../app");
const connectDB = require("../database"); // Importa correttamente il modulo database

describe("App", () => {
  before(async () => {
    await connectDB(); // Chiama correttamente la funzione connectDB
  });

  it("Get error 404 route not found", async () => {
    return supertest(app)
      .get("/qwerty")
      .expect("Content-Type", /json/)
      .expect(404);
  });
});
