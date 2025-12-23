/**
 * 빠른 답변 버튼 컴포넌트
 */

import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface QuickReply {
  id: string;
  label: string;
  message: string;
}

interface QuickRepliesProps {
  replies: QuickReply[];
  onSelect: (message: string) => void;
  disabled?: boolean;
}

export function QuickReplies({ replies, onSelect, disabled = false }: QuickRepliesProps) {
  return (
    <View className="border-t border-gray-200">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4 py-3"
        contentContainerClassName="gap-2 items-center"
        scrollEnabled={!disabled}
      >
        {replies.map(reply => (
          <TouchableOpacity
            key={reply.id}
            className={`rounded-full px-4 py-2.5 justify-center items-center ${
              disabled
                ? 'bg-gray-200'
                : 'bg-blue-100 active:bg-blue-200'
            }`}
            onPress={() => {
              if (!disabled) {
                console.log('QuickReply 클릭:', reply.message);
                onSelect(reply.message);
              }
            }}
            disabled={disabled}
            activeOpacity={0.7}
          >
            <Text
              className={`text-sm font-medium ${
                disabled ? 'text-gray-400' : 'text-blue-400'
              }`}
              numberOfLines={1}
            >
              {reply.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
