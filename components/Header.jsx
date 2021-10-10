import { StyleSheet, Text, View } from "react-native"
import React from "react"

const Header = ({ containerStyle, title, RightComponent, LeftComponent }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        ...containerStyle,
      }}
    >
      {LeftComponent}
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {title}
        </Text>
      </View>
      {RightComponent}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
