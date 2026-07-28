import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../src/config/db.js";
import User from "../src/models/User.js";

dotenv.config();

beforeEach(async () => {
  await User.deleteMany({});
});

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});