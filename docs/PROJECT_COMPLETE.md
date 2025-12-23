# BDZ-FE-POC 챗봇 개발 완료 보고서

## 📋 프로젝트 개요

- **프로젝트명**: BDZ-FE-POC (주차 도우미 챗봇)
- **위치**: `/Users/naron/Desktop/TeamSide/bdz-fe-poc`
- **프레임워크**: Expo React Native
- **상태 관리**: React Query (서버) + Jotai (클라이언트)
- **AI 모델**: Claude Sonnet 4.5 / GPT-4o 전환 가능

---

## 🎯 완료된 기능

### 1. AI API 통합
- ✅ Claude Sonnet 4.5 API 연동 (`claude-sonnet-4-5-20250929`)
- ✅ OpenAI GPT-4o API 연동 (`gpt-4o`)
- ✅ `.env`로 API 키 관리
- ✅ 환경변수로 모델 전환 (`EXPO_PUBLIC_AI_PROVIDER`)

### 2. 상태 관리 아키텍처
- ✅ **클라이언트 상태** (Jotai): 메시지 목록, UI 상태
- ✅ **서버 상태** (React Query): API 호출, 로딩/에러 처리
- ✅ 옵티미스틱 업데이트 (사용자 메시지 즉시 표시)
- ✅ 중복 전송 방지 (`isPending` 체크)

### 3. UI 컴포넌트
- ✅ ChatMessage (봇/사용자 메시지 구분)
- ✅ ChatInput (입력창 + 전송 버튼)
- ✅ QuickReplies (빠른 답변 버튼)
- ✅ TypingIndicator (로딩 애니메이션)

### 4. UX 개선
- ✅ 자동 스크롤 (최신 메시지로)
- ✅ 키보드 자동 대응 (KeyboardAvoidingView)
- ✅ 로딩 중 버튼 비활성화
- ✅ 타이핑 인디케이터 (점 3개 애니메이션)

### 5. 위치 데이터
- ✅ 건대입구역 기본 위치 설정
- ✅ 목적지/현재 위치 액션 버튼

---

## 📁 파일 구조

```
/Users/naron/Desktop/TeamSide/bdz-fe-poc/
├── .env                          # API 키 (실제 키 포함)
├── .env.example                  # 환경변수 템플릿
├── app.json                      # Expo 설정 (JSON 에러 수정 완료)
├── app/
│   └── (tabs)/
│       ├── index.tsx             # 웰컴 페이지 (챗봇 이동 버튼)
│       └── chatbot.tsx           # 챗봇 메인 화면 ⭐
├── api/
│   └── chat-service.ts           # AI API 통합 레이어 ⭐
├── hooks/
│   ├── use-chat.ts               # 통합 Hook (Jotai + React Query) ⭐
│   └── use-chat-mutation.ts      # React Query Mutation
├── store/
│   └── chat-store.ts             # Jotai Atoms (클라이언트 상태) ⭐
├── components/
│   ├── chatbot/
│   │   ├── ChatMessage.tsx       # 메시지 컴포넌트
│   │   ├── ChatInput.tsx         # 입력창 컴포넌트 (패딩 수정)
│   │   ├── QuickReplies.tsx      # 빠른 답변 버튼 (크기 조정)
│   │   └── TypingIndicator.tsx   # 로딩 애니메이션 ⭐
│   └── providers/
│       └── QueryProvider.tsx     # React Query Provider
├── data/
│   └── locations.ts              # 위치 목업 데이터
└── docs/
    ├── ARCHITECTURE.md           # 아키텍처 문서
    ├── REACT_QUERY_GUIDE.md      # React Query 가이드
    ├── UI_IMPROVEMENTS.md        # UI 개선 내역
    └── DEBUGGING.md              # 디버깅 가이드 ⭐
```

---

## 🔑 API 키 설정

### `.env` 파일
```env
EXPO_PUBLIC_ANTHROPIC_API_KEY=your-anthropic-api-key
EXPO_PUBLIC_OPENAI_API_KEY=your-openai-api-key
EXPO_PUBLIC_AI_PROVIDER=claude
```

---

## 🚀 실행 방법

### 1. 프로젝트 디렉토리 이동
```bash
cd /Users/naron/Desktop/TeamSide/bdz-fe-poc
```

### 2. 캐시 클리어 후 시작 (중요!)
```bash
npx expo start -c
```

