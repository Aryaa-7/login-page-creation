import jwt from "jsonwebtoken";

// ✅ Check if token exists and decode
export const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized: Token missing" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { userId, role }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};

// ✅ Allow only Admins
export const isAdmin = (req, res, next) => {
    if (req.user.role && req.user.role.toLowerCase() === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Forbidden: Admins only" });
    }
};

// ✅ Allow only Regular Users
export const isUser = (req, res, next) => {
    if (req.user.role && req.user.role.toLowerCase() === "user") {
        next();
    } else {
        res.status(403).json({ message: "Forbidden: Users only" });
    }
};
