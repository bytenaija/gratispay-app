import { StatusBar } from "expo-status-bar"
import React, { useState, useContext } from "react"
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
const { brand, darkLight, primary } = Colors

import { View } from "react-native"
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper"

const DashboardPage = ({ navigation, authApiBaseUrl }) => {
  return (
    <KeyboardAvoidingWrapper>
      <Container>
        <TextLink>
          <TextLinkContent>Welcome to Curvoisier</TextLinkContent>
        </TextLink>
      </Container>
    </KeyboardAvoidingWrapper>
  )
}

export default DashboardPage
