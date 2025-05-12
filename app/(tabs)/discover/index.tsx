import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export default function DiscoverScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Discover',
      headerRight: () => (
          <Pressable onPress={() => router.push('/(tabs)/discover/search')}>
            <IconSymbol
                name="magnifyingglass"
                size={24}
                color={Colors[colorScheme ?? 'light'].text}
                style={{ marginRight: 16 }}
            />
          </Pressable>
      ),
    });
  }, [navigation, router, colorScheme]);

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Discover Page</Text>
      </View>
  );
}