import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {useRouter} from "expo-router";


export default function TopBar() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const toggleSearch = () => {
    setIsSearching((prev) => !prev);
  };
  return (
      <View style={styles.container}>
        <View style={styles.logoText}>
          <Text style={styles.logo1}>KAKADU</Text>
          <Text style={styles.logo2}>NATIONAL PARK</Text>
        </View>
        <View style={styles.rightSection}>
          <View>
            {isSearching ? (
                <View style={styles.searchWrapper}>
                  <TextInput
                      style={styles.input}
                      value={searchText}
                      onChangeText={setSearchText}
                      autoFocus
                      placeholder="Search"
                  />
                  <TouchableOpacity onPress={toggleSearch} style={styles.clearButton}>
                    <FontAwesome name="times" size={18} color="#C1553B"/>
                  </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.iconButton} onPress={toggleSearch}>
                  <FontAwesome name="search" size={24} color="#C1553B"/>
                </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
              style={styles.iconButton}
              onPress={() => router.push("/(tabs)/shopping/cart")}
          >
            <FontAwesome name="shopping-cart" size={24} color="#C1553B"/>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF9EB",
    flexDirection: "row",
    width: "100%",
    height: 72,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoText: {
    alignItems: "center",
  },
  logo1: {
    color: "#0C5247",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 2,

    fontFamily: "sans-serif-condensed",
  },
  logo2: {
    color: "#C1553B",
    fontSize: 11,
    fontFamily: "sans-serif-condensed",
    letterSpacing: 1.5,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    marginLeft: 16,
  },
  input: {
    backgroundColor: "#FFF9EB",
    borderWidth: 0.4,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 11,
    fontSize: 16,
    width: 150,
  },
  searchWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    padding: 4,
  },
});
