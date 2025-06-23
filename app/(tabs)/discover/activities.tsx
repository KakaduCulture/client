import { FlatList, View, Text, Image, StyleSheet, Dimensions, Pressable } from "react-native";
import { useRouter } from "expo-router";

const activities = [
  {
    name: "Waterfalls",
    image: "waterfall.jpg",
    description:
      "Discover the most beautiful and serene waterfalls hidden in the heart of nature. These natural wonders offer breathtaking views and peaceful sounds of flowing water.",
    headline1: "Best Waterfall Trails",
    headline2: "Tips for Waterfall Photography",
  },
  {
    name: "Birdwatching",
    image: "birdwatching.jpg",
    description:
      "Explore the fascinating world of birds through birdwatching. Whether you're a beginner or a seasoned birder, there are countless species waiting to be discovered.",
    headline1: "Birds to Watch in Your Area",
    headline2: "Essential Gear for Birdwatchers",
  },
  {
    name: "Swimming",
    image: "swimming.webp",
    description:
      "Enjoy a refreshing swim in natural pools, lakes, or beach shores. Swimming is not only fun but also a great way to stay active while embracing the outdoors.",
    headline1: "Top Swimming Spots",
    headline2: "Safety Tips for Wild Swimming",
  },
  {
    name: "Seasonal Activities",
    image: "season.jpg",
    description:
      "Embrace the beauty of each season with unique outdoor activities. From summer hiking to winter snowshoeing, there's always something exciting to do year-round.",
    headline1: "What to Do Each Season",
    headline2: "Packing Tips for Outdoor Trips",
  },
];

const imageMap = {
  "waterfall.jpg": require("@/assets/images/waterfall.jpg"),
  "birdwatching.jpg": require("@/assets/images/birdwatching.jpg"),
  "swimming.webp": require("@/assets/images/swimming.webp"),
  "season.jpg": require("@/assets/images/season.jpg"),
};

const screenWidth = Dimensions.get("window").width;
const itemMargin = 12;
const itemWidth = (screenWidth - itemMargin * 3) / 2;

export default function ActivityList() {
  const router = useRouter();

  return (
    <FlatList
      nestedScrollEnabled={true}
      data={activities}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <Pressable
          style={[styles.item, { width: itemWidth }]}
          onPress={() =>
            router.push({
              pathname: "/(tabs)/discover/detail",
              params: {
                name: item.name,
                image: item.image,
                description: item.description,
                headline1: item.headline1,
                headline2: item.headline2,
              },
            })
          }
        >
          <Image source={imageMap[item.image]} style={styles.image} />
          <Text style={styles.title}>{item.name}</Text>
        </Pressable>
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
    textAlign: "center",
    color: "#0C5247",
  },
});
