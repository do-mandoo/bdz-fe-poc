# BDZ Frontend POC 🚗

React Native(Expo) 기반 주차장 서비스 POC 프로젝트입니다.

## 📋 POC 목표

12월 동안 3가지 핵심 기능을 각자 1인 1개씩 POC합니다:

| POC | 담당 | 탭 파일 | 설명 |
|-----|------|---------|------|
| 주차장 리스트 + 지도 | - | `parking.tsx` | Kakao Map 연동, 주차장 마커 표시 |
| 간단한 예약 플로우 | - | `reservation.tsx` | 예약 |
| 챗봇 UI | - | `chatbot.tsx` | 자연어 검색 |

---

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 앱 실행

```bash
npx expo start
```

실행 후 터미널에서 다음 옵션을 선택할 수 있습니다:

- Expo Go 앱으로 QR코드 스캔(아래 옵션을 선택하지 않아도 QR 코드만 스캔하면 Expo Go 앱으로 자동으로 연결됩니다.)
- `a` - Android 에뮬레이터에서 실행
- `i` - iOS 시뮬레이터에서 실행 (macOS만)
- `w` - 웹 브라우저에서 실행

> 💡 **Tip**: 실제 기기에서 테스트하려면 [Expo Go](https://expo.dev/go) 앱을 설치하세요. 회원가입/로그인 없이도 사용할 수 있습니다.<br/>
> 💡 **Tip**: a와 i 옵션은 해당 에뮬레이터/시뮬레이터 환경이 사전에 설치·설정되어 있어야 정상 동작합니다.
---

## 📁 프로젝트 구조

```
bdz-fe-poc/
├── app/                      # 화면 (file-based routing)
│   ├── _layout.tsx           # 루트 레이아웃
│   ├── modal.tsx             # 모달 화면
│   └── (tabs)/               # 탭 네비게이션
│       ├── _layout.tsx       # 탭 레이아웃
│       ├── index.tsx         # 홈 (Expo 템플릿 참고용)
│       ├── explore.tsx       # 탐색 (Expo 템플릿 참고용)
│       ├── parking.tsx       # 🅿️ 주차장 POC
│       ├── reservation.tsx   # 📅 예약 POC
│       └── chatbot.tsx       # 💬 챗봇 POC
├── components/               # 재사용 컴포넌트
├── constants/                # 상수 (색상, 폰트 등)
├── data/                     # 더미 데이터
├── hooks/                    # 커스텀 훅
└── assets/                   # 이미지, 폰트 등
```

---

## 📂 `app/(tabs)` 폴더 설명

탭 네비게이션 기반의 화면들이 위치합니다.

### `_layout.tsx`
탭 네비게이터 설정 파일입니다. 각 탭의 아이콘, 타이틀, 순서를 정의합니다.

### `index.tsx` / `explore.tsx` (Expo 기본 템플릿)
> ⚠️ **삭제하지 않은 이유**
>
> 이 두 파일은 `create-expo-app`으로 프로젝트 생성 시 기본 제공되는 템플릿 파일입니다.
> RN/Expo를 처음 접하는 팀원들이 참고할 수 있도록 의도적으로 남겨두었습니다.
>
> - **`index.tsx`**: `ParallaxScrollView`, `ThemedText`, `ThemedView` 등 기본 컴포넌트 사용법 예시
> - **`explore.tsx`**: `Collapsible`, `ExternalLink`, `IconSymbol` 등 UI 컴포넌트 사용법 예시
>
> POC 작업 시 이 파일들을 참고하여 컴포넌트 사용법을 익히세요.
> 본 개발 시작 전에 삭제해도 됩니다.

### `parking.tsx`
**주차장 리스트 + 지도 POC** 화면입니다.
- Kakao Map API 연동
- 주차장 마커 표시
- 주차장 리스트 렌더링
- 더미 데이터: `data/parking-lots.ts`

### `reservation.tsx`
**간단한 예약 플로우 POC** 화면입니다.
- 주차장 선택 → 시간 선택 → 확인 → 완료/실패
- 예약 상태 관리
- 더미 데이터: `data/reservations.ts`

### `chatbot.tsx`
**챗봇 UI POC** 화면입니다.
- 채팅 인터페이스
- 빠른 질문 버튼
- 주차장 추천 연동
- 더미 데이터: `data/chatbot.ts`

---

## 📦 `data` 폴더 설명

POC에서 공통으로 사용하는 더미 데이터입니다. 실제 API 연동 전까지 이 데이터를 활용하세요. 각자의 필요에 맞게 수정하셔도 좋습니다.

### `parking-lots.ts`
주차장 목록 데이터입니다.

```typescript
import { PARKING_LOTS } from '@/data';

// 사용 예시
PARKING_LOTS.map(lot => (
  <Text>{lot.name} - {lot.pricePerHour}원/시간</Text>
));
```

**포함 정보:**
- `id`, `name`, `address` - 기본 정보
- `latitude`, `longitude` - 지도 좌표
- `pricePerHour`, `maxPricePerDay` - 요금 정보
- `totalSpots`, `availableSpots` - 주차 공간
- `operatingHours`, `is24Hours` - 운영 시간
- `type` - 주차장 타입 (outdoor, indoor, mechanical, underground)
- `amenities` - 편의시설 (CCTV, 장애인주차, 전기차충전 등)
- `rating`, `reviewCount` - 평점/리뷰

### `reservations.ts`
예약 데이터 및 관련 상수입니다.

```typescript
import { RESERVATIONS, TIME_SLOTS, DURATION_OPTIONS } from '@/data';

// 예약 상태: pending, confirmed, in_use, completed, cancelled, expired
```

**포함 정보:**
- `RESERVATIONS` - 샘플 예약 데이터
- `TIME_SLOTS` - 예약 가능 시간대 (00:00 ~ 23:30, 30분 단위)
- `DURATION_OPTIONS` - 이용 시간 옵션 (1시간 ~ 종일)
- `RESERVATION_STATUS_LABELS` - 상태 한글 매핑
- `RESERVATION_STATUS_COLORS` - 상태별 색상

### `chatbot.ts`
챗봇 관련 데이터입니다.

```typescript
import { QUICK_QUESTIONS, BOT_RESPONSES, INTENT_KEYWORDS } from '@/data';

// 빠른 질문 버튼 렌더링
QUICK_QUESTIONS.map(q => (
  <Button onPress={() => sendMessage(q.message)}>{q.label}</Button>
));
```

**포함 정보:**
- `QUICK_QUESTIONS` - 빠른 질문 목록 (근처 주차장, 저렴한 주차장 등)
- `BOT_RESPONSES` - 챗봇 응답 템플릿
- `SAMPLE_CONVERSATION` - 샘플 대화 기록
- `INTENT_KEYWORDS` - 의도 분류용 키워드

### `users.ts`
사용자 및 차량 데이터입니다.

```typescript
import { CURRENT_USER } from '@/data';

// 현재 로그인한 사용자 정보
console.log(CURRENT_USER.name); // "홍길동"
console.log(CURRENT_USER.vehicles[0].plateNumber); // "12가 3456"
```

### `index.ts`
모든 더미 데이터를 통합 export합니다. `@/data`로 한 번에 import 가능합니다.

```typescript
// 개별 import
import { PARKING_LOTS } from '@/data/parking-lots';

// 통합 import (권장)
import { PARKING_LOTS, RESERVATIONS, QUICK_QUESTIONS } from '@/data';
```

---

## 📚 설치된 라이브러리

POC에서 사용할 핵심 라이브러리들이 미리 설치되어 있습니다.

### NativeWind (Tailwind CSS)

React Native에서 Tailwind CSS 문법을 사용할 수 있습니다.

```tsx
import { View, Text } from 'react-native';

export default function Example() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-2xl font-bold">Hello!</Text>
    </View>
  );
}
```

> 📖 [NativeWind 문서](https://www.nativewind.dev/)

### Axios

HTTP 요청을 위한 라이브러리입니다.

```typescript
import axios from 'axios';

const fetchData = async () => {
  const response = await axios.get('https://api.example.com/data');
  return response.data;
};
```

### Jotai (상태 관리)

가볍고 간단한 상태 관리 라이브러리입니다. Provider 없이 바로 사용 가능합니다.

```typescript
import { atom, useAtom } from 'jotai';

// atom 정의
const countAtom = atom(0);

// 컴포넌트에서 사용
function Counter() {
  const [count, setCount] = useAtom(countAtom);
  return (
    <Button onPress={() => setCount(c => c + 1)}>
      Count: {count}
    </Button>
  );
}
```

> 📖 [Jotai 문서](https://jotai.org/)

### TanStack Query (React Query)

서버 상태 관리 및 데이터 페칭 라이브러리입니다. Provider가 `app/_layout.tsx`에 설정되어 있습니다.

```typescript
import { useQuery } from '@tanstack/react-query';

function ParkingList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['parkingLots'],
    queryFn: () => axios.get('/api/parking-lots').then(res => res.data),
  });

  if (isLoading) return <Text>로딩 중...</Text>;
  if (error) return <Text>에러 발생</Text>;

  return data.map(lot => <ParkingCard key={lot.id} {...lot} />);
}
```

> 📖 [TanStack Query 문서](https://tanstack.com/query/latest)

---

## 📖 참고 자료

- [Expo 공식 문서](https://docs.expo.dev/)
- [React Native 공식 문서](https://reactnative.dev/)
- [Expo Router (file-based routing)](https://docs.expo.dev/router/introduction/)
- [Kakao Map API](https://apis.map.kakao.com/)

---

## 🎯 POC 진행 시 참고사항

1. 작업 전 본인 브랜치를 생성해 주세요. 완료 후 PR로 공유하면 됩니다. (예: `feat/parking-map`, `feat/reservation-flow`)
2. 각자 담당한 탭 파일(`parking.tsx`, `reservation.tsx`, `chatbot.tsx`)에서 작업하세요.
3. `data/` 폴더의 더미 데이터를 활용하세요.
4. 공통 컴포넌트가 필요하면 `components/` 폴더에 추가하세요.
5. `index.tsx`, `explore.tsx`를 참고하여 Expo 컴포넌트 사용법을 익히세요.
6. 컨벤션 논의 결과는 팀에서 별도로 정리합니다.
