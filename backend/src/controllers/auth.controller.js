export const registerUser = async (req, res) => {
    return res.status(201).json({
        message: "User registered successfully",
    });
};