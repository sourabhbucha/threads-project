import express, { Request, Response } from "express";
import { Reaction } from "../models";

const router = express.Router();

router.post("/initialize", async (req: Request, res: Response) => {
  const predefinedReactions = ["like", "love", "haha", "wow", "sad", "angry"];

  try {
    for (const type of predefinedReactions) {
      await Reaction.findOrCreate({ where: { type } });
    }
    return res.json({ message: "Reactions initialized successfully" });
  } catch (error: any) {
    console.error("Error initializing reactions:", error);
    return res.status(500).json({
      error: "Unable to initialize reactions",
      details: error.message,
    });
  }
});

export default router;
