import request from "supertest";
import app from "../../app.js";
import bcrypt from "bcrypt";
import User from "../../src/models/User.js";

describe("Get Vehicles", () => {

    test("should return all vehicles", async () => {

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

        const token = loginResponse.body.token;

        // Create first vehicle
        await agent
            .post("/api/vehicles")
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 10,
            });

        // Create second vehicle
        await agent
            .post("/api/vehicles")
            .send({
                make: "Honda",
                model: "City",
                category: "Sedan",
                price: 1800000,
                quantity: 7,
            });

        const response = await agent
            .get("/api/vehicles");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);

    });

});