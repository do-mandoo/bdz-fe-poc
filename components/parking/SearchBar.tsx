import { Ionicons } from '@expo/vector-icons';
import { Pressable, TextInput, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onClear,
  placeholder = '주차장 이름, 주소 검색',
}: SearchBarProps) {
  return (
    <View className='flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100'>
      <Ionicons name='search' size={20} color='#9ca3af' />
      <TextInput
        className='flex-1 ml-3 text-base text-gray-800'
        placeholder={placeholder}
        placeholderTextColor='#9ca3af'
        value={value}
        onChangeText={onChangeText}
        returnKeyType='search'
        autoCapitalize='none'
        autoCorrect={false}
      />
      {value.length > 0 && (
        <Pressable onPress={onClear} hitSlop={10}>
          <Ionicons name='close-circle' size={20} color='#9ca3af' />
        </Pressable>
      )}
    </View>
  );
}
