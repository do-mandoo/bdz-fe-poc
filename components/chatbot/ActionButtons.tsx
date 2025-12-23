/**
 * 채팅 내 액션 버튼 컴포넌트
 */

import { View, Text, TouchableOpacity } from 'react-native';

interface ActionButtonsProps {
  onSetDestination: () => void;
  onSearchNearby: () => void;
  disabled?: boolean;
}

export function ActionButtons({ onSetDestination, onSearchNearby, disabled = false }: ActionButtonsProps) {
  return (
    <View className="flex-col gap-3 mt-3 items-center px-4">
      <TouchableOpacity
        className={`w-full rounded-full py-4 items-center ${
          disabled
            ? 'bg-gray-300'
            : 'bg-blue-500 active:bg-blue-600'
        }`}
        onPress={onSetDestination}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text className={`text-lg font-bold ${disabled ? 'text-gray-500' : 'text-white'}`}>
          목적지 설정하기
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`w-full rounded-full py-4 items-center ${
          disabled
            ? 'bg-gray-200'
            : 'bg-gray-200 active:bg-gray-300'
        }`}
        onPress={onSearchNearby}
        disabled={disabled}
        activeOpacity={0.8}
      >
        <Text className={`text-lg font-bold ${disabled ? 'text-gray-400' : 'text-gray-900'}`}>
          현재 위치 기준 찾기
        </Text>
      </TouchableOpacity>
    </View>
  );
}
