import User from "../models/user.js"


//update User CartData : /api/cart/update

export const updateCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { cartItems } = req.body;

        if (!userId) {
            return res.status(401).json({ success: false, message: "Authentication required." });
        }
        
        await User.findByIdAndUpdate(userId, { cartItems });
        
        //res.json({ success: true });

    } catch (error) {
        console.error("Update Cart Error:", error.message);
        res.status(500).json({ success: false, message: "Server error while updating cart." });
    }
};




