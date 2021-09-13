import { StatusBar } from "expo-status-bar"
import React, { useState, useContext } from "react"
import Logo from "../components/Logo"
import { Formik } from "formik"
import { Colors } from "../styles/Colors"
import axios from "axios"
import { saveItemInStorage } from "../helpers/storage"
import Constants from "expo-constants"

import { Octicons, Ionicons } from "@expo/vector-icons"
import {
  SignupContainer,
  Container,
  InnerContainer,
  Subtitle,
  StyledFormArea,
  StyledTextInput,
  StyledInputLabel,
  LeftIcon,
  RightIcon,
  StyledButton,
  ButtonText,
  MessageBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../styles/auth"

const { brand, darkLight } = Colors

import { View } from "react-native"
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper"
import { UserContext } from "../store/user"

const SignupPage = ({ navigation, authApiBaseUrl }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [error, setError] = useState("***")
  const { setUser } = useContext(UserContext)

  const signup = async (values) => {
    setError("")
    const url = `${authApiBaseUrl}auth/register`
    values.image = ""
    try {
      const { data } = await axios.post(url, values)
      setUser(data)
      saveItemInStorage(data)
    } catch (err) {
      console.log(err)
      setError(err?.response?.message || err.message)
    }
  }
  return (
    <KeyboardAvoidingWrapper>
      <SignupContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          <Logo />

          <Subtitle>Account Signup</Subtitle>

          <Formik
            initialValues={{
              email: "",
              password: "",
              firstName: "",
              lastName: "",
            }}
            onSubmit={(values) => signup(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="First Name"
                  icon="person"
                  placeholder="John"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("firstName")}
                  onBlur={handleBlur("firstName")}
                  value={values.firstName}
                />

                <MyTextInput
                  label="Last Name"
                  icon="person"
                  placeholder="Doe"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("lastName")}
                  onBlur={handleBlur("lastName")}
                  value={values.lastName}
                />

                <MyTextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="everistus@mail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  keyboardType="email-address"
                  value={values.email}
                />

                <MyTextInput
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  isPassword
                  setHidePassword={setHidePassword}
                  hidePassword={hidePassword}
                />
                <MessageBox>{error}</MessageBox>
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>Signup</ButtonText>
                </StyledButton>
                <Line />

                <ExtraView>
                  <ExtraText>Already have an accoun?</ExtraText>
                  <TextLink onPress={() => navigation.navigate("Login")}>
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </SignupContainer>
    </KeyboardAvoidingWrapper>
  )
}

const MyTextInput = ({
  label,
  icon,
  hidePassword,
  setHidePassword,
  isPassword,
  ...props
}) => {
  return (
    <View>
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

SignupPage.defaultProps = {
  authApiBaseUrl: Constants.manifest.extra.authApiBaseUrl,
}
export default SignupPage
