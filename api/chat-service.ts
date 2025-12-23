/**
 * AI 챗봇 API 서비스
 * Claude와 ChatGPT를 전환 가능하도록 구현
 */

import Anthropic from '@anthropic-ai/sdk';
import OpenAI from 'openai';

export type AIProvider = 'claude' | 'openai';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// 환경 변수에서 API 키 가져오기
const ANTHROPIC_API_KEY = process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY;
const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

// 시스템 프롬프트
const SYSTEM_PROMPT = `당신은 서울시 주차 도우미 챗봇입니다. 
사용자가 주차장을 찾거나 예약하는 것을 도와주세요.
친절하고 간결하게 답변해주세요.

현재 사용 가능한 기능:
- 주차장 찾기 (현재 위치 또는 목적지 기준)
- 주차장 예약
- 주차 요금 안내
- 이용 문의

답변은 2-3문장으로 짧게 해주세요.`;

/**
 * Claude API 호출
 */
async function callClaudeAPI(messages: ChatMessage[]): Promise<string> {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY가 설정되지 않았습니다.');
  }

  const anthropic = new Anthropic({
    apiKey: ANTHROPIC_API_KEY,
  });

  // system 메시지 분리
  const systemMessage = messages.find(m => m.role === 'system');
  const chatMessages = messages.filter(m => m.role !== 'system');

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    system: systemMessage?.content || SYSTEM_PROMPT,
    messages: chatMessages.map(m => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    })),
  });

  const textContent = response.content.find(c => c.type === 'text');
  return textContent && 'text' in textContent ? textContent.text : '';
}

/**
 * OpenAI API 호출
 */
async function callOpenAIAPI(messages: ChatMessage[]): Promise<string> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY가 설정되지 않았습니다.');
  }

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  // system 메시지가 없으면 추가
  const systemMessage = messages.find(m => m.role === 'system');
  const finalMessages: ChatMessage[] = systemMessage
    ? messages
    : [{ role: 'system', content: SYSTEM_PROMPT }, ...messages];

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    max_tokens: 1024,
    messages: finalMessages.map(m => ({
      role: m.role,
      content: m.content,
    })),
  });

  return response.choices[0]?.message?.content || '';
}

/**
 * AI 챗봇에게 메시지 전송
 */
export async function sendMessage(
  messages: ChatMessage[],
  provider: AIProvider = 'claude'
): Promise<string> {
  try {
    if (provider === 'openai') {
      return await callOpenAIAPI(messages);
    }
    return await callClaudeAPI(messages);
  } catch (error) {
    console.error('AI API 호출 오류:', error);
    throw error;
  }
}
