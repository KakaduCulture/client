import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useColorScheme} from '@/hooks/useColorScheme';
import {useFocusEffect, useLocalSearchParams, useNavigation} from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';

const imageMap = {
  "waterfall.jpg": require("@/assets/images/waterfall.jpg"),
  "birdwatching.jpg": require("@/assets/images/birdwatching.jpg"),
  "swimming.webp": require("@/assets/images/swimming.webp"),
  "season.jpg": require("@/assets/images/season.jpg"),
  "birdwatching2.jpg": require("@/assets/images/birdwatching2.jpg"),
  "birdwatching3.jpg": require("@/assets/images/birdwatching3.jpg"),
  "waterfall1.jpg": require("@/assets/images/waterfall1.jpg"),
  "waterfall2.jpg": require("@/assets/images/waterfall2.jpg"),
};

export default function DiscoverDetailScreen() {
  const colorScheme = useColorScheme();
  const {name, image, description, headline1, headline2} = useLocalSearchParams();
  const navigation = useNavigation();

  const recommended = [
    {id: '1', name: 'Product 1'},
    {id: '2', name: 'Product 2'},
    {id: '3', name: 'Product 3'},
    {id: '4', name: 'Product 4'},
  ];

  let img1 = image;
  let img2 = image;

  if (image === "birdwatching.jpg") {
    img1 = "birdwatching2.jpg";
    img2 = "birdwatching3.jpg";
  } else if (image === "waterfall.jpg") {
    img1 = "waterfall1.jpg";
    img2 = "waterfall2.jpg";
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: name as string,
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: '#FFF9EB',
      },
      headerTitleStyle: {
        color: '#C1553B',
        fontFamily: 'sans-serif-condensed',
      },
      headerLeft: () => (
          <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{flexDirection: 'row', alignItems: 'center', marginLeft: -2}}
          >
            {/*<FontAwesome name="arrow-left" size={20} color="#C1553B"/>*/}
            <Feather name="chevron-left" size={20} color="#C1553B" />
            <Text
                style={{
                  color: '#C1553B',
                  fontSize: 16,
                  marginLeft: 6,
                  fontFamily: 'sans-serif-condensed',
                }}
            >
              Back
            </Text>
          </TouchableOpacity>
      ),
      headerLeftContainerStyle: {
        paddingLeft: 0,
        marginLeft: -8,
      },
    });
  }, [navigation, name]);

  useFocusEffect(
      React.useCallback(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {display: 'none'},
        });

        return () => {
          navigation.getParent()?.setOptions({
            tabBarStyle: {display: 'flex'},
          });
        };
      }, [navigation])
  );

  return (
      <>
        <StatusBar backgroundColor="#FFF9EB" barStyle="dark-content"/>
        <View style={[styles.container, {backgroundColor: '#FFF9EB'}]}>
          <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 120}}
          >
            <Image source={imageMap[image]} style={styles.banner}/>

            <Text style={styles.articleTitle}>{name}</Text>
            <Text style={styles.articleText}>{description}</Text>

            <Text style={styles.headline}>{headline1}</Text>
            <View style={styles.row}>
              <Text style={[styles.articleText, {flex: 1}]}>
                Explore scenic locations and discover unique spots that match your activity. Whether it’s the vibrant
                wildlife or tranquil surroundings, this section highlights the best experiences.
              </Text>
              <Image source={imageMap[img1]} style={styles.thumbnail}/>
            </View>

            <Text style={styles.headline}>{headline2}</Text>
            <View style={styles.row}>
              <Image source={imageMap[img2]} style={styles.thumbnail}/>
              <Text style={[styles.articleText, {flex: 1, marginLeft: 12}]}>
                Plan your next outing with expert tips and guides to ensure a safe and enjoyable journey. From packing
                essentials to weather insights, we’ve got you covered.
              </Text>
            </View>

            <Text style={styles.mayLike}>YOU MAY LIKE</Text>
            <FlatList
                horizontal
                data={recommended}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => (
                    <View style={styles.productCard}>
                      <View style={styles.productImage}/>
                      <Text style={styles.productName}>{item.name}</Text>
                    </View>
                )}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
            />

            <Text style={styles.seeMore}>SEE MORE &gt;&gt;</Text>
          </ScrollView>
        </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: 240,
    width: '100%',
    backgroundColor: '#ccc',
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 10,
    alignSelf: 'center',
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#993300',
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 28,
    textAlign: 'left',
  },
  articleText: {
    fontSize: 15,
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 16,
    lineHeight: 24,
    textAlign: 'justify',
    flexShrink: 1,
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    color: '#993300',
    lineHeight: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 12,
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 100,
    backgroundColor: '#aaa',
    borderRadius: 8,
    marginLeft: 12,
    flexShrink: 0,
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
    marginVertical: 16,
    fontWeight: '500',
  },
});