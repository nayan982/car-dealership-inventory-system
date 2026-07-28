import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import User from "../src/models/User.js";
import Vehicle from "../src/models/Vehicle.js";

dotenv.config();

beforeEach(async () => {
  await User.deleteMany({});
  await Vehicle.deleteMany({});
});

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});