const sinon = require("sinon");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const expect = require("chai").expect;

describe("User endpoint", () => {
  describe("Signup endpoint", () => {
    afterEach(() => {
      sinon.restore();
    });

    it("should register a new user", async () => {
      const userData = {
        email: "test@example.com",
        password: "Ciao123!",
        username: "TestUsername",
      };

      const signupStub = sinon.stub(User, "signup").resolves(userData);

      const response = await supertest(app)
        .post("/api/users/signup")
        .send(userData);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(userData);

      signupStub.restore();
    });

    it("should handle errors during user creation", async () => {
      const userData = {
        email: "test@example.com",
        password: "Ciao123!",
        username: "TestUsername",
      };

      const signupStub = sinon
        .stub(User, "signup")
        .rejects(new Error("Mocked error"));

      const response = await supertest(app)
        .post("/api/users/signup")
        .send(userData);

      expect(response.status).to.equal(400);
      expect(response.body).to.have.property("error");

      signupStub.restore();
    });

    describe("Login endpoint", () => {
      afterEach(() => {
        sinon.restore();
      });

      it("should login a user", async () => {
        const userData = {
          email: "test@example.com",
          password: "Ciao123!",
        };

        const loginStub = sinon.stub(User, "login").resolves({
          _id: "someUserId",
        });

        const response = await supertest(app)
          .post("/api/users/login")
          .send(userData);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("email");
        expect(response.body).to.have.property("id");
        expect(response.body).to.have.property("token");

        loginStub.restore();
      });

      it("should handle login errors", async () => {
        const userData = {
          email: "test@example.com",
          password: "InvalidPassword",
        };

        const loginStub = sinon
          .stub(User, "login")
          .rejects(new Error("Invalid credentials"));

        const response = await supertest(app)
          .post("/api/users/login")
          .send(userData);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("error");

        loginStub.restore();
      });
    });
  });
});
