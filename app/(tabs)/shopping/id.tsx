import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams(); // 👈 Lấy id sản phẩm từ URL
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState('1');

  const userId = 1; // ⚠️ Thay bằng user thực nếu có hệ thống auth

  useEffect(() => {
    if (id) {
      axios
        .get(`http://10.0.0.60:10000/api/product/${id}`)
        .then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post(
        `http://10.0.0.60:10000/api/order/checkout/${userId}/product/${id}`
      );
      Alert.alert('✅ Đã thêm vào giỏ hàng');
      router.replace('/shopping/cart');
    } catch (error) {
      console.error(error);
      Alert.alert('❌ Không thể thêm vào giỏ hàng');
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>

      <Text style={styles.label}>Size</Text>
      <View style={styles.sizeRow}>
        {['S', 'M', 'L', 'XL'].map((size) => (
          <Pressable
            key={size}
            style={[
              styles.sizeButton,
              selectedSize === size && styles.selectedSize,
            ]}
            onPress={() => setSelectedSize(size)}
          >
            <Text
              style={
                selectedSize === size
                  ? styles.selectedSizeText
                  : styles.sizeText
              }
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    fontSize: 18,
    color: '#cc3300',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    fontSize: 16,
  },
  sizeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedSize: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
  },
  selectedSizeText: {
    fontSize: 14,
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: 80,
    borderRadius: 6,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
