/**
 * 채팅 클라이언트 상태 관리 (Jotai)
 */

import { atom } from 'jotai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

// 채팅 메시지 목록 (클라이언트 상태)
export const messagesAtom = atom<ChatMessage[]>([]);

// 초기 인사말 메시지
const GREETING_MESSAGE: ChatMessage = {
  id: `msg-greeting-${Date.now()}`,
  role: 'assistant',
  content: '안녕하세요! 서울시 주차 도우미입니다. 🚗\n무엇을 도와드릴까요?',
  timestamp: new Date().toISOString(),
};

// 메시지 추가 액션
export const addMessageAtom = atom(
  null,
  (get, set, message: ChatMessage) => {
    const currentMessages = get(messagesAtom);
    set(messagesAtom, [...currentMessages, message]);
  }
);

// 초기화 액션
export const initChatAtom = atom(null, (get, set) => {
  set(messagesAtom, [GREETING_MESSAGE]);
});

// 메시지 초기화 액션
export const clearMessagesAtom = atom(null, (get, set) => {
  set(messagesAtom, []);
});
