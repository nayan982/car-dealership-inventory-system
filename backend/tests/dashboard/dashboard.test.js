import request from "supertest";
import bcrypt from "bcrypt";
import app from "../../app.js";

import User from "../../src/models/User.js";

describe("Dashboard", () => {

    test("admin should access dashboard", async () => {

        const password =
            await bcrypt.hash(
                "12345678",
                10
            );

        await User.create({

            name: "Admin",

            email: "admin@test.com",

            password,

            role: "admin",

        });

        const agent =
            request.agent(app);

        await agent
            .post("/api/auth/login")
            .send({

                email: "admin@test.com",

                password: "12345678",

            });

        const response =
            await agent.get(
                "/api/dashboard"
            );

        expect(response.status)
            .toBe(200);

        expect(response.body)
            .toHaveProperty(
                "totalUsers"
            );

        expect(response.body)
            .toHaveProperty(
                "totalVehicles"
            );

        expect(response.body)
            .toHaveProperty(
                "totalOrders"
            );

        expect(response.body)
            .toHaveProperty(
                "totalRevenue"
            );

    });

});