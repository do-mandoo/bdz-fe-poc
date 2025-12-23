/**
 * 타이핑 인디케이터 (로딩 애니메이션)
 * . -> .. -> ... 순차적으로 파란색 dot 표시
 */

import { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function TypingIndicator() {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount(prev => (prev >= 3 ? 1 : prev + 1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>주차 도우미</Text>
      <View style={styles.row}>
        {/* 봇 아이콘 */}
        <View style={styles.avatar}>
          <Text style={styles.emoji}>🤖</Text>
        </View>

        {/* 타이핑 버블 */}
        <View style={styles.bubble}>
          <View style={[styles.dot, dotCount >= 1 && styles.dotActive]} />
          <View style={[styles.dot, dotCount >= 2 && styles.dotActive]} />
          <View style={[styles.dot, dotCount >= 3 && styles.dotActive]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#374151',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  emoji: {
    fontSize: 16,
  },
  bubble: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    minHeight: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
  },
  dotActive: {
    backgroundColor: '#3B82F6',
  },
});
