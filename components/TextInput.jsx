import React from "react"
import {
  LeftIcon,
  RightIcon,
  StyledInputLabel,
  StyledTextInput,
} from "../styles/auth"
import { Octicons, Ionicons } from "@expo/vector-icons"
import { View } from "react-native"
import { Colors } from "../styles/Colors"
const { brand, darkLight } = Colors

export const TextInput = ({
  label,
  icon,
  hidePassword,
  setHidePassword,
  isPassword,
  ...props
}) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  )
}
