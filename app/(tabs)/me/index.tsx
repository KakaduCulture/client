import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {useEffect, useState} from "react";
import {useRouter} from "expo-router";
import {deleteToken} from "@/utils/token";
import TopBar from "@/components/layout/TopBar";
import {getCustomer, deleteCustomer} from "@/utils/session";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MeScreen() {
  const router = useRouter();
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    getCustomer().then(setCustomer);
  }, []);

  if (!customer)
    return (
        <View style={styles.centeredContainer}>
          <Text style={styles.buttonText}>
            {" "}
            Already have an account?{" "}
            <Text
                style={styles.linkText}
                onPress={() => router.push("/(auth)/login")}
            >
              Sign in
            </Text>{" "}
          </Text>
        </View>
    );

  const handleLogout = async () => {
    await deleteToken();
    await deleteCustomer();
    router.replace("/(auth)/login");
  };

  return (


      <View style={styles.container}>
        <TopBar/>
        <View style={styles.profileHeader}>
          <Image
              source={require("@/assets/images/story3.webp")}
              style={styles.avatar}
          />

          <View>
            <Text style={styles.name}>{customer.name}</Text>
            <Text style={styles.email}>{customer.username}</Text>

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider}/>


        <Text style={styles.sectionTitle}>My Orders</Text>
        <View style={styles.orderSection}>

          <TouchableOpacity style={styles.orderItem}>
            <FontAwesome name="credit-card" size={70} color="#C1553B"/>

            <Text style={styles.orderText}>Unpaid Order</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() =>
              router.push({
                pathname: '/orders/completed',
              })
          } style={styles.orderItem}>
            <Ionicons name="bag-check-outline" size={85} color="#C1553B"/>
            <Text style={styles.orderText}>Completed Orders</Text>
          </TouchableOpacity>
        </View>
      </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // padding: 16,
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingTop: 30,
    paddingLeft: 30,

  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginRight: 36,
    marginLeft: 10,
    backgroundColor: "#eee",
  },
  divider: {
    height: 1.5,
    backgroundColor: "#f2c088", // màu cam đất Kakadu
    width: "80%",               // chỉ chiếm 80% chiều rộng
    alignSelf: "center",        // căn giữa ngang
    // marginVertical: 24,
    marginBottom: 40,
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#222",
  },

  email: {
    fontSize: 14,
    color: "gray",
    marginBottom: 8,
  },

  logoutButton: {
    marginTop: 7,
    paddingVertical: 7,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C1553B",         // cam đất Kakadu
    backgroundColor: "#fff",        // nền trắng
    alignSelf: "flex-start",        // giữ gọn bên trái profile
  },

  logoutText: {
    color: "#C1553B",
    fontWeight: "bold",
    fontSize: 14,
  },
  settingIcon: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 35,
    marginLeft: 35,
    color: "#222",
  },
  orderSection: {
    alignItems: "center",
    gap: 40,
  },
  orderItem: {
    alignItems: "center",
    marginTop: 20,
  },
  orderText: {
    marginTop: 12,
    fontSize: 18,
    color: "#222",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
