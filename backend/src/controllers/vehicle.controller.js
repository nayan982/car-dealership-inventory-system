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


    } catch(error) {

        return res.status(500).json({
            message: error.message
        });

    }

};

export const purchaseVehicle = async (req, res) => {

    try {

        const { id } = req.params;


        const vehicle = await Vehicle.findById(id);


        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle not found"
            });
        }


        if (vehicle.quantity <= 0) {
            return res.status(400).json({
                message: "Vehicle is out of stock"
            });
        }


        vehicle.quantity -= 1;

        await vehicle.save();


        return res.status(200).json({
            message: "Vehicle purchased successfully",
            vehicle
        });


    } catch(error) {

        return res.status(500).json({
            message: error.message
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


        vehicle.quantity += quantity;

        await vehicle.save();


        return res.status(200).json({
            message: "Vehicle restocked successfully",
            vehicle
        });


    } catch(error) {

        return res.status(500).json({
            message: error.message
        });

    }

};