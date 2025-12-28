/**
 * 위치 관련 목업 데이터
 */

export interface Location {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

// 건대입구역 위치
export const KONKUK_UNIVERSITY_STATION: Location = {
  id: 'loc-konkuk',
  name: '건대입구역',
  address: '서울특별시 광진구 능동로 120',
  latitude: 37.5404,
  longitude: 127.0698,
};

// 현재 위치 (기본값: 건대입구역)
export const CURRENT_LOCATION: Location = KONKUK_UNIVERSITY_STATION;

// 목적지 (기본값: 건대입구역)
export const DEFAULT_DESTINATION: Location = KONKUK_UNIVERSITY_STATION;
