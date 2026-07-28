import request from "supertest";
import app from "../../app.js";

describe("Purchase Vehicle", () => {

    test("should purchase a vehicle and reduce quantity", async () => {

        // Register user
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "User",
                email: "buyer@test.com",
                password: "12345678"
            });


        // Login user
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: "buyer@test.com",
                password: "12345678"
            });


        const token = loginResponse.body.token;


        // Create admin
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "purchaseadmin@test.com",
                password: "12345678",
                role: "admin"
            });


        const adminLogin = await request(app)
            .post("/api/auth/login")
            .send({
                email: "purchaseadmin@test.com",
                password: "12345678"
            });


        const adminToken = adminLogin.body.token;


        // Create vehicle
        const vehicleResponse = await request(app)
            .post("/api/vehicles")
            .set(
                "Authorization",
                `Bearer ${adminToken}`
            )
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5
            });


        const vehicleId = vehicleResponse.body.vehicle._id;


        // Purchase vehicle
        const response = await request(app)
            .post(`/api/vehicles/${vehicleId}/purchase`)
            .set(
                "Authorization",
                `Bearer ${token}`
            );


        expect(response.status).toBe(200);
        expect(response.body.vehicle.quantity)
            .toBe(4);

    });

    test("should not purchase vehicle with zero quantity", async () => {

    // Register user
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "User",
            email: "stock@test.com",
            password: "12345678"
        });


    // Login user
    const loginResponse = await request(app)
        .post("/api/auth/login")
        .send({
            email: "stock@test.com",
            password: "12345678"
        });


    const token = loginResponse.body.token;


    // Register admin
    await request(app)
        .post("/api/auth/register")
        .send({
            name: "Admin",
            email: "stockadmin@test.com",
            password: "12345678",
            role: "admin"
        });


    const adminLogin = await request(app)
        .post("/api/auth/login")
        .send({
            email: "stockadmin@test.com",
            password: "12345678"
        });


    const adminToken = adminLogin.body.token;


    // Create vehicle with zero quantity
    const vehicleResponse = await request(app)
        .post("/api/vehicles")
        .set(
            "Authorization",
            `Bearer ${adminToken}`
        )
        .send({
            make: "Toyota",
            model: "Fortuner",
            category: "SUV",
            price: 4500000,
            quantity: 0
        });


    const vehicleId = vehicleResponse.body.vehicle._id;


    // Try purchasing
    const response = await request(app)
        .post(`/api/vehicles/${vehicleId}/purchase`)
        .set(
            "Authorization",
            `Bearer ${token}`
        );


    expect(response.status).toBe(400);

    expect(response.body.message)
        .toBe("Vehicle is out of stock");

});
});