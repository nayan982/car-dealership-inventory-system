import request from "supertest";
import app from "../../app.js";

describe("Search Vehicles", () => {

    test("should search vehicle by make", async () => {

        // Register
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "admin@test.com",
                password: "12345678",
            });

        // Login
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: "admin@test.com",
                password: "12345678",
            });

        const token = loginResponse.body.token;

        // Vehicle 1
        await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5,
            });

        // Vehicle 2
        await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Honda",
                model: "City",
                category: "Sedan",
                price: 1800000,
                quantity: 8,
            });

        const response = await request(app)
            .get("/api/vehicles/search?make=Toyota")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].make).toBe("Toyota");

    });

    test("should filter vehicles by price range", async () => {

        // Register
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "Admin",
                email: "admin2@test.com",
                password: "12345678",
            });


        // Login
        const loginResponse = await request(app)
            .post("/api/auth/login")
            .send({
                email: "admin2@test.com",
                password: "12345678",
            });


        const token = loginResponse.body.token;


        // Create vehicle 1
        await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Toyota",
                model: "Fortuner",
                category: "SUV",
                price: 4500000,
                quantity: 5,
            });


        // Create vehicle 2
        await request(app)
            .post("/api/vehicles")
            .set("Authorization", `Bearer ${token}`)
            .send({
                make: "Honda",
                model: "City",
                category: "Sedan",
                price: 1800000,
                quantity: 8,
            });


        const response = await request(app)
            .get("/api/vehicles/search?minPrice=2000000")
            .set("Authorization", `Bearer ${token}`);


        expect(response.status).toBe(200);

        expect(
            response.body.every(vehicle => vehicle.price >= 2000000)
        ).toBe(true);

    });

});