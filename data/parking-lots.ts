/**
 * 주차장 더미 데이터
 * POC용 - 주차장 리스트 + 지도 화면에서 사용
 */

export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  /** 시간당 요금 (원) */
  pricePerHour: number;
  /** 일일 최대 요금 (원) */
  maxPricePerDay: number;
  /** 총 주차 공간 */
  totalSpots: number;
  /** 남은 주차 공간 */
  availableSpots: number;
  /** 운영 시간 */
  operatingHours: {
    open: string; // "HH:mm" 형식
    close: string;
  };
  /** 24시간 운영 여부 */
  is24Hours: boolean;
  /** 주차장 타입 */
  type: 'outdoor' | 'indoor' | 'mechanical' | 'underground';
  /** 편의시설 */
  amenities: string[];
  /** 이미지 URL (실제 사용시 교체) */
  imageUrl?: string;
  /** 평점 (1-5) */
  rating: number;
  /** 리뷰 개수 */
  reviewCount: number;
}

// 서울 강남 근처 좌표 기준 더미 데이터
export const PARKING_LOTS: ParkingLot[] = [
  {
    id: 'parking-001',
    name: '강남역 공영주차장',
    address: '서울특별시 강남구 강남대로 396',
    latitude: 37.498095,
    longitude: 127.02761,
    pricePerHour: 3000,
    maxPricePerDay: 30000,
    totalSpots: 200,
    availableSpots: 45,
    operatingHours: { open: '00:00', close: '23:59' },
    is24Hours: true,
    type: 'underground',
    amenities: ['CCTV', '장애인주차', '전기차충전'],
    rating: 4.2,
    reviewCount: 128,
  },
  {
    id: 'parking-002',
    name: '삼성타워 주차장',
    address: '서울특별시 강남구 테헤란로 152',
    latitude: 37.500622,
    longitude: 127.036456,
    pricePerHour: 4000,
    maxPricePerDay: 40000,
    totalSpots: 350,
    availableSpots: 120,
    operatingHours: { open: '06:00', close: '23:00' },
    is24Hours: false,
    type: 'indoor',
    amenities: ['CCTV', '발렛파킹', '세차서비스'],
    rating: 4.5,
    reviewCount: 256,
  },
  {
    id: 'parking-003',
    name: '역삼동 노상주차장',
    address: '서울특별시 강남구 역삼동 123-45',
    latitude: 37.501234,
    longitude: 127.039876,
    pricePerHour: 2000,
    maxPricePerDay: 20000,
    totalSpots: 50,
    availableSpots: 5,
    operatingHours: { open: '09:00', close: '21:00' },
    is24Hours: false,
    type: 'outdoor',
    amenities: ['CCTV'],
    rating: 3.8,
    reviewCount: 42,
  },
  {
    id: 'parking-004',
    name: '선릉역 기계식주차장',
    address: '서울특별시 강남구 선릉로 428',
    latitude: 37.504567,
    longitude: 127.048912,
    pricePerHour: 2500,
    maxPricePerDay: 25000,
    totalSpots: 80,
    availableSpots: 0,
    operatingHours: { open: '00:00', close: '23:59' },
    is24Hours: true,
    type: 'mechanical',
    amenities: ['CCTV', '장애인주차'],
    rating: 3.5,
    reviewCount: 67,
  },
  {
    id: 'parking-005',
    name: '코엑스몰 주차장',
    address: '서울특별시 강남구 영동대로 513',
    latitude: 37.512012,
    longitude: 127.058345,
    pricePerHour: 3500,
    maxPricePerDay: 35000,
    totalSpots: 4500,
    availableSpots: 1200,
    operatingHours: { open: '00:00', close: '23:59' },
    is24Hours: true,
    type: 'underground',
    amenities: ['CCTV', '장애인주차', '전기차충전', '발렛파킹', '세차서비스'],
    rating: 4.7,
    reviewCount: 1024,
  },
  {
    id: 'parking-006',
    name: '청담동 프라이빗 주차장',
    address: '서울특별시 강남구 청담동 89-12',
    latitude: 37.519876,
    longitude: 127.053456,
    pricePerHour: 5000,
    maxPricePerDay: 50000,
    totalSpots: 30,
    availableSpots: 8,
    operatingHours: { open: '08:00', close: '22:00' },
    is24Hours: false,
    type: 'indoor',
    amenities: ['CCTV', '발렛파킹', '세차서비스', '전기차충전'],
    rating: 4.8,
    reviewCount: 89,
  },
  {
    id: 'parking-007',
    name: '신사동 공영주차장',
    address: '서울특별시 강남구 신사동 541-23',
    latitude: 37.516789,
    longitude: 127.021234,
    pricePerHour: 2000,
    maxPricePerDay: 18000,
    totalSpots: 100,
    availableSpots: 32,
    operatingHours: { open: '00:00', close: '23:59' },
    is24Hours: true,
    type: 'outdoor',
    amenities: ['CCTV', '장애인주차'],
    rating: 4.0,
    reviewCount: 156,
  },
  {
    id: 'parking-008',
    name: '압구정 로데오 주차장',
    address: '서울특별시 강남구 압구정로 172',
    latitude: 37.527345,
    longitude: 127.039567,
    pricePerHour: 4500,
    maxPricePerDay: 45000,
    totalSpots: 150,
    availableSpots: 22,
    operatingHours: { open: '10:00', close: '23:00' },
    is24Hours: false,
    type: 'underground',
    amenities: ['CCTV', '발렛파킹', '전기차충전'],
    rating: 4.3,
    reviewCount: 203,
  },
];

// 편의시설 아이콘 매핑 (Ionicons 기준)
export const AMENITY_ICONS: Record<string, string> = {
  CCTV: 'videocam-outline',
  장애인주차: 'accessibility-outline',
  전기차충전: 'flash-outline',
  발렛파킹: 'key-outline',
  세차서비스: 'water-outline',
};

// 주차장 타입 한글 매핑
export const PARKING_TYPE_LABELS: Record<ParkingLot['type'], string> = {
  outdoor: '노외주차장',
  indoor: '실내주차장',
  mechanical: '기계식주차장',
  underground: '지하주차장',
};
