import request from "supertest";
import express from "express";
import router from "./../routes/threadRoutes";
import { Post, ThreadReaction, Reaction } from "../models";

jest.mock("../models");

const app = express();
app.use(express.json());
app.use("/threads", router);

describe("Thread Routes", () => {
  const consoleErrorMock = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  afterEach(() => {
    consoleErrorMock.mockClear();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /threads/", () => {
    it("should create a new thread successfully", async () => {
      const newPost = {
        id: 1,
        title: "New Thread",
        content: "Thread content",
        userId: 1,
        parentId: null,
      };

      (Post.create as jest.Mock).mockResolvedValue(newPost);

      const response = await request(app)
        .post("/threads")
        .send({ title: "New Thread", content: "Thread content", userId: 1 });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newPost);
    });

    it("should return 404 if parent thread is not found", async () => {
      (Post.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app).post("/threads").send({
        title: "New Thread",
        content: "Thread content",
        userId: 1,
        parentId: 999,
      });

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Parent thread not found" });
    });

    it("should handle errors when creating a thread", async () => {
      (Post.create as jest.Mock).mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/threads")
        .send({ title: "New Thread", content: "Thread content", userId: 1 });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({
        error: "Unable to add thread",
        details: "Database error",
      });
    });
  });

  describe("DELETE /threads/:id", () => {
    it("should delete a thread successfully", async () => {
      const thread = { id: 1, parentId: null, destroy: jest.fn() };

      (Post.findByPk as jest.Mock).mockResolvedValue(thread);

      const response = await request(app).delete("/threads/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Thread deleted successfully" });
      expect(thread.destroy).toHaveBeenCalled();
    });

    it("should return 404 if the thread is not found", async () => {
      (Post.findByPk as jest.Mock).mockResolvedValue(null);

      const response = await request(app).delete("/threads/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Thread not found" });
    });

    it("should handle errors when deleting a thread", async () => {
      (Post.findByPk as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      const response = await request(app).delete("/threads/1");

      expect(response.status).toBe(500);
      expect(response.body).toEqual({
        error: "Unable to delete thread",
        details: "Database error",
      });
    });
  });
});
