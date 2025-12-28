/**
 * AI 챗봇 API Mutation Hook
 * React Query를 사용한 서버 상태 관리
 */

import { useMutation } from '@tanstack/react-query';
import { sendMessage, AIProvider, ChatMessage as APIMessage } from '@/api/chat-service';

interface SendMessageParams {
  messages: APIMessage[];
  provider: AIProvider;
}

interface SendMessageResponse {
  content: string;
  timestamp: string;
}

/**
 * 메시지 전송 Mutation
 */
export function useSendMessage() {
  return useMutation<SendMessageResponse, Error, SendMessageParams>({
    mutationFn: async ({ messages, provider }) => {
      const content = await sendMessage(messages, provider);
      return {
        content,
        timestamp: new Date().toISOString(),
      };
    },
  });
}
