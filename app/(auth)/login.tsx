import {useRouter, useNavigation} from 'expo-router';
import {useLayoutEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {saveToken} from '@/utils/token';
import {saveCustomer} from '@/utils/session';
import Constants from 'expo-constants';

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

    try {
      const API_BASE_URL =
          Constants.expoConfig?.extra?.API_BASE_URL ??
          Constants.manifest2?.extra?.API_BASE_URL;
          console.log("url:", API_BASE_URL );
          console.log("Start to login")
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: email, password}),
      });

      // console.log("response:", response);

      const data = await response.json();

      console.log("data:", data);

      // console.log('data', data);

      if (!response.ok) {
        Alert.alert('Login Failed', data.message || 'Unknown error');
        return;
      }

      await saveToken(data.token);
      await saveCustomer(data.user);
      Alert.alert('Success', 'Logged in successfully');
      router.replace('/(tabs)/discover');
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to server');
      console.error(error);
    }
  };

  return (
      <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.inner}>
            <Image
                source={require('../../assets/images/login_logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <TextInput
                placeholder="EMAIL"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                placeholder="PASSWORD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity style={styles.btn_login} onPress={handleLogin}>
              <Text style={styles.buttonText}>LOG IN</Text>
            </TouchableOpacity>

            <Text style={styles.buttonText}>
              {" "}
              Don't have an account?{" "}
              <Text
                  style={styles.linkText}
                  onPress={() => router.replace('/(auth)/register')}
              >
                Sign up
              </Text>{" "}
            </Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3bd73',
  },
  inner: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
  },
  btn_login: {
    backgroundColor: '#c1553b',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#C1553B',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
