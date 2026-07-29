import dotenv from "dotenv";
import bcrypt from "bcrypt";

import connectDB from "../src/config/db.js";
import User from "../src/models/User.js";
import Vehicle from "../src/models/Vehicle.js";

dotenv.config();

await connectDB();

try {

    // Remove previous demo data
    await User.deleteMany({
        email: {
            $in: [
                process.env.ADMIN_EMAIL,
                process.env.USER_EMAIL
            ]
        }
    });

    await Vehicle.deleteMany({});

    // Create Admin
    const adminPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
    );

    await User.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: adminPassword,
        role: "admin"
    });

    // Create Demo User
    const userPassword = await bcrypt.hash(
        process.env.USER_PASSWORD,
        10
    );

    await User.create({
        name: process.env.USER_NAME,
        email: process.env.USER_EMAIL,
        password: userPassword,
        role: "user"
    });

    // Vehicles
    await Vehicle.insertMany([

        {
            make: "Toyota",
            model: "Fortuner",
            year: 2024,
            category: "SUV",
            price: 4500000,
            quantity: 8,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            engine: "2.8L Diesel",
            mileage: "14 km/l",
            seatingCapacity: 7,
            image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/44709/fortuner-exterior-right-front-three-quarter-19.jpeg",
            description: "Premium full-size SUV with powerful diesel engine and advanced safety features."
        },

        {
            make: "Honda",
            model: "City",
            year: 2024,
            category: "Sedan",
            price: 1800000,
            quantity: 12,
            color: "Blue",
            fuelType: "Petrol",
            transmission: "Manual",
            engine: "1.5L i-VTEC",
            mileage: "18 km/l",
            seatingCapacity: 5,
            image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-78.jpeg",
            description: "Comfortable family sedan with premium interiors and excellent fuel efficiency."
        },

        {
            make: "Hyundai",
            model: "Creta",
            year: 2024,
            category: "SUV",
            price: 1250000,
            quantity: 10,
            color: "Black",
            fuelType: "Petrol",
            transmission: "Automatic",
            engine: "1.5L Turbo",
            mileage: "17 km/l",
            seatingCapacity: 5,
            image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/106815/creta-exterior-right-front-three-quarter-6.png?isig=0&q=80",
            description: "Feature-packed mid-size SUV with panoramic sunroof and connected technology."
        },

        {
            make: "Mahindra",
            model: "Scorpio N",
            year: 2024,
            category: "SUV",
            price: 1649000,
            quantity: 6,
            color: "Black",
            fuelType: "Diesel",
            transmission: "Automatic",
            engine: "2.2L mHawk",
            mileage: "15 km/l",
            seatingCapacity: 7,
            image: "https://imgd.aeplcdn.com/642x336/n/cw/ec/40432/scorpio-n-exterior-right-front-three-quarter-4.png?isig=0&q=80",
            description: "Rugged SUV with body-on-frame construction and 4X4 capability."
        },

        {
            make: "Tata",
            model: "Nexon",
            year: 2024,
            category: "SUV",
            price: 740000,
            quantity: 15,
            color: "Grassland Beige",
            fuelType: "Petrol",
            transmission: "Manual",
            engine: "1.2L Turbo",
            mileage: "16 km/l",
            seatingCapacity: 5,
            image: "https://imgd.aeplcdn.com/664x374/n/cw/ec/141867/nexon-exterior-right-front-three-quarter-79.png?isig=0&q=80",
            description: "5-star safety rated compact SUV with modern design."
        }

    ]);

    console.log("=================================");
    console.log("Database Seeded Successfully");
    console.log("=================================");
    console.log("");
    console.log("Admin Login");
    console.log("Email :", process.env.ADMIN_EMAIL);
    console.log("Password :", process.env.ADMIN_PASSWORD);
    console.log("");
    console.log("Demo User Login");
    console.log("Email :", process.env.USER_EMAIL);
    console.log("Password :", process.env.USER_PASSWORD);
    console.log("");

    process.exit();

} catch (error) {

    console.log(error);

    process.exit(1);

}