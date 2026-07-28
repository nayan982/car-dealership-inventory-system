import request from "supertest";
import app from "../../app.js";
import User from "../../src/models/User.js";

describe("User Registration", () => {

  test("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "user",
        email: "user@test.com",
        password: "12345678",
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User registered successfully");
  });

  test("should create an admin user with admin role", async () => {

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Admin",
        email: "admin@test.com",
        password: "12345678",
        role: "admin",
      });


    expect(response.status).toBe(201);


    const user = await User.findOne({
      email: "admin@test.com",
    });


    expect(user.role).toBe("admin");

  });

  test("should not register a user with an existing email", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "user",
        email: "user@test.com",
        password: "12345678",
      });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "user",
        email: "user@test.com",
        password: "12345678",
      });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });

  test("should store the password in hashed form", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "user",
        email: "user@test.com",
        password: "12345678",
      });

    const user = await User.findOne({
      email: "user@test.com",
    });

    expect(user).not.toBeNull();
    expect(user.password).not.toBe("12345678");
  });

  test("should return 400 when password is less than 8 characters", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "user",
        email: "user@test.com",
        password: "1234567",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Password must be at least 8 characters long"
    );
  });

  test("should return 400 when name is missing", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        email: "user@test.com",
        password: "12345678",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Name is required");
  });

  test("should return 400 when email is missing", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "user",
        password: "12345678",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Email is required");
  });

  test("should return 400 when password is missing", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "user",
        email: "user@test.com",
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Password is required");
  });

});