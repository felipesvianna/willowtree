import { Router, Request, Response } from "express";
import mongoose from "mongoose";

const router = Router();

router.get("/", async (_req: Request, res: Response): Promise<void> => {
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
});

export default router;