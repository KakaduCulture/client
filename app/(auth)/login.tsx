import { useRouter, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { saveToken } from '@/utils/token';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackVisible: false,
    });
  }, [navigation]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required');
      return;
    }

    await saveToken('fake_token_123');
    router.replace('/(tabs)/discover');
  };

  return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
        />
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
        />
        <Button title="Login" onPress={handleLogin} />
        <Button title="No account? Register" onPress={() => router.push('/(auth)/register')} />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 20,
    paddingTop: 50,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});