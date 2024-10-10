import axios from "axios";

const API_URL = "http://localhost:4000/api";

// export const fetchThreads = async (page = 1, limit = 10) => {
//   const response = await axios.get(`${API_URL}/threads`, {
//     params: { page, limit },
//   });
//   return response.data;
// };

// export const addThread = async (content: string, userId: number) => {
//   const response = await axios.post(`${API_URL}/threads`, { content, userId });
//   return response.data;
// };

export const addReply = async (
  content: string,
  userId: number,
  parentId?: number
) => {
  const response = await axios.post(`${API_URL}/threads`, {
    content,
    userId,
    parentId: parentId === 0 ? undefined : parentId,
  });
  return response.data;
};

export const addReaction = async (
  postId: number,
  userId: number,
  reactionId: number
) => {
  const response = await axios.post(`${API_URL}/reactions`, {
    postId,
    userId,
    reactionId,
  });
  return response.data;
};
