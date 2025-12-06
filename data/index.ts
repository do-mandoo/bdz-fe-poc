/**
 * 더미 데이터 통합 export
 * POC 전체에서 공통으로 사용
 */

// 주차장 데이터
export { AMENITY_ICONS, PARKING_LOTS, PARKING_TYPE_LABELS, type ParkingLot } from './parking-lots';

// 예약 데이터
export {
  DURATION_OPTIONS,
  RESERVATION_STATUS_COLORS,
  RESERVATION_STATUS_LABELS,
  RESERVATIONS,
  TIME_SLOTS,
  type Reservation,
  type ReservationStatus,
} from './reservations';

// 챗봇 데이터
export {
  BOT_RESPONSES,
  INTENT_KEYWORDS,
  QUICK_QUESTIONS,
  SAMPLE_CONVERSATION,
  type ChatMessage,
  type MessageSender,
  type MessageType,
  type QuickReply,
} from './chatbot';

// 사용자 데이터
export {
  CURRENT_USER,
  VEHICLE_TYPE_ICONS,
  VEHICLE_TYPE_LABELS,
  type User,
  type Vehicle,
} from './users';
