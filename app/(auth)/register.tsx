import { useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";

export default function RegisterScreen() {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async() => {
    if (!name.trim()) {
      return setError("Full name is required");
    }
    if (!username.trim()) {
      return setError("Email is required");
    }
    if (!emailRegex.test(username)) {
      return setError("Invalid email format");
    }
    if (!password.trim()) {
      return setError("Password is required");
    }
    if (!confirmPassword.trim()) {
      return setError("Confirm password is required");
    }
    if(password!== confirmPassword){
      return setError("Passwords do not match");
    }
    setError("");
  

    try {
     
      const response = await fetch('http://192.168.202.102:10000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          password
        }),
      });
    
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
    
        if (!response.ok) {
          const errorMsg = data.errors?.[0]?.msg || data.message || 'Registration failed';
          return setError(errorMsg);
        }
    
        console.log('Success:', data);
      } else {
        const text = await response.text();
        console.warn('Server returned non-JSON:', text);
        setError('Server error: unexpected response.');
      }
     
      // router.replace("/(tabs)/discover");
    } catch (err) {
      console.error('Lỗi fetch:', err);
      console.error(err);
      setError('Network error. Please try again later.');

    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require("./../../assets/images/kakadu.png")}
              style={styles.logo}
            ></Image>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            {error !== "" && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity
              style={styles.button}
              onPress={(handleRegister) 
                // => router.replace("/(tabs)/discover")
              }
            >
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
            <Text style={styles.buttonText}>
              {" "}
              Already have an account?{" "}
              <Text
                style={styles.linkText}
                onPress={() => router.replace("/(auth)/login")}
              >
                Sign in
              </Text>{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3BE74",
    padding: 20,
    paddingTop: 50,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginBottom: 40,
  },
  inputContainer: {},
  input: {
    backgroundColor: "#FFF9EB",
    borderWidth: 0.4,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 11,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 15,
  },
  button: {
    backgroundColor: "#C1553B",
    borderRadius: 3,
    marginBottom: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  linkText: {
    color: "#C1553B",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
});
