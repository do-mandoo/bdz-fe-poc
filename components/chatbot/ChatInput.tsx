/**
 * 챗봇 입력 컴포넌트
 */

import { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

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
    <View style={styles.container} className="px-4 py-3 bg-white border-t border-gray-200">
      <TextInput
        className="flex-1 bg-gray-100 rounded-full px-5 py-3 mr-3 text-base"
        placeholder="메시지를 입력하세요"
        placeholderTextColor="#9CA3AF"
        value={input}
        onChangeText={setInput}
        onSubmitEditing={handleSend}
        editable={!isLoading}
        multiline
        maxLength={500}
      />

      <TouchableOpacity
        className={`w-12 h-12 rounded-full ${
          input.trim() && !isLoading ? 'bg-blue-500' : 'bg-gray-300'
        }`}
        style={styles.sendButton}
        onPress={handleSend}
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <Text className="text-white text-sm font-semibold">전송</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'flex-start',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
