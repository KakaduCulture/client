import { router } from 'expo-router';
import React, { useState } from 'react';
import { Button } from '@react-navigation/elements';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from 'react-native';

export default function ProductDetailScreen() {
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState('1');

  const product = {
    name: 'Sunset Shirt',
    price: '$49.99',
    description: 'A lightweight and stylish shirt for summer adventures.',
    image: 'https://via.placeholder.com/400x250.png?text=Sunset+Shirt',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
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
            <Text style={selectedSize === size ? styles.selectedSizeText : styles.sizeText}>
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

              <Button onPress={() => router.replace('/shopping/cart')}> Add to cart</Button>
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
