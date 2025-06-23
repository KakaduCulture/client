import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, Button } from "react-native";
import { getUnpaidOrders } from "@/lib/api/order";
import { getCustomer } from "@/utils/session";
import OrderCard from "@/components/domain/OrderCard"; // bạn cần tạo sẵn

export default function UnpaidScreen() {
  const [orders, setOrders] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    (async () => {
      const customer = await getCustomer();
      if (customer?.id) {
        const unpaid = await getUnpaidOrders(customer.id);
        setOrders(unpaid);
        if (unpaid[0]) {
          setName(unpaid[0].name);
          setEmail(unpaid[0].email);
          setPhone(unpaid[0].phone || "");
          setAddress(unpaid[0].address || "");
        }
      }
    })();
  }, []);

  if (orders.length === 0) {
    return <Text style={styles.loading}>No unpaid orders</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Unpaid Order</Text>
      {orders[0]?.items?.map((item: any) => (
        <OrderCard key={item.id} item={item} />
      ))}

      <View style={styles.form}>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Name" />
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" />
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="Phone" />
        <TextInput style={styles.input} value={address} onChangeText={setAddress} placeholder="Address" />
      </View>

      <Button title="Pay Now" onPress={() => console.log("Pay order...")} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  form: {
    marginVertical: 24,
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
  },
  loading: {
    marginTop: 100,
    textAlign: "center",
    color: "#888",
  },
});
