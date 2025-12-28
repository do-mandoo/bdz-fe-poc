import { ParkingLot } from '@/data/parking-lots';
import { FlatList, Text, View } from 'react-native';
import ParkingListItem from './ParkingListItem';

interface ParkingListProps {
  parkingLots: ParkingLot[];
  distances?: Map<string, number>; // id -> 거리(미터)
  onItemPress: (parkingLot: ParkingLot) => void;
  ListHeaderComponent?: React.ReactElement;
}

export default function ParkingList({
  parkingLots,
  distances,
  onItemPress,
  ListHeaderComponent,
}: ParkingListProps) {
  if (parkingLots.length === 0) {
    return (
      <View className='flex-1 items-center justify-center py-12'>
        <Text className='text-gray-400 text-base'>검색 결과가 없습니다</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={parkingLots}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <ParkingListItem
          parkingLot={item}
          distance={distances?.get(item.id)}
          onPress={onItemPress}
        />
      )}
      contentContainerClassName='p-4 gap-3'
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
    />
  );
}
