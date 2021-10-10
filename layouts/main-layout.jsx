import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from "react-native"
import Header from "../components/Header"
import React, { useContext } from "react"
import { Fontisto, Ionicons } from "@expo/vector-icons"
import { UserContext } from "../store/user"
import { logout } from "../actions/auth"

const MainLayout = ({ navigation, children, back }) => {
  const { user, setUser } = useContext(UserContext)
  const avatarSource = user?.image
    ? { uri: user.image }
    : require("../assets/images/avatar.png")
  return (
    <View style={{flex: 1, }}>
      <Header
        RightComponent={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 0.5,

            }}
          >
            <TouchableOpacity onPress={() => logout(setUser, navigation)}>
              <Fontisto name="bell" size={25} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logout(setUser, navigation)}>
              <Image
                source={avatarSource}
                width={10}
                height={10}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 40,
                }}
              />
            </TouchableOpacity>

          </View>
        }
        LeftComponent={          back? (<TouchableOpacity onPress={()=> navigation.pop()}>
            <Ionicons name="ios-arrow-back" size={30} />
          </TouchableOpacity>) : (<TouchableOpacity>
            <Ionicons name="menu" size={30} />
          </TouchableOpacity>)
        }
        containerStyle={{
          height: 50,
          paddingHorizontal: 20,
          paddingTop: 10,
          marginTop: Platform.OS === 'ios'? 40: 0,
          alignItems: "center",
          backgroundColor: "#ffffff"

        }}

        />
      <View style={{ flex: 1 }}>{children}</View>
    </View>
  )
}

const styles = StyleSheet.create({})

export default MainLayout
