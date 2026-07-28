import request from "supertest";
import app from "../../app.js";
import bcrypt from "bcrypt";
import User from "../../src/models/User.js";

describe("Delete Vehicle", () => {

    test("should delete a vehicle by admin", async () => {

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
                quantity: 5
            });


        const vehicleId = vehicleResponse.body.vehicle._id;


        // Delete vehicle
        const response = await agent
            .delete(`/api/vehicles/${vehicleId}`)

        expect(response.status).toBe(200);
        expect(response.body.message)
            .toBe("Vehicle deleted successfully");

    });

    test("should not allow normal user to delete vehicle", async () => {
        const agent = request.agent(app);
        await agent
            .post("/api/auth/register")
            .send({
                name: "User",
                email: "userdelete@test.com",
                password: "12345678"
            });


        const login = await agent
            .post("/api/auth/login")
            .send({
                email: "userdelete@test.com",
                password: "12345678"
            });


        const token = login.body.token;


        const response = await agent
            .delete("/api/vehicles/someid")

        expect(response.status).toBe(403);

    });
});