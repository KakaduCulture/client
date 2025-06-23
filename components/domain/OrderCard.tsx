import {
    View,
    Text,
    StyleSheet
  } from 'react-native';
type Props = {
    item: {
      name: string;
      size?: string;
      quantity: number;
      price: number;
    };
    children?: React.ReactNode;
  };
  
  export default function OrderCard({ item, children }: Props) {
    return (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.name}>{item.name}</Text>
          {item.size && <Text style={styles.detail}>Size: {item.size}</Text>}
          <Text style={styles.detail}>Quantity: {item.quantity}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          {children}
        </View>
      </View>
    );
  }

  const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
  },
  
  cardLeft: {
    flex: 1,
  },
  
  cardRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#222",
  },
  
  detail: {
    fontSize: 14,
    color: "#555",
  },
  
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#c56c39", // màu cam Kakadu
  },
})