import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text } from 'react-native';

export type FilterType = 'distance' | 'price' | 'rating';

interface FilterButtonsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

interface FilterOption {
  key: FilterType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const FILTER_OPTIONS: FilterOption[] = [
  { key: 'distance', label: '거리순', icon: 'location-outline' },
  { key: 'price', label: '가격순', icon: 'pricetag-outline' },
  { key: 'rating', label: '평점순', icon: 'star-outline' },
];

export default function FilterButtons({ activeFilter, onFilterChange }: FilterButtonsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName='gap-2'>
      {FILTER_OPTIONS.map(option => {
        const isActive = activeFilter === option.key;

        return (
          <Pressable
            key={option.key}
            onPress={() => onFilterChange(option.key)}
            className={`flex-row items-center px-4 py-2 rounded-full border ${
              isActive ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-200'
            }`}
          >
            <Ionicons name={option.icon} size={16} color={isActive ? '#fff' : '#6b7280'} />
            <Text
              className={`ml-1.5 text-sm font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
