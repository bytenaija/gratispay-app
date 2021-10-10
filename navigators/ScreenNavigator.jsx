import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"
import React from "react";

import Dashboard from "../screens/Dashboard";
import EnterGiveAwayScreen from "../screens/EnterGiveAway";
import CreateGiveawayScreen from "../screens/CreateGiveawayScreen";
const Stack = createNativeStackNavigator()
const AppStack = () => {
  return <Stack.Navigator
        screenOptions={{
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

          headerTitle: "",
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="HomeScreen"
      >
        <Stack.Screen
          name="HomeScreen"
          component={Dashboard}
          options={{ headerShadowVisible: false, headerShown: false }}
    />

      <Stack.Screen
          name="EnterGiveAway"
          component={EnterGiveAwayScreen}
          options={{ headerShadowVisible: false, headerShown: false }}
    />
     <Stack.Screen
          name="CreateGiveaway"
          component={CreateGiveawayScreen}
          options={{ headerShadowVisible: false, headerShown: false }}
        />
      </Stack.Navigator>

}



export default AppStack