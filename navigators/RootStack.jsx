import * as React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import LoginPage from "../screens/LoginPage"
import SignupPage from "../screens/SignupPage"
import DashboardPage from "../screens/Dashboard"
import { Colors } from "../styles/Colors"
import { UserContext } from "../store/user"
import { useContext } from "react/cjs/react.development"

const Stack = createNativeStackNavigator()

const RootStack = () => {
  const { user } = useContext(UserContext)

  console.log(user, "user")
  return (
    <NavigationContainer>
      <Stack.Navigator
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
          headerTintColor: Colors.tertiary,
          headerTitle: "",
          headerLeftContainerStyle: {
            paddingLeft: 20,
          },
        }}
        initialRouteName="Login"
      >
        {!user && (
          <>
            <Stack.Screen
              name="Login"
              component={LoginPage}
              options={{ headerShadowVisible: false }}
            />
            <Stack.Screen
              name="Signup"
              component={SignupPage}
              options={{ headerShadowVisible: false }}
            />
          </>
        )}
        <Stack.Screen
          name="Dashboard"
          component={DashboardPage}
          options={{ headerShadowVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootStack
