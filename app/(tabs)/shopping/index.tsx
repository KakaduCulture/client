import React, { useEffect, useState } from "react";
import TopBar from "@/components/layout/TopBar";
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
} from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";

interface IProductData {
  id: string;
  name: string;
  price: number;
  stock: number;
  unit: string;
  imageUrl: string;
  description: string;
}

export default function ShoppingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [products, setProducts] = useState<IProductData[]>([]);
  const API_BASE_URL =
    Constants.expoConfig?.extra?.API_BASE_URL ??
    Constants.manifest2?.extra?.API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products`)
      // fetch('http://10.0.0.60:10000/api/product')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    // <>
    //   <StatusBar backgroundColor="#FFF9EB" barStyle="dark-content" />
    //   <SafeAreaView style={{ backgroundColor: '#FFF9EB', flex: 1 }}>
    //     <View>
    //       <TopBar/>
    //       <FlatList
    //           contentContainerStyle={styles.container}
    //           data={products}
    //           keyExtractor={(item) => item.id.toString()}
    //           numColumns={2}
    //           renderItem={({item}) => (
    //               <Pressable
    //                   style={({pressed}) => [
    //                     styles.productCard,
    //                     pressed && {transform: [{scale: 0.98}], opacity: 0.85},
    //                   ]}
    //                   onPress={() =>
    //                       router.push({
    //                         pathname: '/shopping/[id]/detail',
    //                         params: {id: String(item.id)},
    //                       })
    //                   }
    //               >
    //                 <Image source={{uri: item.imageUrl}} style={styles.productImage}/>
    //                 <Text style={styles.productName} numberOfLines={2}>
    //                   {item.name}
    //                 </Text>
    //                 <Text style={styles.productPrice}>${item.price.toLocaleString()}</Text>
    //               </Pressable>
    //           )}
    //       />
    //     </View>
    //   </SafeAreaView>
    // </>
    <SafeAreaView style={{ backgroundColor: "#FFF9EB", flex: 1 }}>
      <TopBar />
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={styles.container}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.productCard,
                pressed && { transform: [{ scale: 0.98 }], opacity: 0.85 },
              ]}
              onPress={() =>
                router.push({
                  pathname: "/shopping/[id]/detail",
                  params: { id: String(item.id) },
                })
              }
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.productImage}
              />
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.productPrice}>
                ${item.price.toLocaleString()}
              </Text>
            </Pressable>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 400,
    backgroundColor: "#f2f2f2",
  },
  productCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 8,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#d32f2f",
  },
});
