import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter(); // ✅ 在组件内声明

  return (
    <Tabs
      initialRouteName="discover"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        // tabBarStyle: Platform.select({
        //   ios: {
        //     position: 'absolute',
        //     backgroundColor: '#F3BD73',
        //   },
        //   android: {
        //     backgroundColor: '#F3BD73',
        //   },
        // }),

        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#F3BD73",
        },
        tabBarLabelStyle: {
          color: "#C1553B",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            // <IconSymbol size={28} name="sparkles" color={color} />
            <FontAwesome5 name="map-marked-alt" size={24} color="#C1553B" />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: "Store",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            // <FontAwesome5 name="store" size={24} color="#C1553B" />
            <Ionicons name="storefront" size={26} color="#C1553B" />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: "Me",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user" size={24} color="#C1553B" />
          ),
        }}
      />
    </Tabs>
  );
}
