import { useRouter } from 'expo-router';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { useState } from 'react';

export default function RegisterScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
      <View style={styles.container}>
        <Text>Register</Text>
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderBottomWidth: 1, marginBottom: 10 }}
        />
        <Button title="Register" onPress={() => router.replace('/(tabs)/discover')} />
        <Button title="Have an account? Login" onPress={() => router.replace('/(auth)/login')} />
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