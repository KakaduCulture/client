import TopBar from '@/components/layout/TopBar';
import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function DiscoverDetailScreen() {
  const colorScheme = useColorScheme();

  const recommended = [
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
    { id: '3', name: 'Product 3' },
    { id: '4', name: 'Product 4' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: 'white' }]}>
      <TopBar />

        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        >
        {/* Banner image placeholder */}
        <View style={styles.banner} />

        {/* Title and content */}
        <Text style={styles.articleTitle}>TITLE OF THE ARTICLE</Text>
        <Text style={styles.articleText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </Text>

        {/* Headline 1 */}
        <Text style={styles.headline}>Headline 1</Text>
        <View style={styles.row}>
          <Text style={styles.articleText}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...
          </Text>
          <View style={styles.thumbnail} />
        </View>

        {/* Headline 2 */}
        <View style={styles.row}>
          <View style={styles.thumbnail} />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.headline}>Headline 2</Text>
            <Text style={styles.articleText}>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore...
            </Text>
          </View>
        </View>

        {/* You May Like */}
        <Text style={styles.mayLike}>YOU MAY LIKE</Text>
        <FlatList
          horizontal
          data={recommended}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productCard}>
              <View style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
            </View>
          )}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
        />

        <Text style={styles.seeMore}>SEE MORE &gt;&gt;</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 200,
    backgroundColor: '#ccc',
    margin: 12,
    borderRadius: 10,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#993300',
    marginHorizontal: 12,
    marginBottom: 6,
  },
  articleText: {
    fontSize: 14,
    color: '#333',
    marginHorizontal: 12,
    marginBottom: 10,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 14,
    marginHorizontal: 12,
    marginBottom: 6,
    color: '#993300',
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    backgroundColor: '#aaa',
    borderRadius: 8,
    marginLeft: 12,
  },
  mayLike: {
    marginHorizontal: 12,
    fontWeight: 'bold',
    color: '#cc3300',
    fontSize: 14,
    marginBottom: 6,
  },
  productCard: {
    width: 100,
    marginLeft: 12,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: '#bbb',
    borderRadius: 8,
  },
  productName: {
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
  },
  seeMore: {
    textAlign: 'center',
    color: '#007AFF',
    marginVertical: 12,
    fontWeight: '500',
  },
});
