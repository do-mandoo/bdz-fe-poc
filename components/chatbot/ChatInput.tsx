/**
 * 챗봇 입력 컴포넌트
 */

import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <View className="flex-row w-full pb-4 bg-gray-50">
      <TextInput
        className="flex-1 bg-gray-200 rounded-full pl-5 pr-4 py-2.5 ml-4 mr-3 text-sm"
        placeholder="메시지를 입력하세요"
        placeholderTextColor="#6B7280"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSend}
        editable={!isLoading}
        multiline
        maxLength={500}
      />

      <TouchableOpacity
        className="w-11 h-11 rounded-full items-center justify-center mr-4 bg-blue-500 active:bg-blue-600"
        onPress={handleSend}
        disabled={!input.trim() || isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white text-sm font-bold">send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
