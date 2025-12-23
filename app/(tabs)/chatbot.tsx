/**
 * 챗봇 메인 화면
 */

import { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useChat } from '@/hooks/use-chat';
import { ChatMessage } from '@/components/chatbot/ChatMessage';
import { ChatInput } from '@/components/chatbot/ChatInput';
import { QuickReplies } from '@/components/chatbot/QuickReplies';
import { TypingIndicator } from '@/components/chatbot/TypingIndicator';
import { CURRENT_LOCATION, DEFAULT_DESTINATION } from '@/data/locations';
import type { ChatMessage as ChatMessageType } from '@/hooks/use-chat';

// AI Provider 설정
const AI_PROVIDER = (process.env.EXPO_PUBLIC_AI_PROVIDER || 'claude') as 'claude' | 'openai';

// 추천 질문
const QUICK_QUESTIONS = [
  { id: 'q1', label: '오늘 저녁 강남역 주차 추천', message: '오늘 저녁 강남역 주차 추천해줘' },
  { id: 'q2', label: '가장 저렴한 주차장', message: '가장 저렴한 주차장 알려줘' },
];

export default function ChatbotScreen() {
  const { messages, isLoading, error, sendMessage, initChat } = useChat(AI_PROVIDER);
  const flatListRef = useRef<FlatList>(null);

  // 초기 인사말
  useEffect(() => {
    initChat();
  }, [initChat]);

  // 메시지 업데이트 시 자동 스크롤
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  // 목적지 설정 버튼
  const handleSetDestination = () => {
    if (isLoading) return;
    
    Alert.alert(
      '목적지 설정',
      `${DEFAULT_DESTINATION.name}으로 설정되었습니다.`,
      [
        {
          text: '주차장 찾기',
          onPress: () => sendMessage(`${DEFAULT_DESTINATION.name} 근처 주차장 찾아줘`),
        },
        { text: '취소', style: 'cancel' },
      ]
    );
  };

  // 현재 위치 기준 찾기
  const handleSearchNearby = () => {
    if (isLoading) return;
    
    Alert.alert(
      '현재 위치',
      `${CURRENT_LOCATION.name}에서 주차장을 찾습니다.`,
      [
        {
          text: '검색',
          onPress: () => sendMessage(`${CURRENT_LOCATION.name} 근처 주차장 찾아줘`),
        },
        { text: '취소', style: 'cancel' },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* 헤더 */}
      <View className="bg-white pt-12 pb-3 px-4 border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">주차 도우미</Text>
        <Text className="text-sm text-gray-500 mt-1">
          주차장 찾기 / 결제 / 이용 문의
        </Text>
        <Text className="text-xs text-blue-500 mt-1">
          AI: {AI_PROVIDER === 'claude' ? 'Claude Sonnet 4.5' : 'GPT-4o'}
        </Text>
      </View>

      {/* 메시지 리스트 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ChatMessage message={item} />}
        contentContainerStyle={{ 
          padding: 16,
          paddingBottom: 8,
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={isLoading ? <TypingIndicator /> : null}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
      />

      {/* 액션 버튼 영역 (초기 화면에만 표시) */}
      {messages.length <= 1 && !isLoading && (
        <View className="px-4 pb-2 gap-2">
          <TouchableOpacity
            className="bg-blue-500 rounded-full py-2.5 items-center active:bg-blue-600"
            onPress={handleSetDestination}
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-sm">목적지 설정하기</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-200 rounded-full py-2.5 items-center active:bg-gray-300"
            onPress={handleSearchNearby}
            activeOpacity={0.8}
          >
            <Text className="text-gray-700 font-semibold text-sm">현재 위치 기준 찾기</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 빠른 답변 버튼 */}
      <QuickReplies 
        replies={QUICK_QUESTIONS} 
        onSelect={sendMessage} 
        disabled={isLoading}
      />

      {/* 입력창 */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />

      {/* 에러 표시 */}
      {error && (
        <View className="absolute bottom-20 left-4 right-4 bg-red-100 p-3 rounded-lg">
          <Text className="text-red-700 text-sm">{error}</Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}
