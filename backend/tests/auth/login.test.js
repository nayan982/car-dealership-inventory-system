import request from "supertest";
import app from "../../app.js";

describe("User Login", () => {
    test("should login successfully with valid credentials", async () => {

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "user",
                email: "user@test.com",
                password: "12345678",
            });

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "user@test.com",
                password: "12345678",
            });


        expect(response.status).toBe(200);
    });

    test("should return 401 for invalid password", async () => {
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "user",
                email: "user@test.com",
                password: "12345678",
            });

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "user@test.com",
                password: "wrongpassword",
            });

        expect(response.status).toBe(401);
    });

    test("should return 404 if user does not exist", async () => {

        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "notexist@test.com",
                password: "12345678",
            });


        expect(response.status).toBe(404);
        expect(response.body.message)
            .toBe("User not found");

    });

    test("should return JWT token in HTTP-only cookie after successful login", async () => {

        await request(app)
            .post("/api/auth/register")
            .send({
                name: "user",
                email: "jwt@test.com",
                password: "12345678",
            });


        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "jwt@test.com",
                password: "12345678",
            });

        expect(response.status).toBe(200);
        expect(response.headers["set-cookie"]).toBeDefined();
        expect(response.headers["set-cookie"][0]).toContain("token=");

    });
});