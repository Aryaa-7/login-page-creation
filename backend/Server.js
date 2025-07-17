import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true,               // if you're using cookies in future
}));


app.get("/", (req, res) => {
    res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server is running on port", process.env.PORT);
});
