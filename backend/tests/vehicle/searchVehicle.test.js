import request from "supertest";
import app from "../../app.js";
import bcrypt from "bcrypt";
import User from "../../src/models/User.js";

describe("Search Vehicles", () => {

    test("should search vehicle by make", async () => {

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

        // Vehicle 1
        await agent
            .post("/api/vehicles")
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5,
            });

        // Vehicle 2
        await agent
            .post("/api/vehicles")
            .send({
                make: "Honda",
                model: "City",
                category: "Sedan",
                price: 1800000,
                quantity: 8,
            });

        const response = await agent
            .get("/api/vehicles/search?make=Toyota");

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].make).toBe("Toyota");

    });

    test("should filter vehicles by price range", async () => {

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


        // Create vehicle 1
        await agent
            .post("/api/vehicles")
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5,
            });


        // Create vehicle 2
        await agent
            .post("/api/vehicles")
            .send({
                make: "Honda",
                model: "City",
                category: "Sedan",
                price: 1800000,
                quantity: 8,
            });


        const response = await agent
            .get("/api/vehicles/search?minPrice=2000000");

        expect(response.status).toBe(200);

        expect(
            response.body.every(vehicle => vehicle.price >= 2000000)
        ).toBe(true);

    });

});