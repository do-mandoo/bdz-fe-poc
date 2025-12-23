# 빠른 시작 가이드 (Quick Start)

## 📍 프로젝트 위치
```
/Users/naron/Desktop/TeamSide/bdz-fe-poc
```

## 🚀 5분 안에 시작하기

### 1. 프로젝트 이동
```bash
cd /Users/naron/Desktop/TeamSide/bdz-fe-poc
```

### 2. 앱 실행 (캐시 클리어)
```bash
npx expo start -c
```

### 3. Android 에뮬레이터에서 실행
- 터미널에서 `a` 키 입력

---

## 🔑 API 키 (이미 설정됨)

`.env` 파일에 이미 설정되어 있습니다:
- Claude API: ✅ 설정 완료
- OpenAI API: ✅ 설정 완료
- AI Provider: `claude` (기본값)

---

## 🐛 문제 해결

### 흰 화면이 보일 때
```bash
# 방법 1: 캐시 클리어 (가장 간단)
npx expo start -c

# 방법 2: Watchman 캐시 클리어
watchman watch-del-all
npx expo start -c

# 방법 3: 완전 재설치
rm -rf node_modules
npm install
npx expo start -c
```

### "No apps connected" 에러
1. Android 에뮬레이터에서 앱 강제 종료
2. 터미널에서 `a` 눌러서 재설치

---

## 📁 주요 파일

```
app/(tabs)/chatbot.tsx       ← 메인 챗봇 화면
api/chat-service.ts          ← AI API 통합
hooks/use-chat.ts            ← 상태 관리
components/chatbot/*.tsx     ← UI 컴포넌트
docs/PROJECT_COMPLETE.md     ← 전체 문서 ⭐
```

---

## 🎯 완료된 기능

- ✅ Claude Sonnet 4.5 / GPT-4o 전환
- ✅ 실시간 채팅
- ✅ 로딩 애니메이션
- ✅ 자동 스크롤
- ✅ 중복 전송 방지
- ✅ 키보드 대응

---

## 📚 상세 문서

모든 정보는 `docs/PROJECT_COMPLETE.md`에 있습니다:
- 전체 아키텍처
- 파일 구조
- 데이터 플로우
- 디버깅 가이드
- 개선 사항 타임라인

---

## ⚡ 자주 사용하는 명령어

```bash
# 앱 시작 (캐시 클리어)
npx expo start -c

# Android 로그 확인
npx react-native log-android

# TypeScript 타입 체크
npx tsc --noEmit

# 전체 클린 빌드
rm -rf node_modules && npm install && npx expo start -c
```

---

**Claude Desktop에서 작업 시작하려면:**
1. 터미널 열기
2. `cd /Users/naron/Desktop/TeamSide/bdz-fe-poc`
3. `npx expo start -c`
4. `docs/PROJECT_COMPLETE.md` 읽기

**상태**: ✅ 개발 완료 (디버깅 진행 중)
