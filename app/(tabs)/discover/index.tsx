import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Image,
  StyleSheet,
  FlatList, StatusBar,
} from "react-native";
import {useRouter, useNavigation, router} from "expo-router";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {Colors} from "@/constants/Colors";
import {useColorScheme} from "@/hooks/useColorScheme";
import type {NativeStackNavigationOptions} from "@react-navigation/native-stack";
import TopBar from "@/components/layout/TopBar";
import StoryList from "@/app/(tabs)/discover/story";
import ActivityList from "@/app/(tabs)/discover/activities";
import {Video, ResizeMode} from "expo-av";
import {Button} from "@react-navigation/elements";
import {SafeAreaView} from 'react-native-safe-area-context';

export default function DiscoverScreen() {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
      <SafeAreaView style={{ backgroundColor: '#FFF9EB', flex: 1 }}>
        <StatusBar backgroundColor="#FFF9EB" barStyle="dark-content" />
        <FlatList
            data={null} // không có item thực sự
            ListHeaderComponent={
              <View style={styles.container}>
                <TopBar />
                <StoryList />
                <Image
                    source={require("@/assets/images/Slogan.png")}
                    style={styles.slogan}
                />
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
              </View>
            }
            renderItem={null}
            keyExtractor={() => "static"}
        />
      </SafeAreaView>
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
