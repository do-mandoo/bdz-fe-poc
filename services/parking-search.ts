/**
 * 주차장 검색 서비스
 * 현재 위치 또는 키워드 기반으로 주차장 검색
 */

import { PARKING_LOTS, type ParkingLot } from '@/data/parking-lots';
import type { LocationCoords } from '@/hooks/use-location';

/**
 * 두 좌표 간 거리 계산 (Haversine 공식, km 단위)
 */
function calculateDistance(
  coord1: LocationCoords,
  coord2: LocationCoords
): number {
  const R = 6371; // 지구 반경 (km)
  const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
  const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.latitude * Math.PI) / 180) *
      Math.cos((coord2.latitude * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export interface ParkingSearchResult extends ParkingLot {
  distance?: number; // km 단위
}

/**
 * 현재 위치 기준으로 가까운 주차장 검색
 */
export function searchNearbyParkingLots(
  location: LocationCoords,
  maxDistance: number = 5 // km
): ParkingSearchResult[] {
  return PARKING_LOTS
    .map(lot => ({
      ...lot,
      distance: calculateDistance(location, {
        latitude: lot.latitude,
        longitude: lot.longitude,
      }),
    }))
    .filter(lot => lot.distance <= maxDistance)
    .sort((a, b) => (a.distance || 0) - (b.distance || 0));
}

/**
 * 키워드로 주차장 검색
 */
export function searchParkingLotsByKeyword(
  keyword: string
): ParkingSearchResult[] {
  const lowerKeyword = keyword.toLowerCase();
  return PARKING_LOTS.filter(
    lot =>
      lot.name.toLowerCase().includes(lowerKeyword) ||
      lot.address.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * 메시지에서 위치 키워드 추출
 */
export function extractLocationFromMessage(message: string): string | null {
  // 한국 지역명 패턴
  const locationPatterns = [
    /(\w+역)\s*(근처|주변)?/,
    /(\w+동)\s*(근처|주변)?/,
    /(\w+구)\s*(근처|주변)?/,
    /(강남|신사|청담|압구정|역삼|선릉|삼성|코엑스)/,
  ];

  for (const pattern of locationPatterns) {
    const match = message.match(pattern);
    if (match) {
      return match[1];
    }
  }
  return null;
}

/**
 * 주차장 추천 메시지 생성
 */
export function formatParkingRecommendation(
  parkingLots: ParkingSearchResult[],
  locationName?: string
): string {
  if (parkingLots.length === 0) {
    return locationName
      ? `${locationName} 근처에서 주차장을 찾을 수 없습니다.`
      : '주변에 주차장을 찾을 수 없습니다.';
  }

  const top3 = parkingLots.slice(0, 3);
  const header = locationName
    ? `${locationName} 근처 주차장 ${parkingLots.length}개를 찾았습니다:\n\n`
    : `주변 주차장 ${parkingLots.length}개를 찾았습니다:\n\n`;

  const lotDescriptions = top3
    .map((lot, index) => {
      const distance = lot.distance ? `(${lot.distance.toFixed(1)}km)` : '';
      const availability =
        lot.availableSpots > 0
          ? `잔여 ${lot.availableSpots}자리`
          : '만차';
      const price = `시간당 ${lot.pricePerHour.toLocaleString()}원`;
      return `${index + 1}. ${lot.name} ${distance}\n   📍 ${lot.address}\n   🚗 ${availability} | 💰 ${price}`;
    })
    .join('\n\n');

  return header + lotDescriptions;
}
