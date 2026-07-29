import request from "supertest";
import app from "../../app.js";
import bcrypt from "bcrypt";
import User from "../../src/models/User.js";

describe("Create Vehicle", () => {

  test("should create a new vehicle", async () => {

    // Create admin user directly
    const hashedPassword = await bcrypt.hash(
      "12345678",
      10
    );

    await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: hashedPassword,
      role: "admin",
    });

    const agent = request.agent(app);

    // Login admin
    const loginResponse = await agent
      .post("/api/auth/login")
      .send({
        email: "admin@test.com",
        password: "12345678",
      });

    expect(loginResponse.status).toBe(200);


    // Create Vehicle
    const response = await agent
      .post("/api/vehicles")
      .send({
        make: "Toyota",
        model: "Fortuner",
        year: 2024,
        category: "SUV",
        price: 4500000,
        quantity: 10,

        color: "White",
        fuelType: "Diesel",
        transmission: "Automatic",

        engine: "2.8L Diesel",
        mileage: "14 km/l",
        seatingCapacity: 7,

        image: "https://example.com/fortuner.jpg",

        description: "Premium 7-seater SUV with advanced safety features."
      });


    expect(response.status).toBe(201);
    expect(response.body.message)
      .toBe("Vehicle added successfully");

  });

});