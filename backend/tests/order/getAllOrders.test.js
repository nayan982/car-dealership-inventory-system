import request from "supertest";
import app from "../../app.js";
import bcrypt from "bcrypt";
import User from "../../src/models/User.js";

describe("Get All Orders", () => {

    test("admin should get all orders", async () => {

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

        const login = await agent
            .post("/api/auth/login")
            .send({
                email: "admin@test.com",
                password: "12345678",
            });

        expect(login.status).toBe(200);

        const response = await agent.get("/api/orders");

        expect(response.status).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);

    });

    test("user should not access all orders", async () => {

        const hashedPassword = await bcrypt.hash(
            "12345678",
            10
        );

        await User.create({
            name: "User",
            email: "user@test.com",
            password: hashedPassword,
        });

        const agent = request.agent(app);

        await agent
            .post("/api/auth/login")
            .send({
                email: "user@test.com",
                password: "12345678",
            });

        const response = await agent.get("/api/orders");

        expect(response.status).toBe(403);

        expect(response.body.message)
            .toBe("Admin access required");

    });
});