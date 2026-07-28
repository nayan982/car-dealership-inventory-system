import request from "supertest";
import app from "../../app.js";
import Vehicle from "../../src/models/Vehicle.js";
import bcrypt from "bcrypt";
import User from "../../src/models/User.js";

describe("Update Vehicle", () => {

    test("should update vehicle details", async () => {

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


        // Create vehicle
        const vehicleResponse = await agent
            .post("/api/vehicles")
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5,
            });


        const vehicleId = vehicleResponse.body.vehicle._id;


        // Update vehicle
        const response = await agent
            .put(`/api/vehicles/${vehicleId}`)
            .send({
                price: 5000000,
                quantity: 10,
            });


        expect(response.status).toBe(200);
        expect(response.body.vehicle.price).toBe(5000000);
        expect(response.body.vehicle.quantity).toBe(10);

    });

});