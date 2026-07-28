import request from "supertest";
import app from "../../app.js";


describe("Restock Vehicle", () => {

    test("should restock vehicle by admin", async () => {


        // Register admin
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "restock@test.com",
                password: "12345678",
                role: "admin"
            });


        // Login admin
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: "restock@test.com",
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


        // Restock
        const response = await request(app)
            .patch(`/api/vehicles/${vehicleId}/restock`)
            .set(
                "Authorization",
                `Bearer ${token}`
            )
            .send({
                quantity: 10
            });


        expect(response.status).toBe(200);

        expect(response.body.vehicle.quantity)
            .toBe(15);

    });

});