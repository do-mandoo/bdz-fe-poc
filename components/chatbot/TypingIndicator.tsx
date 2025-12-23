/**
 * 타이핑 인디케이터 (로딩 애니메이션)
 */

import { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';

export function TypingIndicator() {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(dot1, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(dot2, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(dot3, {
          toValue: 1,
          duration: 400,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(dot1, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot2, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(dot3, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    animation.start();
    return () => animation.stop();
  }, []);

  const animateDot = (animatedValue: Animated.Value) => ({
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -8],
        }),
      },
    ],
  });

  return (
    <View className="mb-4">
      <Text className="text-xs text-gray-500 mb-1 ml-2">주차 도우미</Text>
      <View className="flex-row items-start">
        {/* 봇 아이콘 */}
        <View className="w-8 h-8 rounded-full bg-gray-700 items-center justify-center mr-2">
          <Text className="text-base">🤖</Text>
        </View>

        {/* 타이핑 버블 */}
        <View className="bg-gray-100 rounded-2xl px-4 py-3 flex-row gap-1.5 items-center min-h-[40px]">
          <Animated.View
            className="w-2 h-2 rounded-full bg-gray-400"
            style={animateDot(dot1)}
          />
          <Animated.View
            className="w-2 h-2 rounded-full bg-gray-400"
            style={animateDot(dot2)}
          />
          <Animated.View
            className="w-2 h-2 rounded-full bg-gray-400"
            style={animateDot(dot3)}
          />
        </View>
      </View>
    </View>
  );
}
