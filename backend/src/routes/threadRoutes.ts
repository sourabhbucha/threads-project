import express, { Request, Response } from "express";
import { Post, ThreadReaction, Reaction } from "../models";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { title, content, userId, parentId } = req.body;

  try {
    if (parentId) {
      const parentPost = await Post.findByPk(parentId);
      if (!parentPost) {
        return res.status(404).json({ error: "Parent thread not found" });
      }
    }

    const post = await Post.create({ title, content, userId, parentId });
    return res.status(201).json(post);
  } catch (error: any) {
    console.error("Error adding thread:", error);
    return res
      .status(400)
      .json({ error: "Unable to add thread", details: error.message });
  }
});

router.post("/react", async (req: Request, res: Response) => {
  const { postId, reactionId, userId } = req.body;

  try {
    const post = await Post.findByPk(postId);
    if (!post || post.parentId !== null) {
      return res.status(404).json({ error: "Thread not found" });
    }

    const reaction = await Reaction.findByPk(reactionId);
    if (!reaction) {
      return res.status(404).json({ error: "Reaction type not found" });
    }

    const existingReaction = await ThreadReaction.findOne({
      where: { postId, reactionId, userId },
    });
    if (existingReaction) {
      return res.status(400).json({ error: "Reaction already exists" });
    }

    const threadReaction = await ThreadReaction.create({
      postId,
      reactionId,
      userId,
    });
    return res.status(201).json(threadReaction);
  } catch (error: any) {
    console.error("Error reacting to thread:", error);
    return res
      .status(400)
      .json({ error: "Unable to add reaction", details: error.message });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const threadId = parseInt(req.params.id, 10);

  try {
    const thread = await Post.findByPk(threadId);
    if (!thread || thread.parentId !== null) {
      return res.status(404).json({ error: "Thread not found" });
    }

    await thread.destroy();
    return res.json({ message: "Thread deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting thread:", error);
    return res
      .status(500)
      .json({ error: "Unable to delete thread", details: error.message });
  }
});

export default router;
