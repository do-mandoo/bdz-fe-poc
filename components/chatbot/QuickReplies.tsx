/**
 * 빠른 답변 버튼 컴포넌트
 */

import { ScrollView, Text, TouchableOpacity } from 'react-native';

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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="px-4 py-2"
      contentContainerClassName="gap-2"
      scrollEnabled={!disabled}
    >
      {replies.map(reply => (
        <TouchableOpacity
          key={reply.id}
          className={`border rounded-full px-4 py-2.5 justify-center items-center ${
            disabled 
              ? 'bg-gray-100 border-gray-200' 
              : 'bg-white border-blue-200 active:bg-blue-50'
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
              disabled ? 'text-gray-400' : 'text-blue-600'
            }`}
            numberOfLines={1}
          >
            {reply.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
