import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRouter, useNavigation, router } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import type { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import TopBar from "@/components/layout/TopBar";
import StoryList from "@/app/(tabs)/discover/story";
import ActivityList from "@/app/(tabs)/discover/activities";
import { Video, ResizeMode } from "expo-av";
import { Button } from "@react-navigation/elements";

export default function DiscoverScreen() {
  // const router = useRouter();
  // const colorScheme = useColorScheme();
  // const navigation = useNavigation();

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     title: 'Discover',
  //     headerRight: () => (
  //         <Pressable onPress={() => router.push('/(tabs)/discover/search')}>
  //           <IconSymbol
  //               name="magnifyingglass"
  //               size={24}
  //               color={Colors[colorScheme ?? 'light'].text}
  //               style={{ marginRight: 16 }}
  //           />
  //         </Pressable>
  //     ),
  //   });
  // }, [navigation, router, colorScheme]);

  return (
    <FlatList
      data={null} // không có item thực sự
      ListHeaderComponent={
        <>
          <View
            style={styles.container}
            // style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <View>
              <TopBar />
            </View>
            <View>
              <StoryList />
            </View>
            <Image
              source={require("@/assets/images/Slogan.png")}
              style={styles.slogan}
            ></Image>
            <Video
              source={{
                uri: "https://kakadutourism.com/files/videos/KT-WEB-HERO-VID-Reduced.mov",
              }}
              shouldPlay
              isMuted
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls={false}
              isLooping
              style={{ width: "100%", height: 200, marginTop: 20 }}
            />

            <View style={styles.activitiesSection}>
              <Text style={styles.header1}>Activities</Text>
              <ActivityList />
            </View>

            {/* <Text style={{ color: "white", marginBottom: 40 }}>
              Discover Page
            </Text>
            <Button onPress={() => router.replace("/discover/detail")}>
              {" "}
              Discover Detail
            </Button> */}
          </View>
        </>
      }
      renderItem={null}
      keyExtractor={() => "static"}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  activitiesSection: {
    marginTop: 30,
    marginBottom: 50,
    marginLeft: 12,
  },
  header1: {
    fontSize: 20,
    fontWeight: "500",
    color: "#C1553B",
    marginLeft: 6,
    marginBottom: 10,
  },
  slogan: {
    marginTop: 35,
    marginLeft: 55,
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    width: "70%",
    height: 30,
  },
});