### 3. Android 에뮬레이터에서 실행
- 터미널에서 `a` 키 입력
- 또는 QR 코드 스캔

---

## 🐛 알려진 이슈 & 해결 방법

### 이슈 1: 흰 화면 표시

**원인:**
- Metro Bundler 캐시 문제
- 컴포넌트 구문 에러 (View에 직접 텍스트/이모지)
- 임포트 에러

**해결:**
```bash
# 방법 1: 캐시 클리어
npx expo start -c

# 방법 2: Watchman 캐시 클리어 (macOS)
watchman watch-del-all
npx expo start -c

# 방법 3: 완전 재설치
rm -rf node_modules
npm install
npx expo start -c
```

### 이슈 2: "No apps connected" 에러

**해결:**
1. Android 에뮬레이터에서 앱 강제 종료
2. 앱 삭제
3. Metro에서 `a` 눌러서 재설치

### 이슈 3: JSON 파싱 에러 (app.json)

**해결 완료:**
- `app.json`에서 JavaScript 코드 제거
- `process.env` 참조를 파일에서 직접 사용하도록 변경

---

## 📊 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────┐
│              사용자 인터페이스                    │
│  (app/(tabs)/chatbot.tsx)                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │ ChatMessage  │         │  ChatInput      │  │
│  │ QuickReplies │         │  TypingIndicator│  │
│  └──────────────┘         └─────────────────┘  │
│                                                 │
├─────────────────────────────────────────────────┤
│           통합 Hook (use-chat.ts)               │
│                                                 │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │ 클라이언트    │         │  서버 상태      │  │
│  │ 상태 (Jotai) │◄───────►│  (React Query)  │  │
│  │ - messages   │         │  - API 호출     │  │
│  │ - UI state   │         │  - 로딩/에러    │  │
│  └──────────────┘         └─────────────────┘  │
│                                                 │
├─────────────────────────────────────────────────┤
│          API 레이어 (chat-service.ts)           │
│                                                 │
│  ┌──────────────┐         ┌─────────────────┐  │
│  │ Claude API   │         │  OpenAI API     │  │
│  │ (Sonnet 4.5) │         │  (GPT-4o)       │  │
│  └──────────────┘         └─────────────────┘  │
└─────────────────────────────────────────────────┘
```

---

## 🔄 데이터 플로우

### 메시지 전송 과정
```
1. 사용자가 메시지 입력 → ChatInput
   ↓
2. sendMessage() 호출 → use-chat.ts
   ↓
3. [클라이언트 상태] 사용자 메시지 즉시 추가 (Jotai)
   ↓
4. [UI 동기화] 자동 스크롤, 버튼 비활성화
   ↓
5. [서버 상태] API 호출 시작 (React Query Mutation)
   ↓
6. [UI] TypingIndicator 표시 (isPending = true)
   ↓
7. chat-service.ts → AI API 호출
   ↓
8. AI 응답 수신
   ↓
9. [클라이언트 상태] 봇 메시지 추가 (Jotai)
   ↓
10. [UI 동기화] 자동 스크롤, 버튼 활성화, 로딩 숨김
```

---

## 🎨 UI 개선 내역

### 버튼 크기 조정 (최종)
```typescript
// QuickReplies (빠른 답변)
className="px-4 py-2.5"  // 작고 컴팩트
text="text-sm"

// 액션 버튼 (목적지/현재위치)
className="py-2.5"       // 중간 크기
text="text-sm"

