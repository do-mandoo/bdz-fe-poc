import {
  FilterButtons,
  FilterType,
  ParkingList,
  ParkingMap,
  ParkingMapRef,
  SearchBar,
} from '@/components/parking';
import { PARKING_LOTS, ParkingLot } from '@/data/parking-lots';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// 기본 중심 좌표 (강남역 근처)
const DEFAULT_CENTER = { lat: 37.498095, lng: 127.02761 };

// 거리 계산 함수 (Haversine formula)
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371e3; // 지구 반지름 (미터)
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// 보기 모드
type ViewMode = 'map' | 'list';

export default function ParkingScreen() {
  const mapRef = useRef<ParkingMapRef>(null);

  // 상태 관리
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('distance');
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [searchCenter, setSearchCenter] = useState(DEFAULT_CENTER);
  const [showResearchButton, setShowResearchButton] = useState(false);

  // 각 주차장까지의 거리 계산
  const distances = useMemo(() => {
    const distanceMap = new Map<string, number>();
    PARKING_LOTS.forEach(lot => {
      const distance = calculateDistance(
        searchCenter.lat,
        searchCenter.lng,
        lot.latitude,
        lot.longitude
      );
      distanceMap.set(lot.id, distance);
    });
    return distanceMap;
  }, [searchCenter]);

  // 검색 + 필터 적용된 주차장 목록
  const filteredParkingLots = useMemo(() => {
    let result = [...PARKING_LOTS];

    // 검색어 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        lot => lot.name.toLowerCase().includes(query) || lot.address.toLowerCase().includes(query)
      );
    }

    // 정렬 적용
    switch (activeFilter) {
      case 'distance':
        result.sort((a, b) => {
          const distA = distances.get(a.id) || 0;
          const distB = distances.get(b.id) || 0;
          return distA - distB;
        });
        break;
      case 'price':
        result.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, activeFilter, distances]);

  // 지도 중심 변경 핸들러
  const handleCenterChange = useCallback(
    (newCenter: { lat: number; lng: number }) => {
      setMapCenter(newCenter);

      // 검색 중심과의 거리가 500m 이상이면 재검색 버튼 표시
      const distance = calculateDistance(
        searchCenter.lat,
        searchCenter.lng,
        newCenter.lat,
        newCenter.lng
      );

      setShowResearchButton(distance > 500);
    },
    [searchCenter]
  );

  // 이 지역 재검색
  const handleResearch = useCallback(() => {
    // 현재 지도 중심을 새로운 검색 중심으로 설정
    setSearchCenter(mapCenter);
    setShowResearchButton(false);

    // WebView의 lastCenter도 업데이트 (거리 계산 기준점 동기화)
    mapRef.current?.updateLastCenter(mapCenter.lat, mapCenter.lng);
  }, [mapCenter]);

  // 마커 클릭 핸들러
  const handleMarkerClick = useCallback((parkingLot: ParkingLot) => {
    console.log('Marker clicked:', parkingLot.name);
    // TODO: 상세 정보 모달 또는 바텀시트 표시
  }, []);

  // 리스트 아이템 클릭 핸들러
  const handleItemPress = useCallback((parkingLot: ParkingLot) => {
    console.log('Item pressed:', parkingLot.name);

    // 지도 모드로 전환하고 해당 위치로 이동
    setViewMode('map');
    mapRef.current?.moveToLocation(parkingLot.latitude, parkingLot.longitude);
  }, []);

  // 검색어 초기화
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return (
    <SafeAreaView className='bg-gray-50' style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <StatusBar barStyle='dark-content' backgroundColor='#f9fafb' />

      {/* 헤더 */}
      <View className='px-4 pt-2 pb-3 bg-white border-b border-gray-100'>
        {/* 타이틀 + 보기 모드 토글 */}
        <View className='flex-row items-center justify-between mb-3'>
          <Text className='text-2xl font-bold text-gray-900'>주차장 찾기</Text>

          {/* 지도/리스트 토글 */}
          <View className='flex-row bg-gray-100 rounded-lg p-1'>
            <Pressable
              onPress={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-md ${viewMode === 'map' ? 'bg-white shadow-sm' : ''}`}
            >
              <Ionicons name='map' size={18} color={viewMode === 'map' ? '#4f46e5' : '#9ca3af'} />
            </Pressable>
            <Pressable
              onPress={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-md ${
                viewMode === 'list' ? 'bg-white shadow-sm' : ''
              }`}
            >
              <Ionicons name='list' size={18} color={viewMode === 'list' ? '#4f46e5' : '#9ca3af'} />
            </Pressable>
          </View>
        </View>

        {/* 검색바 */}
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} onClear={handleClearSearch} />

        {/* 필터 버튼 */}
        <View className='mt-3'>
          <FilterButtons activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        </View>

        {/* 검색 결과 카운트 */}
        <View className='mt-3 flex-row items-center'>
          <Text className='text-sm text-gray-500'>
            총 <Text className='font-semibold text-indigo-600'>{filteredParkingLots.length}</Text>
            개의 주차장
          </Text>
        </View>
      </View>

      {/* 메인 콘텐츠 */}
      {viewMode === 'map' ? (
        <View className='flex-1'>
          {/* 지도 영역 (60%) */}
          <View style={{ flex: 6, minHeight: 1 }}>
            <ParkingMap
              ref={mapRef}
              parkingLots={filteredParkingLots}
              center={searchCenter}
              onCenterChange={handleCenterChange}
              onMarkerClick={handleMarkerClick}
              showResearchButton={showResearchButton}
              onResearch={handleResearch}
            />
          </View>

          {/* 리스트 영역 (40%) */}
          <View style={{ flex: 4, minHeight: 1 }} className='bg-gray-50 border-t border-gray-200'>
            <ParkingList
              parkingLots={filteredParkingLots}
              distances={distances}
              onItemPress={handleItemPress}
            />
          </View>
        </View>
      ) : (
        /* 전체 리스트 모드 */
        <ParkingList
          parkingLots={filteredParkingLots}
          distances={distances}
          onItemPress={handleItemPress}
        />
      )}
    </SafeAreaView>
  );
}
