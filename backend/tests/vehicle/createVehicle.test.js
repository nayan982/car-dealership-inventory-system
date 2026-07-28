import request from "supertest";
import app from "../../app.js";

describe("Create Vehicle", () => {

  test("should create a new vehicle", async () => {

    // Register
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@test.com",
        password: "12345678",
      });

    // Login
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "12345678",
      });

    const token = loginResponse.body.token;

    // Create Vehicle
    const response = await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 10,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("Vehicle added successfully");
  });

});