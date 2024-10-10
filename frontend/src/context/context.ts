import React, { createContext, useContext } from "react";

interface ReplyContextType {
  number: number | undefined;
  setNumber: (num: number | undefined) => void;
}

export const ReplyContext = createContext<ReplyContextType | undefined>(
  undefined
);

export const useReplyContext = (): ReplyContextType => {
  const context = useContext(ReplyContext);
  if (!context) {
    throw new Error("useNumberContext must be used within a NumberProvider");
  }
  return context;
};
