import request from "supertest";
import app from "../../app.js";
import bcrypt from "bcrypt";
import User from "../../src/models/User.js";

describe("Get My Orders", () => {

  test("should return logged in user's orders", async () => {

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

    const response = await agent.get(
      "/api/orders/my-orders"
    );

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

  });

});