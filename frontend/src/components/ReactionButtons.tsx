// src/components/ReactionButtons.tsx

import React from "react";
import { addReaction } from "../api";
import { Reaction } from "../types";

interface ReactionButtonsProps {
  postId: number;
}

const ReactionButtons: React.FC<ReactionButtonsProps> = ({ postId }) => {
  const handleReaction = async (reactionId: number) => {
    await addReaction(postId, 1, reactionId); // Assuming userId is 1 for demo
  };

  const reactions: Reaction[] = [
    { id: 1, type: "like" },
    { id: 2, type: "love" },
    { id: 3, type: "laugh" },
    { id: 4, type: "angry" },
    { id: 5, type: "sad" },
  ];

  return (
    <div>
      {reactions.map((reaction) => (
        <button key={reaction.id} onClick={() => handleReaction(reaction.id)}>
          {reaction.type}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
