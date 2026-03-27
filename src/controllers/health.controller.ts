import mongoose from "mongoose";
import { Request, Response } from "express";


export const healthCheck = async (_req: Request, res: Response): Promise<void> => {
  try {
    if (mongoose.connection.readyState !== 1) {
      throw new Error("Database not connected");
    }

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      services: {
        database: "ok",
      },
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      timestamp: new Date().toISOString(),
      services: {
        database: "unavailable",
      },
    });
  }
};