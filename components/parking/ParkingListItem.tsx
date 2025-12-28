import { AMENITY_ICONS, PARKING_TYPE_LABELS, ParkingLot } from '@/data/parking-lots';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

interface ParkingListItemProps {
  parkingLot: ParkingLot;
  distance?: number; // 미터 단위
  onPress: (parkingLot: ParkingLot) => void;
}

// 거리를 사람이 읽기 쉬운 형태로 변환
function formatDistance(meters?: number): string {
  if (!meters) return '';
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

// 가격을 포맷
function formatPrice(price: number): string {
  return price.toLocaleString() + '원';
}

// 잔여석 상태에 따른 스타일
function getAvailabilityStyle(available: number, total: number) {
  const ratio = available / total;
  if (available === 0) {
    return { bgColor: 'bg-red-100', textColor: 'text-red-600', label: '만차' };
  }
  if (ratio < 0.1) {
    return { bgColor: 'bg-orange-100', textColor: 'text-orange-600', label: `${available}자리` };
  }
  if (ratio < 0.3) {
    return { bgColor: 'bg-yellow-100', textColor: 'text-yellow-600', label: `${available}자리` };
  }
  return { bgColor: 'bg-green-100', textColor: 'text-green-600', label: `${available}자리` };
}

export default function ParkingListItem({ parkingLot, distance, onPress }: ParkingListItemProps) {
  const availability = getAvailabilityStyle(parkingLot.availableSpots, parkingLot.totalSpots);

  return (
    <Pressable
      onPress={() => onPress(parkingLot)}
      className='bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:bg-gray-50'
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {/* 상단: 이름, 타입, 거리 */}
      <View className='flex-row items-start justify-between mb-2'>
        <View className='flex-1 mr-3'>
          <View className='flex-row items-center gap-2 mb-1'>
            <Text className='text-lg font-bold text-gray-900' numberOfLines={1}>
              {parkingLot.name}
            </Text>
            <View className='bg-gray-100 px-2 py-0.5 rounded'>
              <Text className='text-xs text-gray-500'>{PARKING_TYPE_LABELS[parkingLot.type]}</Text>
            </View>
          </View>
          <Text className='text-sm text-gray-500' numberOfLines={1}>
            {parkingLot.address}
          </Text>
        </View>

        {/* 거리 표시 */}
        {distance !== undefined && (
          <View className='flex-row items-center'>
            <Ionicons name='navigate-outline' size={14} color='#6366f1' />
            <Text className='ml-1 text-sm font-medium text-indigo-600'>
              {formatDistance(distance)}
            </Text>
          </View>
        )}
      </View>

      {/* 중간: 가격, 잔여석, 평점 */}
      <View className='flex-row items-center gap-4 mb-3'>
        {/* 가격 */}
        <View className='flex-row items-center'>
          <Ionicons name='pricetag' size={14} color='#4f46e5' />
          <Text className='ml-1 text-sm font-semibold text-indigo-600'>
            {formatPrice(parkingLot.pricePerHour)}/시간
          </Text>
        </View>

        {/* 잔여석 */}
        <View className={`px-2 py-0.5 rounded ${availability.bgColor}`}>
          <Text className={`text-xs font-medium ${availability.textColor}`}>
            {availability.label}
          </Text>
        </View>

        {/* 평점 */}
        <View className='flex-row items-center'>
          <Ionicons name='star' size={14} color='#fbbf24' />
          <Text className='ml-1 text-sm text-gray-700'>{parkingLot.rating.toFixed(1)}</Text>
          <Text className='text-xs text-gray-400 ml-0.5'>({parkingLot.reviewCount})</Text>
        </View>
      </View>

      {/* 하단: 운영시간 + 편의시설 */}
      <View className='flex-row items-center justify-between'>
        {/* 운영시간 */}
        <View className='flex-row items-center'>
          <Ionicons name='time-outline' size={14} color='#9ca3af' />
          <Text className='ml-1 text-xs text-gray-500'>
            {parkingLot.is24Hours
              ? '24시간'
              : `${parkingLot.operatingHours.open} - ${parkingLot.operatingHours.close}`}
          </Text>
        </View>

        {/* 편의시설 아이콘들 */}
        <View className='flex-row items-center gap-1.5'>
          {parkingLot.amenities.slice(0, 4).map(amenity => {
            const iconName = AMENITY_ICONS[amenity] as keyof typeof Ionicons.glyphMap;
            return (
              <View
                key={amenity}
                className='w-6 h-6 bg-gray-100 rounded-full items-center justify-center'
              >
                <Ionicons name={iconName || 'help-outline'} size={12} color='#6b7280' />
              </View>
            );
          })}
          {parkingLot.amenities.length > 4 && (
            <Text className='text-xs text-gray-400'>+{parkingLot.amenities.length - 4}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}
