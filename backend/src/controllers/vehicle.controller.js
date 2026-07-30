import Order from "../models/Order.js";
import Vehicle from "../models/Vehicle.js";
import mongoose from "mongoose";

export const createVehicle = async (req, res) => {
  try {
    const { make, model, year, category, price, quantity, color, fuelType, transmission, engine, mileage, seatingCapacity, image, description } = req.body;

    const vehicle = await Vehicle.create({
      make,
      model,
      year,
      category,
      price,
      quantity,
      color,
      fuelType,
      transmission,
      engine,
      mileage,
      seatingCapacity,
      image,
      description
    });

    if (quantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be negative"
      });
    }

    return res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
    });

  }
};

export const getVehicles = async (req, res) => {

  try {

    const vehicles = await Vehicle.find();

    return res.status(200).json(vehicles);

  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
    });

  }

};

export const searchVehicles = async (req, res) => {
  try {
    const { q, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (q) {
      const searchRegex = new RegExp(q, "i");

      filter.$or = [
        { make: searchRegex },
        { model: searchRegex }
      ];

      // If the search text is a number, dynamically add the year query too
      if (!isNaN(q) && q.trim() !== "") {
        filter.$or.push({ year: Number(q) });
      }
    }
    if (category) {
      filter.category = category;
    }

    // Pricing range evaluation bounds
    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }
    // if (make) {
    //   filter.make = new RegExp(make, "i");
    // }

    // if (model) {
    //   filter.model = new RegExp(model, "i");
    // }

    // if (category) {
    //   filter.category = new RegExp(category, "i");
    // }

    // if (minPrice || maxPrice) {
    //   filter.price = {};

    //   if (minPrice) {
    //     filter.price.$gte = Number(minPrice);
    //   }

    //   if (maxPrice) {
    //     filter.price.$lte = Number(maxPrice);
    //   }
    // }

    const vehicles = await Vehicle.find(filter);

    return res.status(200).json(vehicles);

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const updateVehicle = async (req, res) => {

  try {

    const { id } = req.params;

    const vehicle = await Vehicle.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );


    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }


    return res.status(200).json({
      message: "Vehicle updated successfully",
      vehicle
    });


  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }

};

export const deleteVehicle = async (req, res) => {

  try {

    const { id } = req.params;


    const vehicle = await Vehicle.findByIdAndDelete(id);


    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }


    return res.status(200).json({
      message: "Vehicle deleted successfully"
    });


  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }

};

export const purchaseVehicle = async (req, res) => {
  try {
    const { id } = req.params;
    const { address, phone, quantity = 1 } = req.body;

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found",
      });
    }

    if (vehicle.quantity < quantity) {
      return res.status(400).json({
        message: "Vehicle is out of stock",
      });
    }

    if (!address || !phone) {
      return res.status(400).json({
        message: "Address and phone are required",
      });
    }

    vehicle.quantity -= quantity;
    await vehicle.save();

    const order = await Order.create({
      user: req.user.id,
      vehicle: vehicle._id,
      quantity,
      totalPrice: vehicle.price * quantity,
      paymentMethod: "COD",
      address,
      phone,
    });

    return res.status(200).json({
      message: "Vehicle purchased successfully",
      vehicle,
      order,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const restockVehicle = async (req, res) => {

  try {

    const { id } = req.params;
    const { quantity } = req.body;


    const vehicle = await Vehicle.findById(id);


    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        message: "Quantity cannot be negative"
      });
    }

    vehicle.quantity += quantity;

    await vehicle.save();


    return res.status(200).json({
      message: "Vehicle restocked successfully",
      vehicle
    });


  } catch (error) {

    return res.status(500).json({
      message: error.message
    });

  }

};

export const getVehiclesDetails = async (req, res) => {

  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid vehicle ID",
      });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({
        message: "Vehicle not found"
      });
    }

    return res.status(200).json(vehicle);

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });

  }
}