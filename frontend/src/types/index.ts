// src/types/index.ts

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface Post {
  id: number;
  content: string;
  userId: number;
  parentId: number | null;
  author?: User;
  replies: Post[];
}

export interface Reaction {
  id: number;
  type: string;
}

export interface ThreadReaction {
  postId: number;
  userId: number;
  reactionId: number;
}
