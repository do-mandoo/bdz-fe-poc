# 디버깅 가이드

## 흰 화면 문제 해결

### 1. Metro Bundler 완전 초기화

```bash
# 방법 1: 캐시 클리어 후 시작
npx expo start -c

# 방법 2: watchman 캐시 클리어 (macOS)
watchman watch-del-all
npx expo start -c

# 방법 3: node_modules 재설치 (최후의 수단)
rm -rf node_modules
npm install
npx expo start -c
```

### 2. 에뮬레이터/시뮬레이터 재시작

**Android:**
```bash
# 에뮬레이터 종료 후 재시작
adb kill-server
adb start-server
```

**iOS:**
```bash
# 시뮬레이터 완전 종료 후 재시작
xcrun simctl shutdown all
```

### 3. 에러 로그 확인

**Metro Bundler 로그:**
- 터미널에서 빨간색 에러 메시지 확인
- `SyntaxError`, `TypeError` 등의 키워드 찾기

**앱 로그:**
```bash
# Android
npx react-native log-android

# iOS
npx react-native log-ios
```

### 4. 일반적인 에러 원인

#### 4.1 임포트 에러
```typescript
// ❌ 잘못된 임포트
import { View } from 'react-native';
<View>🤖</View>  // Text가 아닌 View에 문자열

// ✅ 올바른 임포트
import { View, Text } from 'react-native';
<Text>🤖</Text>
```

#### 4.2 컴포넌트 구문 오류
```typescript
// ❌ 잘못된 구문
export function Component() {
  return (
    <View>
      <Text>Hello</Text>
    // 닫는 태그 누락
  );
}

// ✅ 올바른 구문
export function Component() {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
}
```

#### 4.3 Tailwind 클래스 오류
```typescript
// ❌ 잘못된 클래스
className="w-14 h-14 bg-blue-500 text-white"

// ✅ 올바른 클래스 (NativeWind v4)
className="w-14 h-14 bg-blue-500"
<Text className="text-white">텍스트</Text>
```

### 5. 단계별 디버깅

1. **Metro Bundler 확인**
   - 터미널에서 "Bundling complete" 메시지 확인
   - 에러 없이 빌드가 완료되는지 확인

2. **앱 연결 확인**
   - 터미널에 "Opening exp://..." 메시지 확인
   - "No apps connected" 메시지가 없는지 확인

3. **컴포넌트별 주석 처리**
   ```typescript
   // 문제 발생 시 하나씩 주석 처리하여 원인 찾기
   // <TypingIndicator />
   ```

4. **콘솔 로그 추가**
   ```typescript
   export function Component() {
     console.log('Component rendered');
     return <View>...</View>;
   }
   ```

## 자주 발생하는 문제

### "No apps connected" 에러

**원인:**
- 앱이 에뮬레이터에서 실행되지 않음
- Metro Bundler와 연결 끊김

**해결:**
```bash
# 1. Metro 재시작
npx expo start -c

# 2. 에뮬레이터에서 앱 강제 종료 후 재실행
# Android: 앱 목록에서 강제 종료
# iOS: 홈 화면으로 나가서 앱 삭제 후 재설치
```

### "Module not found" 에러

**원인:**
- 패키지 설치 누락
- node_modules 손상

**해결:**
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### "Unable to resolve module" 에러

**원인:**
- 임포트 경로 오류
- tsconfig paths 설정 문제

**해결:**
```typescript
// ❌ 잘못된 경로
import { Component } from '@/components/Component';

// ✅ 올바른 경로 (tsconfig 확인)
import { Component } from '@/components/chatbot/Component';
```

## 개발 팁

### Hot Reload 활성화
```bash
# Metro Bundler에서
r  # 앱 새로고침
R  # Metro 재시작
d  # 개발자 메뉴 열기
```

### 성능 모니터링
```bash
# React Native 개발자 메뉴에서
# - Show Perf Monitor
# - Toggle Inspector
```

### 빌드 최적화
```bash
# Production 빌드 테스트
npx expo build:android
npx expo build:ios
```

## 유용한 명령어

```bash
# 전체 클린 빌드
rm -rf node_modules
npm install
watchman watch-del-all  # macOS만
npx expo start -c

# TypeScript 타입 체크
npx tsc --noEmit

# ESLint 실행
npm run lint

# 에뮬레이터 로그 실시간 확인
npx react-native log-android
npx react-native log-ios
```
