import React from "react"
import DashboardPage from "../screens/Dashboard"
import { Octicons, Ionicons } from "@expo/vector-icons"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AppStack from "./ScreenNavigator"

const Tab = createBottomTabNavigator()

function ButtomTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = "home"
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list"
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#000000",
        tabBarInactiveTintColor: "#aaaaaa",

        headerStyle: {
          backgroundColor: "transparent",
        },
        transparentHeader: {
          position: "absolute",
          backgroundColor: "transparent",
          zIndex: 100,
          top: 0,
          left: 0,
          right: 0,
        },
        headerTintColor: "#cccccc",
        headerTitle: "",
        headerLeftContainerStyle: {
          paddingLeft: 20,
        },
      })}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={AppStack}
        options={{ headerShadowVisible: false, headerShown: false }}
      />
      <Tab.Screen
        name="Giveaway"
        component={AppStack}
        options={{ headerShadowVisible: false, headerShown: false }}
      />
    </Tab.Navigator>
  )
}

export default ButtomTab
