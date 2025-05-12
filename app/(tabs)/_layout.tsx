import { Tabs, useRouter } from 'expo-router';
import React from 'react';
import { Platform, Pressable } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter(); // ✅ 在组件内声明

  return (
      <Tabs
          initialRouteName="discover"
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: { position: 'absolute' },
              default: {},
            }),
          }}
      >
        <Tabs.Screen
            name="discover"
            options={{
              // title: 'Discover',
              headerShown: false,
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
            }}
        />
        <Tabs.Screen
            name="shopping"
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart.fill" color={color} />,
            }}
        />
        <Tabs.Screen
            name="me"
            options={{
              // title: 'Me',
              headerShown: false,
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle" color={color} />,
            }}
        />
      </Tabs>
  );
}