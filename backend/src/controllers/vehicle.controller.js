import Vehicle from "../models/Vehicle.js";

export const createVehicle = async (req, res) => {
  try {
    const { make, model, category, price, quantity } = req.body;

    const vehicle = await Vehicle.create({
      make,
      model,
      category,
      price,
      quantity,
    });

    return res.status(201).json({
      message: "Vehicle added successfully",
      vehicle,
    });

  } catch (error) {

    return res.status(500).json({
      message: "Internal Server Error",
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
    const { make, model, category, minPrice, maxPrice } = req.query;

    const filter = {};

    if (make) {
      filter.make = new RegExp(make, "i");
    }

    if (model) {
      filter.model = new RegExp(model, "i");
    }

    if (category) {
      filter.category = new RegExp(category, "i");
    }

    if (minPrice || maxPrice) {
      filter.price = {};

      if (minPrice) {
        filter.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        filter.price.$lte = Number(maxPrice);
      }
    }

    const vehicles = await Vehicle.find(filter);

    return res.status(200).json(vehicles);

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};