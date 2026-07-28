import request from "supertest";
import app from "../../app.js";

describe("Get Vehicles", () => {

  test("should return all vehicles", async () => {

    // Register
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@test.com",
        password: "12345678",
        role: "admin",
      });

    // Login
    const loginResponse = await request(app)
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "12345678",
      });

    const token = loginResponse.body.token;

    // Create first vehicle
    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Toyota",
        model: "Fortuner",
        category: "SUV",
        price: 4500000,
        quantity: 10,
      });

    // Create second vehicle
    await request(app)
      .post("/api/vehicles")
      .set("Authorization", `Bearer ${token}`)
      .send({
        make: "Honda",
        model: "City",
        category: "Sedan",
        price: 1800000,
        quantity: 7,
      });

    const response = await request(app)
      .get("/api/vehicles")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);

  });

});