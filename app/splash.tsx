import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { getToken } from '@/utils/token';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await getToken();
      if (token) {
        router.replace('/(tabs)/discover');
      } else {
        router.replace('/(auth)/login');
      }
    };

    // Simulate a loading delay
    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Loading App...</Text>
      </View>
  );
}