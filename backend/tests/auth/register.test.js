import request from "supertest";
import app from "../../app.js";

describe("User Registration", () => {
  test("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "user",
        email: "user@test.com",
        password: "123456",
      });

    expect(response.status).toBe(201);
  });
});