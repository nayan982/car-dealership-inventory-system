import request from "supertest";
import app from "../../app.js";


describe("User Logout",()=>{


test("should logout user",async()=>{

    const agent=request.agent(app);

  await request(app)
            .post("/api/auth/register")
            .send({
                name: "user",
                email: "user@test.com",
                password: "12345678",
            });
    await agent
    .post("/api/auth/login")
    .send({
        email:"user@test.com",
        password:"12345678"
    });


    const response=await agent
    .post("/api/auth/logout");


    expect(response.status).toBe(200);

    expect(response.body.message)
    .toBe("Logout successful");

});

});