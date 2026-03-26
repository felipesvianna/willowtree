import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
// import userRoutes from "./routes/users";

const app = express();

connectDB();

app.use(express.json());

// app.use("/api/users", userRoutes);

app.get("/", (_req, res) => res.json({ message: "API is running" }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));