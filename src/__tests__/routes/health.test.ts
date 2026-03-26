import request from "supertest";
import express from "express";
import mongoose from "mongoose";
import healthRoutes from "../../routes/health";
import { API_VERSION } from "../../config/env";

jest.mock("mongoose", () => ({
  connection: {
    readyState: 1,
  },
}));

const buildApp = () => {
  const app = express();
  app.use(express.json());
  app.use(`/api/${API_VERSION}/health`, healthRoutes);
  return app;
};

describe(`GET /api/${API_VERSION}/health`, () => {
  describe("when database is connected", () => {
    beforeEach(() => {
      (mongoose.connection as any).readyState = 1;
    });

    it("returns 200", async () => {
      const res = await request(buildApp()).get(`/api/${API_VERSION}/health`);
      expect(res.status).toBe(200);
    });

    it("returns status ok", async () => {
      const res = await request(buildApp()).get(`/api/${API_VERSION}/health`);
      expect(res.body.status).toBe("ok");
    });

    it("returns database ok", async () => {
      const res = await request(buildApp()).get(`/api/${API_VERSION}/health`);
      expect(res.body.services.database).toBe("ok");
    });

    it("returns a valid ISO timestamp", async () => {
      const res = await request(buildApp()).get(`/api/${API_VERSION}/health`);
      expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
    });
  });

  describe("when database is disconnected", () => {
    beforeEach(() => {
      (mongoose.connection as any).readyState = 0;
    });

    it("returns 503", async () => {
      const res = await request(buildApp()).get(`/api/${API_VERSION}/health`);
      expect(res.status).toBe(503);
    });

    it("returns status error", async () => {
      const res = await request(buildApp()).get(`/api/${API_VERSION}/health`);
      expect(res.body.status).toBe("error");
    });

    it("returns database unavailable", async () => {
      const res = await request(buildApp()).get(`/api/${API_VERSION}/health`);
      expect(res.body.services.database).toBe("unavailable");
    });

    it("returns a valid ISO timestamp", async () => {
      const res = await request(buildApp()).get(`/api/${API_VERSION}/health`);
      expect(new Date(res.body.timestamp).toISOString()).toBe(res.body.timestamp);
    });
  });
});