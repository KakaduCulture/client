import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';

const mockCartItems = [
  { id: '1', name: 'iPhone 15 Pro', quantity: 1, price: 1699 },
  { id: '2', name: 'AirPods Pro', quantity: 2, price: 399 },
];

export default function CartScreen() {
  const total = mockCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout Success', 'Your order has been placed!');
    // 你也可以在这里清空购物车、导航等
  };

  if (mockCartItems.length === 0) {
    return (
        <View style={styles.center}>
          <Text style={styles.empty}>🛒 Your cart is empty.</Text>
        </View>
    );
  }

  return (
      <View style={styles.container}>
        <FlatList
            data={mockCartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text>{item.quantity} × {item.name}</Text>
                  <Text>${item.price * item.quantity}</Text>
                </View>
            )}
            ListFooterComponent={
              <View style={styles.footer}>
                <Text style={styles.total}>Total: ${total}</Text>
                <Button title="Checkout" onPress={handleCheckout} />
              </View>
            }
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { fontSize: 18, color: '#888' },
  item: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  total: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
});