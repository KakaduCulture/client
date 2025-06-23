import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { getUnpaidOrders } from "@/lib/api/order";
import { getCustomer } from "@/utils/session";
import OrderCard from "@/components/domain/OrderCard";

export default function UnpaidOrderScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  // const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const customer = await getCustomer();
      console.log("Loaded customer:", customer);
      if (!customer?.id) return;

      const data = await getUnpaidOrders(customer.id);
      console.log("Fetched unpaid orders:", data);

      if (data?.orderInfo?.length > 0) {
        const firstOrder = data.orderInfo[0];
        setOrders(firstOrder.items || []);

        // Total = sum of price * quantity
        const total = firstOrder.items.reduce((sum: number, item: any) => {
          const price = item.price || 0;
          const quantity = item.quantity || 1;
          return sum + price * quantity;
        }, 0);

        setTotalPrice(total);

        // Set info from order
        setName(firstOrder.order?.name || customer.name);
        setEmail(firstOrder.order?.email || customer.username);
        setPhone(firstOrder.order?.phone || "");
        setAddress(firstOrder.order?.address || "");
      }
    };

    fetchOrders();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Unpaid Order</Text>

      {orders.length === 0 && (
        <Text style={styles.noOrders}>No unpaid orders found.</Text>
      )}

      {orders.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.price}>
            ${item.price?.toFixed(2) || "0.00"}
          </Text>
          <Text>Quantity: {item.quantity}</Text>
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Pay Now</Text>
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
    marginTop: 20,
    marginBottom: 20,
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
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
