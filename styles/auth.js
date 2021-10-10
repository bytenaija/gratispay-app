import styled from "styled-components"
import { View, Image, Text } from "react-native"
import Constants from "expo-constants"
import { Colors } from "./Colors"

const statusBarHeight = Constants.statusBarHeight

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors

export const Container = styled(View)`
  flex: 1;
  padding: 25px;
  padding-top: ${statusBarHeight}px;
  background-color: ${primary};
`

export const SignupContainer = styled(View)`
  flex: 1;
  padding: 25px;
  padding-top: 0;
  background-color: ${primary};
`
export const InnerContainer = styled(View)`
  flex: 1;
  width: 100%;
  align-items: center;
`

export const PageLogo = styled(Image)`
  width: 250px;
  height: 250px;
`

export const PageTitle = styled(Text)`
  font-size: 36px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
`

export const Subtitle = styled(Text).attrs((props) => ({ ...props }))`
  margin-top: 20px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};

  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${(props) => (props.color ? props.color : brand)};
`

export const StyledFormArea = styled.View`
  width: 90%;
`

export const StyledTextInput = styled.TextInput`
background-color: ${secondary}
padding: 15px 55px;
border-radius: 5px;
font-size: 16px;
height: 60px;margin-vertical: 3px;
margin-bottom: 10px;
color: ${tertiary}
`

export const StyledInputLabel = styled.Text`
  font-size: 12px;
  text-align: left;
  color: ${tertiary};
`

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${brand};
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;

  ${(props) =>
    props.google &&
    `
	background-color: ${green};
	flex-direction:  row;
	justify-content: center;
	`}
`

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
  ${(props) =>
    props.google &&
    `
	padding: 25px
	`}
`

export const MessageBox = styled.Text`
  text-align: center;
  font-size: 13px;
`

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`
export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`

export const ExtraText = styled.Text`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  color: ${tertiary};
  font-size: 15px;
`

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`
