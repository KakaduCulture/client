import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { deleteToken } from '@/utils/token';

export default function MeScreen() {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteToken();
    router.replace('/(auth)/login');
  };

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
  );
}