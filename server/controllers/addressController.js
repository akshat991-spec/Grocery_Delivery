import Address from '../models/Address.js';


export const addAddress = async (req, res) => {
    try {
        const userId = req.userId;

        const { street, city, state, zipCode, country, phoneNo } = req.body;

        if (!street || !city || !state || !zipCode || !country || !phoneNo) {
            return res.status(400).json({ success: false, message: "Please fill all required fields." });
        }

        const newAddress = await Address.create({
            user: userId, 
            street,
            city,
            state,
            zipCode,
            country,
            phoneNo
        });

        res.status(201).json({ success: true, message: "Address added successfully", address: newAddress });

    } catch (error) {
        console.error("Add Address Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


export const getAddress = async (req, res) => {
    try {
        const userId = req.userId
        const addresses = await Address.find({ user: userId }).sort({ createdAt: -1 });

        res.json({ success: true, addresses });

    } catch (error) {
        console.error("Get Addresses Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};