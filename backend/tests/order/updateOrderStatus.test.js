import request from "supertest";
import bcrypt from "bcrypt";
import app from "../../app.js";

import User from "../../src/models/User.js";
import Order from "../../src/models/Order.js";

describe("Update Order Status", () => {

    test("admin should update order status", async () => {

        // Create admin
        const adminPassword = await bcrypt.hash("12345678", 10);

        await User.create({
            name: "Admin",
            email: "admin@test.com",
            password: adminPassword,
            role: "admin",
        });

        const adminAgent = request.agent(app);

        await adminAgent
            .post("/api/auth/login")
            .send({
                email: "admin@test.com",
                password: "12345678",
            });

        // Create normal user
        const userPassword = await bcrypt.hash("12345678", 10);

        const user = await User.create({
            name: "User",
            email: "user@test.com",
            password: userPassword,
        });

        // Create order directly
        const order = await Order.create({
            user: user._id,
            vehicle: "507f1f77bcf86cd799439011", // Dummy ObjectId
            quantity: 1,
            totalPrice: 4500000,
            paymentMethod: "COD",
            address: "Delhi",
            phone: "9876543210",
        });

        // Update status
        const response = await adminAgent
            .patch(`/api/orders/${order._id}/status`)
            .send({
                status: "Confirmed",
            });

        expect(response.status).toBe(200);
        expect(response.body.message)
            .toBe("Order status updated successfully");

        expect(response.body.order.status)
            .toBe("Confirmed");

    });

    test("should return 400 for invalid status", async () => {

        const adminPassword = await bcrypt.hash("12345678", 10);

        await User.create({
            name: "Admin",
            email: "admin2@test.com",
            password: adminPassword,
            role: "admin",
        });

        const adminAgent = request.agent(app);

        await adminAgent
            .post("/api/auth/login")
            .send({
                email: "admin2@test.com",
                password: "12345678",
            });

        const userPassword = await bcrypt.hash("12345678", 10);

        const user = await User.create({
            name: "User",
            email: "user2@test.com",
            password: userPassword,
        });

        const order = await Order.create({
            user: user._id,
            vehicle: "507f1f77bcf86cd799439011",
            quantity: 1,
            totalPrice: 4500000,
            paymentMethod: "COD",
            address: "Delhi",
            phone: "9876543210",
        });

        const response = await adminAgent
            .patch(`/api/orders/${order._id}/status`)
            .send({
                status: "Flying",
            });

        expect(response.status).toBe(400);
        expect(response.body.message)
            .toBe("Invalid order status");

    });

    test("should return 404 when order does not exist", async () => {

        const adminPassword = await bcrypt.hash("12345678", 10);

        await User.create({
            name: "Admin",
            email: "admin3@test.com",
            password: adminPassword,
            role: "admin",
        });

        const adminAgent = request.agent(app);

        await adminAgent
            .post("/api/auth/login")
            .send({
                email: "admin3@test.com",
                password: "12345678",
            });

        const response = await adminAgent
            .patch("/api/orders/507f1f77bcf86cd799439011/status")
            .send({
                status: "Confirmed",
            });

        expect(response.status).toBe(404);
        expect(response.body.message)
            .toBe("Order not found");

    });

    test("normal user should not update order status", async () => {

        const password = await bcrypt.hash("12345678", 10);

        await User.create({
            name: "User",
            email: "user4@test.com",
            password,
        });

        const agent = request.agent(app);

        await agent
            .post("/api/auth/login")
            .send({
                email: "user4@test.com",
                password: "12345678",
            });

        const response = await agent
            .patch("/api/orders/507f1f77bcf86cd799439011/status")
            .send({
                status: "Confirmed",
            });

        expect(response.status).toBe(403);
        expect(response.body.message)
            .toBe("Admin access required");

    });

});