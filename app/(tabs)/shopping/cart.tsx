import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useFocusEffect, useNavigation} from "expo-router";
import Feather from "@expo/vector-icons/Feather";

type CartItem = {
  product_id: number;
  user_id: number;
  name_product: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigation = useNavigation();
  const userId = 1; // Replace with actual logged-in user ID

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get(`http://10.0.0.60:10000/api/cart/${userId}`);
      const rawItems: Omit<CartItem, 'quantity'>[] = res.data || [];

      const mergedMap: { [key: number]: CartItem } = {};

      for (const item of rawItems) {
        if (mergedMap[item.product_id]) {
          mergedMap[item.product_id].quantity += 1;
        } else {
          mergedMap[item.product_id] = {
            ...item,
            quantity: 1,
          };
        }
      }

      const mergedItems = Object.values(mergedMap);
      setCartItems(mergedItems);

      const total = mergedItems.reduce(
          (
              sum,
              item
          ) => sum + item.price * item.quantity,
          0
      );
      setTotalAmount(total);
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Failed to load cart');
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Shopping Cart',
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
  }, [navigation]);

  useFocusEffect(
      React.useCallback(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {display: 'none'},
        });

        return () => {
          navigation.getParent()?.setOptions({
            tabBarStyle: {display: 'flex'},
          });
        };
      }, [navigation])
  );

  return (
      <View style={styles.wrapper}>
        {/*<TopBar />*/}

        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Your Shopping Cart</Text>

          {cartItems.length === 0 ? (
              <Text style={styles.empty}>🛒 Your cart is currently empty</Text>
          ) : (
              cartItems.map((item) => (
                  <View key={item.product_id} style={styles.item}>
                    <View style={styles.row}>
                      <Text style={styles.name}>{item.name_product}</Text>
                      <Text style={styles.price}>${item.price}</Text>
                    </View>
                    <Text style={styles.detail}>Quantity: {item.quantity}</Text>
                    <Text style={styles.detail}>Product ID: {item.product_id}</Text>
                  </View>
              ))
          )}

          {cartItems.length > 0 && (
              <View style={styles.totalBox}>
                <Text style={styles.totalLabel}>Total:</Text>
                <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>

                <Pressable style={styles.checkoutButton} onPress={() => console.log('Pending')}>
                  <Text style={styles.checkoutText}>Checkout</Text>
                </Pressable>
              </View>
          )}
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  empty: {
    fontSize: 16,
    color: '#555',
  },
  item: {
    marginBottom: 20,
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cc3300',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  totalBox: {
    marginTop: 32,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 22,
    fontWeight: '700',
    marginVertical: 12,
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
