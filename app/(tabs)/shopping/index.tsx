import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export default function ShoppingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Shopping',
      headerRight: () => (
          <Pressable onPress={() => router.push('/(tabs)/shopping/cart')}>
            <IconSymbol
                name="bag.fill"
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
        <Text>Shopping Page</Text>
      </View>
  );
}