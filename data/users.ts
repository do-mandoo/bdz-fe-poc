/**
 * 사용자 더미 데이터
 * POC용 - 공통으로 사용
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  /** 등록된 차량 목록 */
  vehicles: Vehicle[];
  /** 생성일 */
  createdAt: string;
}

export interface Vehicle {
  id: string;
  /** 차량 번호 */
  plateNumber: string;
  /** 차량 종류 */
  type: 'sedan' | 'suv' | 'compact' | 'ev' | 'motorcycle';
  /** 차량 이름 (닉네임) */
  nickname?: string;
  /** 기본 차량 여부 */
  isDefault: boolean;
}

// 현재 로그인한 사용자 (POC용 하드코딩)
export const CURRENT_USER: User = {
  id: 'user-001',
  name: '홍길동',
  email: 'hong@example.com',
  phone: '010-1234-5678',
  vehicles: [
    {
      id: 'vehicle-001',
      plateNumber: '12가 3456',
      type: 'sedan',
      nickname: '내 차',
      isDefault: true,
    },
    {
      id: 'vehicle-002',
      plateNumber: '34나 7890',
      type: 'ev',
      nickname: '전기차',
      isDefault: false,
    },
  ],
  createdAt: '2025-01-15T09:00:00+09:00',
};

// 차량 타입 한글 매핑
export const VEHICLE_TYPE_LABELS: Record<Vehicle['type'], string> = {
  sedan: '승용차',
  suv: 'SUV',
  compact: '경차',
  ev: '전기차',
  motorcycle: '오토바이',
};

// 차량 타입 아이콘 매핑 (Ionicons)
export const VEHICLE_TYPE_ICONS: Record<Vehicle['type'], string> = {
  sedan: 'car-outline',
  suv: 'car-sport-outline',
  compact: 'car-outline',
  ev: 'flash-outline',
  motorcycle: 'bicycle-outline',
};
