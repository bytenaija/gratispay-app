import { StatusBar } from "expo-status-bar"
import React, { useState, useContext, useEffect } from "react"
import Logo from "../components/Logo"
import { Formik } from "formik"
import { Colors } from "../styles/Colors"
import axios from "axios"
import Constants from "expo-constants"
import * as Google from "expo-google-app-auth"

import { Octicons, Ionicons, Fontisto } from "@expo/vector-icons"
import {
  Container,
  InnerContainer,
  Subtitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  MessageBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../styles/auth"

const { darkLight, primary } = Colors

import { View } from "react-native"
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper"
import { UserContext } from "../store/user"
import { getItemFromStorage, saveItemInStorage } from "../helpers/storage"
import { TextInput } from "../components/TextInput"

const LoginPage = ({ navigation, authApiBaseUrl }) => {
  const [hidePassword, setHidePassword] = useState(true)
  const [error, setError] = useState("***")
  const { user, setUser } = useContext(UserContext)
  useEffect(() => {
    const checkUserSetPin = async () => {
      const pinSet = await getItemFromStorage("pinSet")
      if (user) {
        if (pinSet) {
          navigation.navigate("EnterPinScreen")
        } else {
          navigation.navigate("SetPinScreen")
        }
      }
    }

    checkUserSetPin()
  }, [user])
  const login = async (values) => {
    setError("")
    const url = `${authApiBaseUrl}auth/login`
    try {
      const response = await axios.post(url, values)
      const { data } = response
      saveItemInStorage("user", data)
      setUser(data)
    } catch (err) {
      setError("Invalid Credentials ")
    }
  }

  const googleLogin = async () => {
    const config = {
      androidClientId:
        "703059919975-nfhl33f395dnm3sqa4k61io7kul300or.apps.googleusercontent.com",
      iosClientId:
        "703059919975-7pvf1bo83tkjhl9r3nseg86vtg3aoln3.apps.googleusercontent.com",
      scopes: ["profile", "email", "openid"],
    }

    try {
      const result = await Google.logInAsync(config)

      if (result.type === "success") {
        const { idToken, user } = result
        const url = `${authApiBaseUrl}auth/google`
        const response = await axios.post(url, { idToken, user })
        const { data } = response
        saveItemInStorage("user", data)
        setUser(data)
      }
    } catch (e) {
      console.log(e, "error")
    }
  }
  return (
    <KeyboardAvoidingWrapper>
      <Container>
        <InnerContainer>
          <StatusBar style="dark" />
          <Logo />

          <Subtitle>Account Login</Subtitle>

          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={(values) => login(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <TextInput
                  label="Email Address"
                  icon="mail"
                  placeholder="everistus@mail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  keyboardType="email-address"
                  value={values.username}
                />

                <TextInput
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
                  <ButtonText>Login</ButtonText>
                </StyledButton>
                <Line />

                <StyledButton onPress={googleLogin} google>
                  <Fontisto name="google" size={25} color={primary} />
                  <ButtonText google>Sign in with Google</ButtonText>
                </StyledButton>
                <ExtraView>
                  <ExtraText>Don't have an account already?</ExtraText>
                  <TextLink onPress={() => navigation.navigate("Signup")}>
                    <TextLinkContent>Signup</TextLinkContent>
                  </TextLink>
                </ExtraView>

                <ExtraView>
                  <TextLink>
                    <TextLinkContent>Forgot Password</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </Container>
    </KeyboardAvoidingWrapper>
  )
}

LoginPage.defaultProps = {
  authApiBaseUrl: Constants.manifest.extra.authApiBaseUrl,
}
export default LoginPage
