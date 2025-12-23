/**
 * 채팅 통합 Hook
 * 클라이언트 상태(Jotai) + 서버 상태(React Query) 통합
 */

import { useCallback, useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useSendMessage } from './use-chat-mutation';
import { 
  messagesAtom, 
  addMessageAtom, 
  initChatAtom,
  ChatMessage 
} from '@/store/chat-store';
import { AIProvider, ChatMessage as APIMessage } from '@/api/chat-service';

// 타입 재export
export type { ChatMessage } from '@/store/chat-store';

export function useChat(provider: AIProvider = 'claude') {
  // 클라이언트 상태 (Jotai)
  const [messages] = useAtom(messagesAtom);
  const addMessage = useSetAtom(addMessageAtom);
  const initChat = useSetAtom(initChatAtom);

  // 서버 상태 (React Query Mutation)
  const { mutateAsync: sendMessageMutation, isPending, error } = useSendMessage();

  // 초기 인사말
  useEffect(() => {
    if (messages.length === 0) {
      initChat();
    }
  }, []);

  // 메시지 전송
  const sendMessage = useCallback(
    async (userMessage: string) => {
      // 빈 메시지 또는 로딩 중에는 전송 안 함
      if (!userMessage.trim() || isPending) {
        console.log('메시지 전송 차단:', { empty: !userMessage.trim(), loading: isPending });
        return;
      }

      // 1. 사용자 메시지 추가 (클라이언트 상태)
      const newUserMessage: ChatMessage = {
        id: `msg-${Date.now()}-user`,
        role: 'user',
        content: userMessage,
        timestamp: new Date().toISOString(),
      };
      addMessage(newUserMessage);

      try {
        // 2. API 메시지 형식으로 변환
        const apiMessages: APIMessage[] = [
          ...messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
          {
            role: 'user' as const,
            content: userMessage,
          },
        ];

        // 3. AI에게 메시지 전송 (서버 상태)
        const response = await sendMessageMutation({
          messages: apiMessages,
          provider,
        });

        // 4. AI 응답 추가 (클라이언트 상태)
        const assistantMessage: ChatMessage = {
          id: `msg-${Date.now()}-assistant`,
          role: 'assistant',
          content: response.content,
          timestamp: response.timestamp,
        };
        addMessage(assistantMessage);
      } catch (err) {
        console.error('메시지 전송 실패:', err);
        // 에러는 React Query에서 관리
      }
    },
    [messages, provider, addMessage, sendMessageMutation, isPending]
  );

  return {
    messages,
    isLoading: isPending,
    error: error?.message || null,
    sendMessage,
    initChat,
  };
}
