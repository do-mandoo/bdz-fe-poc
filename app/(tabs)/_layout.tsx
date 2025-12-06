import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='paper-plane-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='parking'
        options={{
          title: 'Parking',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='car-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='reservation'
        options={{
          title: 'Reservation',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='calendar-outline' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='chatbot'
        options={{
          title: 'Chatbot',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='chatbubbles-outline' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
