import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Feed from ".";
import Profile from "./profile";
import { useTheme } from "../../contexts/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

const Tab = createMaterialTopTabNavigator();

function CustomTabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  label: string;
}) {
  const { name, color, label } = props;
  return (
    <View style={styles.tabBarItem}>
      <FontAwesome name={name} size={18} color={color} style={styles.icon} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: isDarkMode ? "#fff" : "gray",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#333" : "#fff",
        },
        tabBarIndicatorStyle: {
          backgroundColor: "tomato",
        },
      }}
    >
      <Tab.Screen
        name="feeds"
        component={Feed}
        options={{
          tabBarLabel: ({ color }) => (
            <CustomTabBarIcon name="list" color={color} label="Feeds" />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: ({ color }) => (
            <CustomTabBarIcon name="user" color={color} label="Profile" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
