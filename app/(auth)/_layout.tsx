import { Stack } from 'expo-router';
import { Platform } from 'react-native';

export default function AuthLayout() {
  return (
      <Stack
          screenOptions={{
            headerTransparent: true,
            headerTitle: '',
            headerShadowVisible: false,
            headerBackVisible: true,
            headerBackTitle: '',
            animation: Platform.OS === 'ios' ? 'slide_from_right' : 'fade',
          }}
      />
  );
}