import request from "supertest";
import app from "../../app.js";
import bcrypt from "bcrypt";
import User from "../../src/models/User.js";

describe("Purchase Vehicle", () => {

    test("should purchase a vehicle and reduce quantity", async () => {

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


        const adminToken = token;


        // Create vehicle
        const vehicleResponse = await agent
            .post("/api/vehicles")
            .send({
                make: "Toyota",
                model: "Fortuner",
                year: 2024,
                category: "SUV",
                price: 4500000,
                quantity: 5,
                color: "White",
                fuelType: "Diesel",
                transmission: "Automatic",
                engine: "2.8L Diesel",
                mileage: "14 km/l",
                seatingCapacity: 7,
                image: "https://example.com/fortuner.jpg",
                description: "Premium 7-seater SUV with advanced safety features."
            });


        const vehicleId = vehicleResponse.body.vehicle._id;


        // Purchase vehicle
        const response = await agent
            .post(`/api/vehicles/${vehicleId}/purchase`);

        expect(response.status).toBe(200);
        expect(response.body.vehicle.quantity)
            .toBe(4);

    });

    test("should not purchase vehicle with zero quantity", async () => {

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

        const adminToken = token;


        // Create vehicle with zero quantity
        const vehicleResponse = await agent
            .post("/api/vehicles")
            .send({
                make: "Toyota",
                model: "Fortuner",
                year: 2024,
                category: "SUV",
                price: 4500000,
                quantity: 0,
                color: "White",
                fuelType: "Diesel",
                transmission: "Automatic",
                engine: "2.8L Diesel",
                mileage: "14 km/l",
                seatingCapacity: 7,
                image: "https://example.com/fortuner.jpg",
                description: "Premium 7-seater SUV with advanced safety features."
            });

        const vehicleId = vehicleResponse.body.vehicle._id;

        // Try purchasing
        const response = await agent
            .post(`/api/vehicles/${vehicleId}/purchase`);

        expect(response.status).toBe(400);

        expect(response.body.message)
            .toBe("Vehicle is out of stock");

    });
});