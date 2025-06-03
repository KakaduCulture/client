import { FlatList, View, Text, Image, StyleSheet, Dimensions } from "react-native";

const activities = [
    { name: "Waterfalls", image: require("@/assets/images/waterfall.jpg") },
    {
      name: "Birdwatching",
      image: require("@/assets/images/birdwatching.jpg"),
    },
    { name: "Swimming", image: require("@/assets/images/swimming.webp") },
    {
      name: "Seasonal Activities",
      image: require("@/assets/images/season.jpg"),
    },
  ];

const screenWidth = Dimensions.get("window").width;
const itemMargin = 12;
const itemWidth = (screenWidth - itemMargin * 3) / 2; // 2 items, 3 margins (left, middle, right)

export default function ActivityList() {
  return (
    <FlatList
    nestedScrollEnabled={true}
      data={activities}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={[styles.item, { width: itemWidth }]}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.title}>{item.name}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: itemMargin,
    paddingTop: 16,
  },
  item: {
    marginBottom: 30,
    marginRight: itemMargin,
  },
  image: {
    width: "100%",
    height: 110,
    borderRadius: 12,
  },
  title: {
    marginTop: 8,
    fontSize: 13,
    textAlign: 'center',
    color: "#0C5247"

  },
});
