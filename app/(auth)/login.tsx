import { useRouter, useNavigation } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { View,Image, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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

  try {
    const response = await fetch('http://192.168.202.73:10000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: email, password })
    });
h
    const data = await response.json();

    if (!response.ok) {
      Alert.alert('Login Failed', data.message || 'Unknown error');
      return;
    }

    await saveToken(data.token);
    Alert.alert('Success', 'Logged in successfully');
    router.replace('/(tabs)/discover'); // chuyển hướng sau khi login
  } catch (error) {
    Alert.alert('Error', 'Unable to connect to server');
    console.error(error);
  }
};

  return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/login_logo.png')} // Hoặc từ URL: { uri: 'https://your-image-url' }
          style={styles.logo}
          resizeMode="contain"
        />


        <TextInput
            placeholder="EMAIL"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
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


      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f3bd73',
    padding: 20,
  },
  btn_login: {
    backgroundColor: '#c1553b',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 40,
    borderRadius: 8,
    
    

  },
  buttonText: {
    color: 'white',
    fontWeight: 800,

  },
  input: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 18,
    
  },
  logo: {
    width : '100%',
    
  }
});