const Razorpay = require('razorpay');
const crypto = require('crypto');
const pool = require('../../config/db');

// Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * CREATE ORDER
 * Initiates a payment by creating a Razorpay order.
 */
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body; // Amount in INR
        const userId = req.user.id; // From auth middleware

        const options = {
            amount: amount * 100, // Razorpay works in paise
            currency: "INR",
            receipt: `receipt_${userId}_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        // Optional: Save order_id to student profile for tracking
        await pool.query(
            "UPDATE students_profile SET razorpay_order_id = $1 WHERE user_id = $2",
            [order.id, userId]
        );

        res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error("Razorpay Order Creation Error:", error);
        res.status(500).json({ success: false, error: "Failed to create order" });
    }
};

/**
 * CREATE GUEST ORDER
 * Initiates a payment for non-registered users (Registration flow).
 */
exports.createGuestOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: (amount || 9500) * 100,
            currency: "INR",
            receipt: `guest_receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        res.status(200).json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            key_id: process.env.RAZORPAY_KEY_ID
        });
    } catch (error) {
        console.error("Guest Order Error:", error);
        res.status(500).json({ success: false, error: "Failed to create guest order" });
    }
};

/**
 * VERIFY PAYMENT
 * Validates the payment signature sent by Razorpay after success.
 */
exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const userId = req.user.id;

        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            // Payment is valid! Update database.
            await pool.query(
                "UPDATE students_profile SET is_paid = true WHERE user_id = $1",
                [userId]
            );

            res.status(200).json({ success: true, message: "Payment verified successfully" });
        } else {
            res.status(400).json({ success: false, error: "Invalid signature" });
        }
    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ success: false, error: "Verification failed" });
    }
};



/**
 * GET PAYMENT STATUS
 * Returns whether the student has paid.
 */
exports.getPaymentStatus = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            "SELECT is_paid FROM students_profile WHERE user_id = $1",
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, error: "Student profile not found" });
        }

        res.status(200).json({ success: true, is_paid: result.rows[0].is_paid });
    } catch (error) {
        res.status(500).json({ success: false, error: "Failed to fetch status" });
    }
};
