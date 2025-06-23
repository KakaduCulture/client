import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useNavigation, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import TopBar from '@/components/layout/TopBar';

export default function ProductDetailScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const userId = 1;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://10.0.0.60:10000/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const cartData = {
        user_id: userId,
        product_id: product.id,
        name_product: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      };

      const response = await fetch('http://10.0.0.60:10000/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartData),
      });

      if (response.ok) {
        Alert.alert('✅ Product added to cart');
        router.push('/shopping/cart');
      } else {
        const error = await response.json();
        Alert.alert('❌ Failed to add to cart', error.message || 'Unknown error');
      }
    } catch (error) {
      console.error('🔴 Network error:', error);
      Alert.alert('❌ Error adding product to cart');
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: 'Product Detail',
      headerLeft: () => (
        <Pressable onPress={() => router.push('/(tabs)/shopping')}>
          <Text style={{ marginLeft: 16, color: Colors[colorScheme ?? 'light'].text }}>
            ← Back
          </Text>
        </Pressable>
      ),
    });
  }, [navigation, router, colorScheme]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TopBar />

      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />

      <View style={styles.card}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>${product.price.toLocaleString()}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productStock}>In stock: {product.stock}</Text>

        <Pressable style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>Add to Cart</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
    backgroundColor: '#f2f2f2',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 280,
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  productName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cc3300',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 15,
    color: '#444',
    marginBottom: 12,
    lineHeight: 22,
  },
  productStock: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
