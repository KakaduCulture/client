import TopBar from '@/components/layout/TopBar';
import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function ProductDetailScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
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

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: 'white' },
      ]}
    >
      <TopBar />
      <View style={styles.imagePlaceholder} />
      

      <Text style={styles.productName}>Sunset Shirt</Text>
      <Text style={styles.productPrice}>$49.99</Text>

      <Text style={styles.productDescription}>
        This vibrant Sunset Shirt is made from 100% organic cotton. It's breathable,
        lightweight, and perfect for sunny days or layered for cooler evenings.
      </Text>

      <Pressable style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Add to Cart</Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 80,
  },
  imagePlaceholder: {
    height: 250,
    backgroundColor: '#ccc',
    borderRadius: 12,
    marginBottom: 16,
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    color: '#cc3300',
    marginBottom: 12,
  },
  productDescription: {
    fontSize: 14,
    color: '#444',
    marginBottom: 24,
  },
  buyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
