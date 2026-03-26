import "dotenv/config";
import express from "express";
import connectDB from "./config/db";
import { API_VERSION } from "./config/env";
import healthRoutes from "./routes/health";

const app = express();

connectDB();

app.use(express.json());

app.use(`/api/${API_VERSION}/health`, healthRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));