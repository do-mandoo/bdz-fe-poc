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

현재 사용 가능한 주차장 정보:
1. 강남역 공영주차장 - 강남구 강남대로 396, 시간당 3,000원, 잔여 45자리, 24시간
2. 삼성타워 주차장 - 테헤란로 152, 시간당 4,000원, 잔여 120자리, 06:00-23:00
3. 역삼동 노상주차장 - 역삼동 123-45, 시간당 2,000원, 잔여 5자리, 09:00-21:00
4. 선릉역 기계식주차장 - 선릉로 428, 시간당 2,500원, 만차, 24시간
5. 코엑스몰 주차장 - 영동대로 513, 시간당 3,500원, 잔여 1200자리, 24시간
6. 청담동 프라이빗 주차장 - 청담동 89-12, 시간당 5,000원, 잔여 8자리, 08:00-22:00
7. 신사동 공영주차장 - 신사동 541-23, 시간당 2,000원, 잔여 32자리, 24시간
8. 압구정 로데오 주차장 - 압구정로 172, 시간당 4,500원, 잔여 22자리, 10:00-23:00

사용자가 위치(역, 동, 구)를 언급하면 해당 위치 근처의 주차장을 추천해주세요.
저렴한 주차장을 원하면 가격순으로, 자리가 많은 곳을 원하면 잔여석 순으로 추천해주세요.

답변은 친절하게 2-3개 주차장을 추천하는 형식으로 해주세요.
각 주차장의 이름, 요금, 잔여석을 포함해주세요.`;

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
