import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  StatusBar,
} from "react-native";
import { getUnpaidOrders, payOrder } from "@/lib/api/order";
import { getCustomer } from "@/utils/session";
import { useRouter } from "expo-router";
import { useNavigation} from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function UnpaidOrderScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerId, setCustomerId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const titleText= "Unpaid Order";
  

const router = useRouter();
const navigation = useNavigation();
 

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: titleText as string,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: '#FFF9EB',
      },
      headerTitleStyle: {
        color: '#C1553B',
        fontFamily: 'sans-serif-condensed',
      },
      headerLeft: () => (
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center', marginLeft: -2}}
          >
            {/*<FontAwesome name="arrow-left" size={20} color="#C1553B"/>*/}
            <Feather name="chevron-left" size={20} color="#C1553B" />
            <Text
                style={{
                  color: '#C1553B',
                  fontSize: 16,
                  marginLeft: 6,
                  fontFamily: 'sans-serif-condensed',
                }}
            >
              Back
            </Text>
          </TouchableOpacity>
      ),
      headerLeftContainerStyle: {
        paddingLeft: 0,
        marginLeft: -8,
      },
    });
  }, [navigation, titleText]);

  useEffect(() => {
    const fetchOrders = async () => {
      const customer = await getCustomer();
      console.log("Loaded customer:", customer);
      if (!customer?.id){
        setIsLoading(false);
        return;
      } 

      setCustomerId(customer.id);
      const data = await getUnpaidOrders(customer.id);
      console.log("Fetched unpaid orders:", data);

      if (data.orderInfo?.length > 0) {
        const o = data.orderInfo[0];
        setItems(o.items || []);

        const total = o.items.reduce((sum: number, item: any) => {
          const price = item.price || 0;
          const quantity = item.quantity || 1;
          return sum + price * quantity;
        }, 0);
        setTotalPrice(total);

        setName(o.order?.name || customer.name);
        setEmail(o.order?.email || customer.username);
        setPhone(o.order?.mobileNumber || "");
        setAddress(o.order?.address || "");
      }
       setIsLoading(false);
    };

    fetchOrders();
  }, []);

 
  //   if (!customerId) {
  //     Alert.alert("Missing customer ID");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await fetch(`http://192.168.1.189:10000/api/orders/payment/${customerId}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     if (!res.ok) {
  //       const errText = await res.text();
  //       throw new Error(errText);
  //     }

  //     Alert.alert("Success", "Payment successful!");
  //     router.replace("/(tabs)/discover");
  //   } catch (err: any) {
  //     console.error("Payment error", err);
  //     Alert.alert("Error", err.message || "Payment failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handlePay = async () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      Alert.alert(
        "Missing information",
        "Please fill in all fields before proceeding."
      );
      return;
    }
    if (!customerId) {
      Alert.alert("Missing customer ID");
      return;
    }

    setLoading(true);
    try {
      await payOrder(customerId);
      Alert.alert("Success", "Payment successful!");
      router.replace("/orders/completed");
    } catch (err: any) {
      console.error("Payment error", err);
      Alert.alert("Error", err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };
if (isLoading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (!isLoading && items.length === 0) {
    return <Text style={styles.loading}>No unpaid orders</Text>;
  }
  return (
      <>
     <StatusBar backgroundColor="#FFF9EB" barStyle="dark-content"/>
    <ScrollView style={styles.container}>
    

     

     {items.map((item, idx) => (
  <View key={idx} style={styles.itemRow}>
    <View>
      <Text style={styles.name}>{item.name || "Unnamed"}</Text>
      <Text>Quantity: {item.quantity}</Text>
    </View>
    <Text style={styles.price}>${(item.price || 0).toFixed(2)}</Text>
  </View>
))}

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handlePay}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Processing..." : "Pay Now"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF4DC",
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#B3472F",
    marginBottom: 16,
  },
  noOrders: {
    textAlign: "center",
    marginTop: 20,
    color: "gray",
  },
    loading: {
    marginTop: 100,
    textAlign: "center",
    color: "#888",
  },
 itemRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#f9f9f9",
  padding: 14,
  marginBottom: 10,
  borderRadius: 10,
  borderColor: "#eee",
  borderWidth: 1,
},
  name: {
  fontSize: 16,
  fontWeight: "bold",
  marginBottom: 4,
},
  price: {
  fontWeight: "bold",
  fontSize: 16,
  color: "#C1553B",
  textAlign: "right",
},
  form: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#ccc",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    backgroundColor: "#FFF4DC",
    borderWidth: 1,
    borderColor: "#F3BE74",
    borderRadius: 5,
    marginBottom: 12,
    padding: 10,
    fontSize: 15,
  },
  total: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#B3472F",
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#C1553B",
    padding: 14,
    borderRadius: 6,
    marginBottom: 40,
  },
  buttonDisabled: {
    backgroundColor: "#A3584B",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
