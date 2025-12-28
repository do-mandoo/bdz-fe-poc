/**
 * 챗봇 메인 화면
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useChat } from '@/hooks/use-chat';
import { useLocation } from '@/hooks/use-location';
import { ChatMessage } from '@/components/chatbot/ChatMessage';
import { ChatInput } from '@/components/chatbot/ChatInput';
import { QuickReplies } from '@/components/chatbot/QuickReplies';
import { TypingIndicator } from '@/components/chatbot/TypingIndicator';
import { ActionButtons } from '@/components/chatbot/ActionButtons';
import { DEFAULT_DESTINATION } from '@/data/locations';
import {
  searchNearbyParkingLots,
  searchParkingLotsByKeyword,
  extractLocationFromMessage,
  formatParkingRecommendation,
} from '@/services/parking-search';
import type { ChatMessage as ChatMessageType } from '@/hooks/use-chat';

// AI Provider 설정
const AI_PROVIDER = (process.env.EXPO_PUBLIC_AI_PROVIDER || 'claude') as 'claude' | 'openai';

// 추천 질문
const QUICK_QUESTIONS = [
  { id: 'q1', label: '오늘 저녁 강남역 주변 주차 추천해줘', message: '오늘 저녁 강남역 주변 주차 추천해줘' },
  { id: 'q2', label: '가장 저렴한 주차장', message: '가장 저렴한 주차장 알려줘' },
];

export default function ChatbotScreen() {
  const { messages, isLoading, error, sendMessage, initChat } = useChat(AI_PROVIDER);
  const { location, address, isLoading: isLocationLoading, getCurrentLocation } = useLocation();
  const flatListRef = useRef<FlatList>(null);
  const [isSearching, setIsSearching] = useState(false);

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

  // 현재 위치 기준 찾기 (실제 GPS 사용)
  const handleSearchNearby = useCallback(async () => {
    if (isLoading || isLocationLoading || isSearching) return;

    setIsSearching(true);

    try {
      const coords = await getCurrentLocation();

      if (!coords) {
        Alert.alert('위치 오류', '현재 위치를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
        setIsSearching(false);
        return;
      }

      // 현재 위치 기준 주차장 검색
      const nearbyParkingLots = searchNearbyParkingLots(coords, 10);
      const recommendation = formatParkingRecommendation(nearbyParkingLots, address || '현재 위치');

      // AI 메시지로 추천 결과 표시
      sendMessage(`현재 위치(${address || '알 수 없음'}) 기준 주차장 추천해줘`);
    } catch (err) {
      Alert.alert('오류', '주차장 검색 중 오류가 발생했습니다.');
    } finally {
      setIsSearching(false);
    }
  }, [isLoading, isLocationLoading, isSearching, getCurrentLocation, address, sendMessage]);

  // FlatList Footer에 액션 버튼과 로딩 인디케이터 포함
  const renderFooter = () => {
    return (
      <View>
        {/* 액션 버튼 (초기 화면에만 표시) */}
        {messages.length <= 1 && !isLoading && !isLocationLoading && !isSearching && (
          <ActionButtons
            onSetDestination={handleSetDestination}
            onSearchNearby={handleSearchNearby}
            disabled={isLoading || isLocationLoading || isSearching}
          />
        )}
        {/* 로딩 인디케이터 - 위치 검색 중이거나 AI 응답 대기 중 */}
        {(isLoading || isLocationLoading || isSearching) && <TypingIndicator />}
      </View>
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
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={renderFooter}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
      />

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
