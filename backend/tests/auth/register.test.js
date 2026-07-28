import request from "supertest";
import app from "../../app.js";

describe("User Registration", () => {
    test("should register a new user", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "user",
                email: "user@test.com",
                password: "123456",
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("User registered successfully");
    });

    test("should not register a user with an existing email", async () => {
        // Arrange - register the user once
        await request(app)
            .post("/api/auth/register")
            .send({
                name: "User",
                email: "user@test.com",
                password: "123456",
            });

        // Act - register again with the same email
        const response = await request(app)
            .post("/api/auth/register")
            .send({
                name: "User",
                email: "user@test.com",
                password: "123456",
            });

        // Assert
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty("message");
    });
});