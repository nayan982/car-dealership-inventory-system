import request from "supertest";
import app from "../../app.js";

describe("Delete Vehicle", () => {

    test("should delete a vehicle by admin", async () => {

        // Register admin
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "delete@test.com",
                password: "12345678",
                role: "admin"
            });


        // Login admin
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: "delete@test.com",
                password: "12345678"
            });


        const token = loginResponse.body.token;


        // Create vehicle
        const vehicleResponse = await request(app)
            .post("/api/vehicles")
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5
            });


        const vehicleId = vehicleResponse.body.vehicle._id;


        // Delete vehicle
        const response = await request(app)
            .delete(`/api/vehicles/${vehicleId}`)
            .set(
                "Authorization",
                `Bearer ${token}`
            );


        expect(response.status).toBe(200);
        expect(response.body.message)
            .toBe("Vehicle deleted successfully");

    });

});