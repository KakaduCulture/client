import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import TopBar from '@/components/layout/TopBar';

export default function CartScreen() {
  return (
    <View style={styles.wrapper}>
      <TopBar />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Your Cart</Text>

        {/* Product 1 */}
        <View style={styles.item}>
          <View style={styles.row}>
            <Text style={styles.name}>Sunset Shirt</Text>
            <Text style={styles.price}>$49.99</Text>
          </View>
          <Text style={styles.detail}>Size: M</Text>
          <Text style={styles.detail}>Quantity: 2</Text>
        </View>

        {/* Product 2 */}
        <View style={styles.item}>
          <View style={styles.row}>
            <Text style={styles.name}>Tote Bag</Text>
            <Text style={styles.price}>$29.99</Text>
          </View>
          <Text style={styles.detail}>Size: One Size</Text>
          <Text style={styles.detail}>Quantity: 1</Text>
        </View>

        {/* Total */}
        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalAmount}>$129.97</Text>

          <Pressable style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </Pressable>
        </View>
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
