# React Query 통합 완료 ✅

## 🎉 변경 사항

### Before (기존)
```typescript
// 모든 상태를 useState로 관리
const [messages, setMessages] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

// 수동으로 API 호출 및 상태 업데이트
const response = await sendMessage(...);
setMessages([...messages, response]);
setIsLoading(false);
```

### After (개선)
```typescript
// 클라이언트 상태 (Jotai)
const [messages] = useAtom(messagesAtom);

// 서버 상태 (React Query)
const { mutateAsync, isPending, error } = useSendMessage();

// 자동 로딩/에러 관리
const response = await mutateAsync(...);
addMessage(response);  // 상태 자동 업데이트
```

## 📂 새로 추가된 파일

```
✅ store/chat-store.ts              # Jotai Atoms
✅ hooks/use-chat-mutation.ts       # React Query Mutation
✅ hooks/use-chat.ts                # 기존 파일 리팩토링
✅ docs/ARCHITECTURE.md             # 아키텍처 문서
✅ .env                             # API 키 업데이트
```

## 🔑 핵심 개념

### 1. 상태 분리
- **클라이언트 상태**: UI, 메시지 목록 → Jotai
- **서버 상태**: API 호출, 로딩, 에러 → React Query

### 2. Optimistic Update
사용자 메시지를 즉시 화면에 표시 → UX 향상

### 3. 자동 에러 처리
React Query가 자동으로 에러 상태 관리

### 4. 재시도 로직
네트워크 오류 시 자동 재시도 (1회)

## 🚀 실행 방법

```bash
# 1. 환경 변수 확인
cat .env

# 2. 앱 실행
npm start

# 3. 챗봇 탭에서 테스트
- "목적지 설정하기" 버튼 클릭
- 메시지 입력 후 전송
- AI 응답 확인
```

## 🎯 테스트 체크리스트

- [ ] Claude API 응답 확인
- [ ] OpenAI API 응답 확인 (.env에서 provider 변경)
- [ ] 로딩 인디케이터 동작
- [ ] 에러 메시지 표시 (잘못된 API 키로 테스트)
- [ ] 목적지 설정 버튼
- [ ] 현재 위치 버튼
- [ ] 빠른 질문 버튼

## 📊 성능 개선

✅ 불필요한 리렌더링 방지 (Jotai)
✅ 중복 API 호출 방지 (React Query)
✅ 자동 캐싱 (5분)
✅ 에러 재시도 (1회)

## 🔧 커스터마이징

### 재시도 횟수 변경
```typescript
// hooks/use-chat-mutation.ts
useMutation({
  retry: 3,  // 3회로 변경
})
```

### 캐시 시간 변경
```typescript
// app/_layout.tsx
staleTime: 10 * 60 * 1000,  // 10분
```

## 📝 다음 단계 (선택)

1. **AsyncStorage 연동**: 메시지 영구 저장
2. **오프라인 지원**: 네트워크 없이도 동작
3. **메시지 검색**: 과거 대화 검색 기능
4. **스트리밍 응답**: 실시간 타이핑 효과

## ⚠️ 주의사항

- API 키는 절대 Git에 커밋하지 마세요 (.gitignore 확인)
- 프로덕션에서는 백엔드 서버 필수
- 무료 API 쿼터 주의

## 🎓 학습 자료

- [React Query 공식 문서](https://tanstack.com/query)
- [Jotai 공식 문서](https://jotai.org)
- [Claude API 문서](https://docs.anthropic.com)
- [OpenAI API 문서](https://platform.openai.com/docs)
