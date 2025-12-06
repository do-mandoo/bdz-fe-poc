/**
 * 예약 더미 데이터
 * POC용 - 간단한 예약 플로우에서 사용
 */

export type ReservationStatus =
  | 'pending' // 예약 대기
  | 'confirmed' // 예약 확정
  | 'in_use' // 이용 중
  | 'completed' // 이용 완료
  | 'cancelled' // 취소됨
  | 'expired'; // 만료됨

export interface Reservation {
  id: string;
  /** 주차장 ID (parking-lots.ts의 ParkingLot.id와 연결) */
  parkingLotId: string;
  /** 주차장 이름 (조회 편의용) */
  parkingLotName: string;
  /** 사용자 ID */
  userId: string;
  /** 차량 번호 */
  vehicleNumber: string;
  /** 예약 시작 시간 */
  startTime: string; // ISO 8601 형식
  /** 예약 종료 시간 */
  endTime: string;
  /** 예약 상태 */
  status: ReservationStatus;
  /** 총 예상 금액 */
  totalPrice: number;
  /** 결제 완료 여부 */
  isPaid: boolean;
  /** 예약 생성 시간 */
  createdAt: string;
  /** 예약 수정 시간 */
  updatedAt: string;
}

// 샘플 예약 데이터
export const RESERVATIONS: Reservation[] = [
  {
    id: 'rsv-001',
    parkingLotId: 'parking-001',
    parkingLotName: '강남역 공영주차장',
    userId: 'user-001',
    vehicleNumber: '12가 3456',
    startTime: '2025-12-10T09:00:00+09:00',
    endTime: '2025-12-10T12:00:00+09:00',
    status: 'confirmed',
    totalPrice: 9000,
    isPaid: true,
    createdAt: '2025-12-06T10:30:00+09:00',
    updatedAt: '2025-12-06T10:30:00+09:00',
  },
  {
    id: 'rsv-002',
    parkingLotId: 'parking-005',
    parkingLotName: '코엑스몰 주차장',
    userId: 'user-001',
    vehicleNumber: '12가 3456',
    startTime: '2025-12-08T14:00:00+09:00',
    endTime: '2025-12-08T18:00:00+09:00',
    status: 'completed',
    totalPrice: 14000,
    isPaid: true,
    createdAt: '2025-12-05T09:00:00+09:00',
    updatedAt: '2025-12-08T18:15:00+09:00',
  },
  {
    id: 'rsv-003',
    parkingLotId: 'parking-002',
    parkingLotName: '삼성타워 주차장',
    userId: 'user-001',
    vehicleNumber: '12가 3456',
    startTime: '2025-12-15T10:00:00+09:00',
    endTime: '2025-12-15T15:00:00+09:00',
    status: 'pending',
    totalPrice: 20000,
    isPaid: false,
    createdAt: '2025-12-06T11:00:00+09:00',
    updatedAt: '2025-12-06T11:00:00+09:00',
  },
  {
    id: 'rsv-004',
    parkingLotId: 'parking-003',
    parkingLotName: '역삼동 노상주차장',
    userId: 'user-001',
    vehicleNumber: '12가 3456',
    startTime: '2025-12-07T08:00:00+09:00',
    endTime: '2025-12-07T10:00:00+09:00',
    status: 'cancelled',
    totalPrice: 4000,
    isPaid: false,
    createdAt: '2025-12-05T20:00:00+09:00',
    updatedAt: '2025-12-06T08:00:00+09:00',
  },
];

// 예약 상태 한글 매핑
export const RESERVATION_STATUS_LABELS: Record<ReservationStatus, string> = {
  pending: '예약 대기',
  confirmed: '예약 확정',
  in_use: '이용 중',
  completed: '이용 완료',
  cancelled: '취소됨',
  expired: '만료됨',
};

// 예약 상태별 색상 (UI용)
export const RESERVATION_STATUS_COLORS: Record<ReservationStatus, string> = {
  pending: '#FFA500', // 주황
  confirmed: '#4CAF50', // 초록
  in_use: '#2196F3', // 파랑
  completed: '#9E9E9E', // 회색
  cancelled: '#F44336', // 빨강
  expired: '#757575', // 진한 회색
};

// 예약 가능 시간대 옵션 (UI 선택용)
export const TIME_SLOTS = [
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];

// 이용 시간 옵션 (시간 단위)
export const DURATION_OPTIONS = [
  { label: '1시간', value: 1 },
  { label: '2시간', value: 2 },
  { label: '3시간', value: 3 },
  { label: '4시간', value: 4 },
  { label: '5시간', value: 5 },
  { label: '6시간', value: 6 },
  { label: '종일', value: 12 },
];
