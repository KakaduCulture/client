import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { getUnpaidOrders } from "@/lib/api/order";
import { getCustomer } from "@/utils/session";
import { useRouter } from "expo-router";

export default function UnpaidOrderScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [customerId, setCustomerId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const customer = await getCustomer();
      console.log("Loaded customer:", customer);
      if (!customer?.id) return;

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
        setPhone(o.order?.phone || "");
        setAddress(o.order?.address || "");
      }
    };

    fetchOrders();
  }, []);

  const handlePay = async () => {
    if (!customerId) {
      Alert.alert("Missing customer ID");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://192.168.202.75:10000/api/order/payment/${customerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      Alert.alert("Success", "Payment successful!");
      router.replace("/(tabs)/discover");
    } catch (err: any) {
      console.error("Payment error", err);
      Alert.alert("Error", err.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Unpaid Order</Text>

      {items.length === 0 && (
        <Text style={styles.noOrders}>No unpaid orders found.</Text>
      )}

      {items.map((item, idx) => (
        <View key={idx} style={styles.item}>
          <Text style={styles.price}>${(item.price || 0).toFixed(2)}</Text>
          <Text>Quantity: {item.quantity}</Text>
        </View>
      ))}

      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} />
        <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
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
  item: {
    backgroundColor: "#f9f9f9",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 1,
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#C1553B",
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
