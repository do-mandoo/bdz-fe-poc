import { ParkingLot } from '@/data/parking-lots';
import { Ionicons } from '@expo/vector-icons';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// 카카오맵 API 키
const KAKAO_MAP_API_KEY = process.env.EXPO_PUBLIC_KAKAO_JS_KEY;

const MAP_URL = 'https://do-mandoo.github.io/map-practice/';

interface ParkingMapProps {
  parkingLots: ParkingLot[];
  center: { lat: number; lng: number };
  onCenterChange: (center: { lat: number; lng: number }) => void;
  onMarkerClick: (parkingLot: ParkingLot) => void;
  showResearchButton: boolean;
  onResearch: () => void;
}

export interface ParkingMapRef {
  moveToLocation: (lat: number, lng: number) => void;
  updateMarkers: (parkingLots: ParkingLot[]) => void;
  updateLastCenter: (lat: number, lng: number) => void;
}

// 주차장 데이터를 마커용 형식으로 변환
function toMarkerData(parkingLots: ParkingLot[]) {
  return parkingLots.map(lot => ({
    id: lot.id,
    name: lot.name,
    lat: lot.latitude,
    lng: lot.longitude,
    price: lot.pricePerHour,
    available: lot.availableSpots,
    rating: lot.rating,
  }));
}

const ParkingMap = forwardRef<ParkingMapRef, ParkingMapProps>(
  ({ parkingLots, center, onCenterChange, onMarkerClick, showResearchButton, onResearch }, ref) => {
    const webViewRef = useRef<WebView>(null);
    const isInitializedRef = useRef(false);
    const parkingLotsRef = useRef(parkingLots);
    const centerRef = useRef(center);

    // 최신 값 유지
    parkingLotsRef.current = parkingLots;
    centerRef.current = center;

    // URL은 컴포넌트 마운트 시 한 번만 생성 (리렌더링 시 변경 안됨)
    const mapUrl = useMemo(() => `${MAP_URL}?v=${Date.now()}`, []);

    // 외부에서 호출 가능한 메서드들
    useImperativeHandle(ref, () => ({
      moveToLocation: (lat: number, lng: number) => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: 'MOVE_CENTER',
            payload: { lat, lng },
          })
        );
      },
      updateMarkers: (lots: ParkingLot[]) => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: 'SET_MARKERS',
            payload: { parkingLots: toMarkerData(lots) },
          })
        );
      },
      updateLastCenter: (lat: number, lng: number) => {
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: 'UPDATE_LAST_CENTER',
            payload: { lat, lng },
          })
        );
      },
    }));

    // parkingLots가 변경될 때 마커 업데이트 (초기화 이후에만)
    useEffect(() => {
      if (isInitializedRef.current && webViewRef.current) {
        webViewRef.current.postMessage(
          JSON.stringify({
            type: 'SET_MARKERS',
            payload: { parkingLots: toMarkerData(parkingLots) },
          })
        );
      }
    }, [parkingLots]);

    // WebView 메시지 핸들러
    const handleMessage = useCallback(
      (event: any) => {
        try {
          const data = JSON.parse(event.nativeEvent.data);

          if (data.type === 'ready') {
            // ready는 처음 한 번만 INIT 보내기
            if (!isInitializedRef.current) {
              isInitializedRef.current = true;
              webViewRef.current?.postMessage(
                JSON.stringify({
                  type: 'INIT',
                  payload: {
                    key: (KAKAO_MAP_API_KEY ?? '').trim(),
                    center: centerRef.current,
                    parkingLots: toMarkerData(parkingLotsRef.current),
                  },
                })
              );
            }
            return;
          }

          if (data.type === 'log') {
            console.log('[KAKAO MAP]', data.msg ?? data);
            return;
          }

          if (data.type === 'error') {
            console.error('[KAKAO MAP ERROR]', data.msg ?? data);
            return;
          }

          if (data.type === 'centerChange') {
            onCenterChange({ lat: data.lat, lng: data.lng });
          } else if (data.type === 'markerClick') {
            const lot = parkingLotsRef.current.find(p => p.id === data.id);
            if (lot) {
              onMarkerClick(lot);
            }
          }
        } catch (e) {
          console.error('WebView message error:', e);
        }
      },
      [onCenterChange, onMarkerClick]
    );

    // 웹에서는 WebView 미지원
    if (Platform.OS === 'web') {
      return (
        <View className='flex-1 bg-gray-200 items-center justify-center'>
          <Text className='text-gray-500'>웹에서는 지도 미리보기가 제한됩니다</Text>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, position: 'relative' }}>
        <WebView
          ref={webViewRef}
          source={{ uri: mapUrl }}
          cacheEnabled={false}
          incognito
          style={{ flex: 1 }}
          onMessage={handleMessage}
          javaScriptEnabled
          domStorageEnabled
          originWhitelist={['*']}
          scrollEnabled={false}
          bounces={false}
          userAgent='Mozilla/5.0 (Linux; Android 13; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36'
          mixedContentMode='always'
        />

        {/* 이 지역 재검색 버튼 */}
        {showResearchButton && (
          <Pressable
            onPress={onResearch}
            className='absolute top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg flex-row items-center active:bg-gray-100'
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <Ionicons name='refresh' size={16} color='#4f46e5' />
            <Text className='ml-2 text-indigo-600 font-semibold text-sm'>이 지역 재검색</Text>
          </Pressable>
        )}
      </View>
    );
  }
);

ParkingMap.displayName = 'ParkingMap';

export default ParkingMap;
