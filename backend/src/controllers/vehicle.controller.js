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