// ChatInput 전송 버튼
className="w-12 h-12"    // 적절한 크기
```

### 패딩 개선
```typescript
// ChatInput
className="px-5 py-3"    // 왼쪽 패딩 증가 (px-4 → px-5)
className="px-4 py-3"    // 외부 여백 (p-3 → px-4 py-3)
className="mr-3"         // 버튼 간격 (mr-2 → mr-3)
```

### 로딩 상태 UI
```typescript
// TypingIndicator
- 점 3개 애니메이션 (위아래 이동)
- 봇 아이콘 크기 w-8 h-8
- <Text>로 이모지 렌더링 (View ❌)
```

---

## 🧪 테스트 시나리오

### 1. 기본 채팅 흐름
1. 앱 실행 → 챗봇 탭 이동
2. 인사말 메시지 확인
3. "오늘 저녁 강남역 주차 추천" 버튼 클릭
4. 로딩 인디케이터 표시 확인
5. 봇 응답 수신 확인
6. 자동 스크롤 동작 확인

### 2. 중복 전송 방지
1. 메시지 전송
2. 로딩 중 다른 버튼 클릭 시도
3. 클릭 안 됨 확인 (버튼 비활성화)

### 3. 키보드 대응
1. 입력창 포커스
2. 키보드 올라옴
3. 입력창이 키보드에 가려지지 않는지 확인

### 4. 자동 스크롤
1. 여러 메시지 연속 전송
2. 항상 최신 메시지가 보이는지 확인

---

## 🔧 주요 수정 사항 타임라인

### Phase 1: 프로젝트 셋업
- Expo 프로젝트 생성 완료 (이미 존재)
- React Query, Jotai, AI SDK 설치
- 환경변수 설정 (.env)

### Phase 2: API 통합
- `chat-service.ts` 생성
- Claude/OpenAI API 호출 함수
- 시스템 프롬프트 설정 (한국어, 2-3문장)

### Phase 3: 상태 관리
- `chat-store.ts` (Jotai) 생성
- `use-chat-mutation.ts` (React Query) 생성
- `use-chat.ts` 통합 Hook 생성

### Phase 4: UI 컴포넌트
- ChatMessage, ChatInput, QuickReplies 생성
- 메인 챗봇 화면 구현
- 웰컴 페이지 버튼 추가

### Phase 5: 버튼 클릭 이슈 해결
- 중복 전송 방지 (`isPending` 체크)
- 버튼 크기 조정 (과도하게 큼 → 적절)
- hitSlop 추가 (터치 영역 확장)

### Phase 6: 로딩 UI & 자동 스크롤
- TypingIndicator 컴포넌트 생성
- FlatList 자동 스크롤 구현
- KeyboardAvoidingView 추가

### Phase 7: 패딩 & 버튼 최종 조정
- ChatInput 패딩 증가
- 전송 버튼 크기 축소
- 액션 버튼 크기 재조정

### Phase 8: 디버깅 가이드
- 흰 화면 문제 해결 방법 문서화
- Metro 캐시 클리어 가이드
- 에러 체크리스트 작성

---

## 📝 추가 개발 권장 사항

### 1. 에러 처리 개선
```typescript
// 현재: 단순 에러 메시지
{error && <Text>{error}</Text>}

// 권장: 사용자 친화적 에러 UI
{error && (
  <View>
    <Text>죄송합니다. 문제가 발생했습니다.</Text>
    <Button onPress={retry}>다시 시도</Button>
  </View>
)}
```

### 2. 메시지 히스토리 저장
```typescript
// AsyncStorage로 로컬 저장
import AsyncStorage from '@react-native-async-storage/async-storage';

const saveMessages = async (messages: ChatMessage[]) => {
  await AsyncStorage.setItem('chat-history', JSON.stringify(messages));
};
```

### 3. 이미지 첨부 기능
```typescript
import * as ImagePicker from 'expo-image-picker';

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
  });
  // Claude Vision API로 전송
};
```

### 4. 스트리밍 응답
```typescript
// Server-Sent Events (SSE)로 실시간 응답
const streamResponse = async (message: string) => {
  const response = await fetch('api', {
    method: 'POST',
    headers: { 'Accept': 'text/event-stream' }
  });
  // 스트림 파싱
};
```

### 5. 오프라인 대응
```typescript
import NetInfo from '@react-native-community/netinfo';

NetInfo.addEventListener(state => {
  if (!state.isConnected) {
    // 오프라인 알림
  }
});
```

---

## 🔐 보안 고려사항

### 1. API 키 관리
- ✅ `.env` 파일로 관리
- ✅ `.gitignore`에 `.env` 추가 완료
- ⚠️ 프로덕션: 환경변수를 서버에서 관리 권장

### 2. 요청 제한
```typescript
// Rate Limiting 추가 권장
const MAX_REQUESTS_PER_MINUTE = 10;
const requestTimestamps: number[] = [];

