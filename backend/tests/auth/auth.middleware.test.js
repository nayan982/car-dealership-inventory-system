import request from "supertest";
import app from "../../app.js";


describe("Authentication Middleware", () => {

    test("should reject request without token", async () => {

        const response = await request(app)
            .post("/api/vehicles");

        expect(response.status).toBe(401);

    });

});