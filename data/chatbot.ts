/**
 * 챗봇 더미 데이터
 * POC용 - 챗봇 UI에서 사용
 */

export type MessageSender = 'user' | 'bot';
export type MessageType = 'text' | 'parking_list' | 'quick_replies' | 'reservation_confirm';

export interface ChatMessage {
  id: string;
  sender: MessageSender;
  type: MessageType;
  content: string;
  /** parking_list 타입일 때 사용 */
  parkingLotIds?: string[];
  /** quick_replies 타입일 때 사용 */
  quickReplies?: QuickReply[];
  /** 메시지 생성 시간 */
  timestamp: string;
}

export interface QuickReply {
  id: string;
  label: string;
  /** 클릭 시 전송될 메시지 */
  message: string;
}

// 빠른 질문 목록 (채팅 시작 시 표시)
export const QUICK_QUESTIONS: QuickReply[] = [
  {
    id: 'qq-001',
    label: '🅿️ 근처 주차장 찾기',
    message: '내 주변에 주차장 있어?',
  },
  {
    id: 'qq-002',
    label: '💰 저렴한 주차장',
    message: '가장 저렴한 주차장 알려줘',
  },
  {
    id: 'qq-003',
    label: '⚡ 전기차 충전',
    message: '전기차 충전 가능한 주차장 찾아줘',
  },
  {
    id: 'qq-004',
    label: '📅 예약하기',
    message: '주차장 예약하고 싶어',
  },
  {
    id: 'qq-005',
    label: '🕐 24시간 주차장',
    message: '24시간 운영하는 주차장 있어?',
  },
  {
    id: 'qq-006',
    label: '📋 내 예약 확인',
    message: '내 예약 내역 보여줘',
  },
];

// 챗봇 응답 템플릿 (키워드 기반)
export const BOT_RESPONSES: Record<string, ChatMessage> = {
  greeting: {
    id: 'bot-greeting',
    sender: 'bot',
    type: 'quick_replies',
    content: '안녕하세요! 주차장 검색 도우미입니다. 🚗\n무엇을 도와드릴까요?',
    quickReplies: QUICK_QUESTIONS.slice(0, 4),
    timestamp: '',
  },
  nearby: {
    id: 'bot-nearby',
    sender: 'bot',
    type: 'parking_list',
    content: '현재 위치 기준으로 가까운 주차장을 찾았어요! 🗺️',
    parkingLotIds: ['parking-001', 'parking-002', 'parking-003'],
    timestamp: '',
  },
  cheap: {
    id: 'bot-cheap',
    sender: 'bot',
    type: 'parking_list',
    content: '가장 저렴한 주차장들이에요! 💰',
    parkingLotIds: ['parking-003', 'parking-007', 'parking-004'],
    timestamp: '',
  },
  ev_charging: {
    id: 'bot-ev',
    sender: 'bot',
    type: 'parking_list',
    content: '전기차 충전이 가능한 주차장을 찾았어요! ⚡',
    parkingLotIds: ['parking-001', 'parking-005', 'parking-006', 'parking-008'],
    timestamp: '',
  },
  reservation: {
    id: 'bot-reservation',
    sender: 'bot',
    type: 'quick_replies',
    content: '예약을 도와드릴게요! 어떤 주차장을 예약하시겠어요?',
    quickReplies: [
      { id: 'qr-res-1', label: '강남역 공영주차장', message: '강남역 공영주차장 예약할게' },
      { id: 'qr-res-2', label: '코엑스몰 주차장', message: '코엑스몰 주차장 예약할게' },
      { id: 'qr-res-3', label: '다른 주차장 찾기', message: '다른 주차장 보여줘' },
    ],
    timestamp: '',
  },
  all_day: {
    id: 'bot-allday',
    sender: 'bot',
    type: 'parking_list',
    content: '24시간 운영하는 주차장이에요! 🕐',
    parkingLotIds: ['parking-001', 'parking-004', 'parking-005', 'parking-007'],
    timestamp: '',
  },
  my_reservations: {
    id: 'bot-my-res',
    sender: 'bot',
    type: 'text',
    content:
      '예약 내역을 확인할게요! 📋\n\n✅ 강남역 공영주차장\n12월 10일 09:00 - 12:00\n\n⏳ 삼성타워 주차장 (대기중)\n12월 15일 10:00 - 15:00',
    timestamp: '',
  },
  unknown: {
    id: 'bot-unknown',
    sender: 'bot',
    type: 'quick_replies',
    content: '죄송해요, 이해하지 못했어요. 😅\n아래 질문 중에서 선택해 주시겠어요?',
    quickReplies: QUICK_QUESTIONS.slice(0, 4),
    timestamp: '',
  },
};

// 샘플 대화 기록 (UI 테스트용)
export const SAMPLE_CONVERSATION: ChatMessage[] = [
  {
    id: 'msg-001',
    sender: 'bot',
    type: 'quick_replies',
    content: '안녕하세요! 주차장 검색 도우미입니다. 🚗\n무엇을 도와드릴까요?',
    quickReplies: QUICK_QUESTIONS.slice(0, 4),
    timestamp: '2025-12-06T10:00:00+09:00',
  },
  {
    id: 'msg-002',
    sender: 'user',
    type: 'text',
    content: '내 주변에 주차장 있어?',
    timestamp: '2025-12-06T10:00:30+09:00',
  },
  {
    id: 'msg-003',
    sender: 'bot',
    type: 'parking_list',
    content: '현재 위치 기준으로 가까운 주차장을 찾았어요! 🗺️',
    parkingLotIds: ['parking-001', 'parking-002', 'parking-003'],
    timestamp: '2025-12-06T10:00:32+09:00',
  },
  {
    id: 'msg-004',
    sender: 'user',
    type: 'text',
    content: '강남역 공영주차장 예약할게',
    timestamp: '2025-12-06T10:01:00+09:00',
  },
  {
    id: 'msg-005',
    sender: 'bot',
    type: 'reservation_confirm',
    content:
      '강남역 공영주차장 예약을 진행할게요! 📅\n\n🅿️ 강남역 공영주차장\n📍 서울특별시 강남구 강남대로 396\n💰 시간당 3,000원\n\n예약 시간을 선택해 주세요.',
    timestamp: '2025-12-06T10:01:02+09:00',
  },
];

// 키워드 매칭 (간단한 의도 분류용)
export const INTENT_KEYWORDS: Record<string, string[]> = {
  nearby: ['근처', '주변', '가까운', '내 위치', '여기'],
  cheap: ['저렴', '싼', '가격', '얼마'],
  ev_charging: ['전기차', '충전', 'EV', '전기'],
  reservation: ['예약', '예매', '잡아'],
  all_day: ['24시간', '밤새', '새벽', '야간', '종일'],
  my_reservations: ['내 예약', '예약 내역', '예약 확인', '예약 조회'],
  greeting: ['안녕', '하이', 'hi', 'hello'],
};
