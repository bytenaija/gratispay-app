import styled from "styled-components"
import { View } from "react-native"

import { Colors } from "./Colors"

const { primary, secondary, tertiary, darkLight, brand, green, red, main } =
  Colors

export const InnerContainer = styled(View).attrs((props) => ({ ...props }))`
  background-color: ${(props) =>   (props.backgroundColor ? props.backgroundColor : primary)};
  width: 100%;
  align-items: ${(props) => (props.alignment ? props.alignment : "center")};
  shadowOpacity: 1;
  shadowColor: #ff0000;
  shadowRadius: 4px;
  border-color: ${darkLight};
  border-width: 1px;
  color: ${(props) => (props.color ? props.color : darkLight)};
`

export const StyledText = styled.Text.attrs((props) => {
  return {
    ...props,
  }
})`
  font-size: 24px;
  text-align: ${(props) => (props.textAlign ? props.textAlign : "center")};
  color: ${(props) => {
    return props.color ? props.color : tertiary
  }};
`
