import { axiosInstance } from "../jwt";

interface ChatResponse {
  answer?: string;
  response?: string;
  message?: string;
}

const postChat = async (question: string): Promise<ChatResponse> => {
  try {
    const response = await axiosInstance.post<ChatResponse>(
      "patients/ai-chat/",
      { question }
    );
    // Handle response - axiosInstance might return data directly or wrapped
    return (response as any)?.data || response;
  } catch (err) {
    console.error("AI Chat error:", err);
    throw err;
  }
};

const aiChatService = {
  postChat,
};

export default aiChatService;
