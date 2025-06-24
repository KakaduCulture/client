import React, {useEffect, useState} from "react";
import {View, Text, ScrollView, StyleSheet, TextInput, Button, Alert, StatusBar,TouchableOpacity} from "react-native";
import {getCustomer, saveCustomer} from "@/utils/session";
import Constants from 'expo-constants';
import { useNavigation} from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

export default function UnpaidScreen() {
  const [order, setOrder] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
 const titleText= "Profile";
 const navigation = useNavigation();

  const API_BASE_URL =
      Constants.expoConfig?.extra?.API_BASE_URL ??
      Constants.manifest2?.extra?.API_BASE_URL;

      React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: "center",
      title: titleText as string,
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
    (async () => {
      const customer = await getCustomer();
      if (customer?.id) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/orders/paid/${customer?.id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
          });

          console.log("response:", response);

          const data = await response.json();

          if (!response.ok) {
            Alert.alert('Get Order Failed', data.message || 'Unknown error');
            return;
          }

          const {orderInfo, order, items} = data;
          setOrder(orderInfo);
          setItems(items);

          if (orderInfo[0]) {
            const order = orderInfo[0].order;
            setName(order.name ?? '');
            setEmail(order.email ?? '');
            setPhone(order.mobileNumber ?? '');
            setAddress(order.address ?? '');
          }
        } catch (error) {
          Alert.alert('Error', 'Unable to connect to server');
          console.error(error);
        }
      }
    })();
  }, []);

  if (order.length === 0) {
    return <Text style={styles.loading}>No completed orders</Text>;
  }

  return (
     <>
         <StatusBar backgroundColor="#FFF9EB" barStyle="dark-content"/>
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Completed Orders</Text>

        {order.map((orderGroup: any) => (
            <View key={orderGroup.order.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.orderId}>Order ID: {orderGroup.order.id}</Text>
                {/* <Button title="Pay Now" onPress={() => console.log(`Pay for order ${orderGroup.order.id}`)} /> */}
              </View>
              <View style={styles.itemList}>
                {orderGroup.items.map((item: any) => (
                    <View key={item.id} style={styles.itemRow}>
                      <Text style={styles.itemText}>{item.name}</Text>
                      <Text style={styles.itemText}>Qty: {item.quantity} @ ${item.price}</Text>
                    </View>
                ))}
              </View>
            </View>
        ))}
      </ScrollView>
          </>
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
  orderItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },
  orderText: {
    fontSize: 14,
    marginBottom: 4,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemList: {
    paddingLeft: 8,
  },
  itemRow: {
    marginBottom: 8,
  },
  itemText: {
    fontSize: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
});