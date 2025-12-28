/**
 * 챗봇 메시지 컴포넌트
 */

import { View, Text, Image } from 'react-native';
import { ChatMessage as ChatMessageType } from '@/hooks/use-chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.role === 'assistant';

  return (
    <View className="mb-4">
      {/* 발신자 라벨 */}
      <Text className="text-xs text-gray-500 mb-1 ml-2">
        {isBot ? '주차 도우미' : '나'}
      </Text>

      <View className={`flex-row items-start ${isBot ? '' : 'flex-row-reverse'}`}>
        {/* 봇 아이콘 */}
        {isBot && (
          <View className="w-10 h-10 rounded-full bg-gray-700 items-center justify-center mr-2">
            <Text className="text-white text-lg">🤖</Text>
          </View>
        )}

        {/* 메시지 버블 */}
        <View
          className={`max-w-[80%] rounded-2xl px-4 py-3 ${
            isBot ? 'bg-gray-100' : 'bg-blue-500'
          }`}
        >
          <Text className={`text-base ${isBot ? 'text-gray-800' : 'text-white'}`}>
            {message.content}
          </Text>
        </View>
      </View>
    </View>
  );
}
