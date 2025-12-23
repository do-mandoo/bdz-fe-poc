# BDZ-FE-POC - 주차 도우미 챗봇 🚗

Claude API와 ChatGPT API를 전환할 수 있는 주차장 찾기 챗봇 POC

## 📍 프로젝트 위치
```
/Users/naron/Desktop/TeamSide/bdz-fe-poc
```

## 🚀 빠른 시작

### 1. 프로젝트 이동
```bash
cd /Users/naron/Desktop/TeamSide/bdz-fe-poc
```

### 2. 앱 실행 (캐시 클리어 권장)
```bash
npx expo start -c
```

### 3. Android 에뮬레이터에서 실행
터미널에서 `a` 키 입력

---

## 🎯 주요 기능

- ✅ **AI 모델 전환**: Claude Sonnet 4.5 ↔ GPT-4o
- ✅ **상태 관리**: React Query (서버) + Jotai (클라이언트)
- ✅ **실시간 채팅**: 옵티미스틱 업데이트
- ✅ **로딩 애니메이션**: 타이핑 인디케이터 (점 3개)
- ✅ **자동 스크롤**: 최신 메시지 항상 표시
- ✅ **키보드 대응**: KeyboardAvoidingView
- ✅ **중복 방지**: 로딩 중 버튼 비활성화
- ✅ **위치 기반**: 건대입구역 기본 설정

---

## 🏗️ 아키텍처

```
┌─────────────────────────────────────┐
│         UI Layer (React Native)     │
│  - ChatMessage, ChatInput, etc.     │
├─────────────────────────────────────┤
│       State Management Layer        │
│  ┌───────────┐    ┌──────────────┐ │
│  │  Jotai    │◄──►│ React Query  │ │
│  │ (Client)  │    │  (Server)    │ │
│  └───────────┘    └──────────────┘ │
├─────────────────────────────────────┤
│      API Layer (chat-service.ts)    │
├─────────────────────────────────────┤
│   Claude API  │  OpenAI API         │
└─────────────────────────────────────┘
```

### 상태 관리 전략
- **클라이언트 상태** (Jotai): 메시지 목록, UI 상태
- **서버 상태** (React Query): API 호출, 로딩/에러

---

## 📁 프로젝트 구조

```
bdz-fe-poc/
├── 📄 QUICK_START.md           ← 5분 안에 시작하기
├── 📄 STATUS.md                ← 현재 상태 & 이슈
├── 📄 README.md                ← 이 파일
│
├── 📁 docs/
│   ├── PROJECT_COMPLETE.md     ← ⭐ 전체 문서 (필독)
│   ├── DEBUGGING.md            ← 디버깅 가이드
│   ├── ARCHITECTURE.md         ← 아키텍처 상세
│   ├── REACT_QUERY_GUIDE.md    ← React Query 사용법
│   └── UI_IMPROVEMENTS.md      ← UI 개선 히스토리
│
├── 📁 app/
│   └── (tabs)/
│       ├── index.tsx           ← 웰컴 페이지
│       └── chatbot.tsx         ← ⭐ 챗봇 메인 화면
│
├── 📁 api/
│   └── chat-service.ts         ← ⭐ AI API 통합
│
├── 📁 hooks/
│   ├── use-chat.ts             ← ⭐ 통합 Hook
│   └── use-chat-mutation.ts    ← React Query Mutation
│
├── 📁 store/
│   └── chat-store.ts           ← ⭐ Jotai Atoms
│
├── 📁 components/
│   └── chatbot/
│       ├── ChatMessage.tsx     ← 메시지 컴포넌트
│       ├── ChatInput.tsx       ← 입력창
│       ├── QuickReplies.tsx    ← 빠른 답변 버튼
│       └── TypingIndicator.tsx ← 로딩 애니메이션
│
├── 📁 data/
│   └── locations.ts            ← 위치 목업
│
└── 📄 .env                     ← ⭐ API 키 (설정 완료)
```

---

## 🔑 환경 변수

`.env` 파일 (이미 설정됨):
```env
EXPO_PUBLIC_ANTHROPIC_API_KEY=sk-ant-api03-...
EXPO_PUBLIC_OPENAI_API_KEY=sk-proj-...
EXPO_PUBLIC_AI_PROVIDER=claude
```

AI 모델 전환: `.env`에서 `EXPO_PUBLIC_AI_PROVIDER` 변경
- `claude` → Claude Sonnet 4.5
- `openai` → GPT-4o

---

## 🔄 데이터 플로우

```
사용자 입력 (ChatInput)
    ↓
[클라이언트] 메시지 즉시 추가 (Jotai)
    ↓
[UI] 자동 스크롤, 버튼 비활성화
    ↓
[서버] API 호출 시작 (React Query)
    ↓
[UI] 타이핑 인디케이터 표시
    ↓
AI API (Claude / ChatGPT)
    ↓
[서버] 응답 수신
    ↓
[클라이언트] 봇 메시지 추가 (Jotai)
    ↓
[UI] 자동 스크롤, 버튼 활성화
```

---

## 🐛 문제 해결

### 흰 화면이 보일 때
```bash
# 1단계: 캐시 클리어 (가장 효과적)
npx expo start -c

# 2단계: Watchman 캐시 클리어 (macOS)
watchman watch-del-all
npx expo start -c

# 3단계: 완전 재설치
rm -rf node_modules
npm install
npx expo start -c
```

