import { axiosInstance } from "../jwt";

const postChat = (question: string) =>
  axiosInstance.post("patients/ai-chat/", { question });

const aiChatService = {
  postChat,
};

export default aiChatService;
