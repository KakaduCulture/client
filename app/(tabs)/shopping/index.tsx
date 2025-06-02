import React from 'react';
import TopBar from '@/components/layout/TopBar';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export default function ShoppingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Shopping',
      headerRight: () => (
        <Pressable onPress={() => router.push('/(tabs)/shopping/cart')}>
          <IconSymbol
            name="bag.fill"
            size={24}
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 16 }}
          />
        </Pressable>
      ),
    });
  }, [navigation, router, colorScheme]);

  return (
    <View>
    <TopBar />
    <FlatList
      contentContainerStyle={{ padding: 12, paddingBottom: 180, backgroundColor: "white", }}
      data={[
        { id: '1', name: 'Sunset Shirt', price: '$49.99' },
        { id: '2', name: 'Outback Hat', price: '$35.00' },
        { id: '3', name: 'Tote Bag', price: '$29.99' },
        { id: '4', name: 'Socks', price: '$9.99' },
      ]}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <Pressable
          style={styles.productCard}
          onPress={() => router.replace('/shopping/id')}>
        
          <View style={styles.imagePlaceholder} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
        </Pressable>
      )}
    />
    </View>
  );
}
const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imagePlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#ccc',
    borderRadius: 6,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 13,
    color: '#cc3300',
  },
});