### "No apps connected" 에러
1. Android 에뮬레이터에서 앱 강제 종료
2. 터미널에서 `a` 눌러서 재설치

### 로그 확인
```bash
# Android 로그 실시간 확인
npx react-native log-android

# TypeScript 타입 체크
npx tsc --noEmit
```

**더 자세한 디버깅**: `docs/DEBUGGING.md` 참고

---

## 📦 주요 라이브러리

| 라이브러리 | 용도 | 버전 |
|----------|------|------|
| `@tanstack/react-query` | 서버 상태 관리 | 최신 |
| `jotai` | 클라이언트 상태 관리 | 최신 |
| `@anthropic-ai/sdk` | Claude API | 최신 |
| `openai` | OpenAI API | 최신 |
| `nativewind` | Tailwind CSS | v4 |

---

## 🧪 테스트

### 기본 흐름
1. 앱 실행 → 챗봇 탭 이동
2. 인사말 확인
3. "오늘 저녁 강남역 주차 추천" 클릭
4. 로딩 인디케이터 확인
5. 봇 응답 수신
6. 자동 스크롤 확인

### 중복 전송 방지
1. 메시지 전송
2. 로딩 중 다른 버튼 클릭
3. 클릭 안 됨 확인 (버튼 회색)

### 키보드 대응
1. 입력창 포커스
2. 키보드 올라옴
3. 입력창 가려지지 않는지 확인

---

## 📚 문서

### 시작하기
- **QUICK_START.md** - 5분 안에 시작하는 방법
- **STATUS.md** - 현재 상태 & 알려진 이슈

### 상세 문서
- **docs/PROJECT_COMPLETE.md** ⭐ - 전체 프로젝트 문서 (필독)
- **docs/DEBUGGING.md** - 문제 해결 가이드
- **docs/ARCHITECTURE.md** - 아키텍처 상세 설명
- **docs/REACT_QUERY_GUIDE.md** - React Query 사용법
- **docs/UI_IMPROVEMENTS.md** - UI 개선 히스토리

---

## 🎓 학습 포인트

### React Query의 장점
- 자동 캐싱 & 동기화
- 로딩/에러 상태 자동 관리
- 재시도 로직 내장
- 옵티미스틱 업데이트

### Jotai의 장점
- 간단한 API (useState와 유사)
- TypeScript 완벽 지원
- 불필요한 리렌더 방지
- 파생 상태 쉽게 생성

### 상태 분리의 이점
- **서버 상태**: API 호출, 캐싱 → React Query
- **클라이언트 상태**: UI, 로컬 데이터 → Jotai
- 각자의 책임 명확하게 분리

---

## 🔐 보안

### API 키 관리
- ✅ `.env` 파일로 관리
- ✅ `.gitignore`에 추가
- ⚠️ 프로덕션: 서버에서 관리 권장

### 입력 검증
- 최대 길이: 500자
- XSS 방지: 기본 sanitize

---

## 📈 향후 개선 사항

### 우선순위 높음
- [ ] 메시지 히스토리 저장 (AsyncStorage)
- [ ] 에러 처리 개선 (재시도 버튼)
- [ ] Rate Limiting

### 우선순위 중간
- [ ] 이미지 첨부 기능
- [ ] 스트리밍 응답 (SSE)
- [ ] 오프라인 대응

### 우선순위 낮음
- [ ] 단위 테스트
- [ ] E2E 테스트
- [ ] 접근성 개선
- [ ] 성능 최적화

---

## ⚡ 자주 사용하는 명령어

```bash
# 앱 시작 (캐시 클리어)
npx expo start -c

# Android 로그 확인
npx react-native log-android

# TypeScript 타입 체크
npx tsc --noEmit

# ESLint 실행
npm run lint

# 전체 클린 빌드
rm -rf node_modules && npm install && npx expo start -c
```

---

## 🎯 프로젝트 상태

**현재**: 🟡 디버깅 진행 중  
**완료도**: 90% (핵심 기능 완료, 디버깅 필요)

### 완료된 작업
- [x] Claude/OpenAI API 통합
- [x] React Query + Jotai 셋업
- [x] 채팅 UI 구현
- [x] 로딩 애니메이션
- [x] 자동 스크롤
- [x] 중복 방지
- [x] 문서화

### 진행 중
- [ ] 흰 화면 디버깅

---

## 📞 지원

### 문제 발생 시
1. `QUICK_START.md` 확인
2. `docs/DEBUGGING.md` 참고
3. Metro Bundler 로그 확인
4. `docs/PROJECT_COMPLETE.md` 참고

### Claude Desktop에서 작업
```bash
cd /Users/naron/Desktop/TeamSide/bdz-fe-poc
npx expo start -c
```

---

## 👨‍💻 개발 정보

- **작성일**: 2025-12-11
- **프레임워크**: Expo React Native
- **플랫폼**: Android (테스트 완료), iOS (미테스트)
- **상태**: 개발 완료, 디버깅 진행 중

---

## 📄 라이선스

이 프로젝트는 POC(Proof of Concept)입니다.

---

**🚀 시작하기**: `npx expo start -c`  
**📖 전체 문서**: `docs/PROJECT_COMPLETE.md`  
**❓ 문제 해결**: `docs/DEBUGGING.md`
