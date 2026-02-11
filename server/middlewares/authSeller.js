import jwt from "jsonwebtoken";

const authSeller = (req, res, next) => {
    try {
        const { sellerToken } = req.cookies;

        // 1. Token missing → instant rejection
        if (!sellerToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        // 2. Verify token
        const decoded = jwt.verify(sellerToken, process.env.JWT_SECRET);

        // 3. Check seller identity
        if (decoded.email !== process.env.SELLER_EMAIL) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized",
            });
        }

        // 4. Attach seller info if needed
        req.seller = decoded;

        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export default authSeller;
