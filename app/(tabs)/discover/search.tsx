import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export default function DiscoverSearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const colorScheme = useColorScheme();

  const handleSearch = () => {
    Keyboard.dismiss();

    // 假设搜索逻辑，此处用假数据模拟
    if (query.trim()) {
      const dummy = Array.from({ length: 5 }, (_, i) => `Result for "${query}" #${i + 1}`);
      setResults(dummy);
    } else {
      setResults([]);
    }
  };

  return (
      <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <TextInput
            placeholder="Search something..."
            placeholderTextColor={Colors[colorScheme ?? 'light'].text}
            style={[styles.input, { color: Colors[colorScheme ?? 'light'].text, borderColor: Colors[colorScheme ?? 'light'].tint }]}
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
        />

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <FlatList
            data={results}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
                <View style={styles.resultItem}>
                  <Text>{item}</Text>
                </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noResultText}>No results. Try typing something.</Text>
            }
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  resultItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  noResultText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 20,
  },
});