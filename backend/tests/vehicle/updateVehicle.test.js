import request from "supertest";
import app from "../../app.js";
import Vehicle from "../../src/models/Vehicle.js";

describe("Update Vehicle", () => {

    test("should update vehicle details", async () => {

        // Register
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "update@test.com",
                password: "12345678",
            });


        // Login
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: "update@test.com",
                password: "12345678",
            });


        const token = loginResponse.body.token;


        // Create vehicle
        const vehicleResponse = await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5,
            });


        const vehicleId = vehicleResponse.body.vehicle._id;


        // Update vehicle
        const response = await request(app)
            .put(`/api/vehicles/${vehicleId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                price: 5000000,
                quantity: 10,
            });


        expect(response.status).toBe(200);
        expect(response.body.vehicle.price).toBe(5000000);
        expect(response.body.vehicle.quantity).toBe(10);

    });

});