const checkRateLimit = () => {
  const now = Date.now();
  const oneMinuteAgo = now - 60000;
  const recentRequests = requestTimestamps.filter(t => t > oneMinuteAgo);
  return recentRequests.length < MAX_REQUESTS_PER_MINUTE;
};
```

### 3. 입력 검증
```typescript
// 악성 입력 방지
const sanitizeInput = (input: string) => {
  return input
    .trim()
    .slice(0, 500)  // 최대 길이 제한
    .replace(/<script>/gi, '');  // XSS 방지
};
```

---

## 📚 참고 문서

### 내부 문서
- `docs/ARCHITECTURE.md` - 전체 아키텍처 설명
- `docs/REACT_QUERY_GUIDE.md` - React Query 사용법
- `docs/UI_IMPROVEMENTS.md` - UI 개선 내역
- `docs/DEBUGGING.md` - 디버깅 가이드

### 외부 링크
- [Expo Documentation](https://docs.expo.dev/)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Jotai Documentation](https://jotai.org/)
- [Claude API Documentation](https://docs.anthropic.com/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

---

## 🎓 학습 포인트

### React Query의 장점
1. **자동 캐싱**: API 응답 자동 캐싱
2. **로딩/에러 상태**: `isPending`, `error` 자동 관리
3. **재시도 로직**: 실패 시 자동 재시도
4. **옵티미스틱 업데이트**: UI 먼저 업데이트

### Jotai의 장점
1. **간단한 API**: useState와 유사한 사용법
2. **TypeScript 지원**: 완벽한 타입 추론
3. **성능 최적화**: 필요한 부분만 리렌더
4. **파생 상태**: computed values 쉽게 생성

### 상태 분리 전략
- **서버 상태** (React Query): API 호출, 캐싱, 동기화
- **클라이언트 상태** (Jotai): UI 상태, 로컬 데이터
- 각자의 책임 명확하게 분리

---

## ✅ 체크리스트

### 완료 항목
- [x] Claude API 연동
- [x] OpenAI API 연동
- [x] React Query 셋업
- [x] Jotai 셋업
- [x] 채팅 UI 구현
- [x] 로딩 인디케이터
- [x] 자동 스크롤
- [x] 키보드 대응
- [x] 중복 전송 방지
- [x] 버튼 크기 최적화
- [x] 패딩 조정
- [x] 에러 처리
- [x] 환경변수 설정
- [x] 디버깅 가이드

### 향후 개선 사항
- [ ] 메시지 히스토리 저장 (AsyncStorage)
- [ ] 이미지 첨부 기능
- [ ] 스트리밍 응답
- [ ] 오프라인 대응
- [ ] Rate Limiting
- [ ] 입력 검증 강화
- [ ] 단위 테스트
- [ ] E2E 테스트
- [ ] 성능 최적화
- [ ] 접근성 개선

---

## 🚨 중요 알림

### Metro Bundler 캐시 클리어 필수!
흰 화면이 보이거나 변경사항이 반영되지 않으면:
```bash
npx expo start -c
```

### Android 에뮬레이터 주의사항
1. 앱 강제 종료 후 재시작
2. 캐시 삭제: 설정 > 앱 > BDZ-FE-POC > 저장공간 > 캐시 삭제
3. 앱 재설치

### TypeScript 에러 무시하지 말 것
```bash
# 타입 에러 체크
npx tsc --noEmit
```

---

## 📞 문제 발생 시

### 1단계: 로그 확인
```bash
# Metro Bundler 로그
터미널에서 빨간색 에러 메시지 확인

# Android 로그
npx react-native log-android
```

### 2단계: 캐시 클리어
```bash
npx expo start -c
watchman watch-del-all  # macOS
```

### 3단계: 재설치
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### 4단계: 컴포넌트 주석 처리
문제가 있는 컴포넌트를 찾기 위해 하나씩 주석 처리

---

## 🎉 프로젝트 완료!

모든 핵심 기능이 구현되었습니다. Claude Desktop에서 작업을 이어가실 수 있습니다!

**작업 시작 명령어:**
```bash
cd /Users/naron/Desktop/TeamSide/bdz-fe-poc
npx expo start -c
```

**주요 파일:**
- `app/(tabs)/chatbot.tsx` - 메인 화면
- `api/chat-service.ts` - API 통합
- `hooks/use-chat.ts` - 상태 관리
- `components/chatbot/*.tsx` - UI 컴포넌트

---

**작성일**: 2025-12-11  
**작성자**: Claude (Anthropic)  
**프로젝트 상태**: ✅ 완료 (디버깅 필요)
