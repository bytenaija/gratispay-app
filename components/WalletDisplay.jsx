import React, { useContext } from "react"
import { WalletContext } from "../store/wallet"

import {  StyledText } from "../styles/dashboard"
import numbro from "numbro"
import Colors from "../styles/Colors"
const {  primary } = Colors
import {StyleSheet, View, Text} from 'react-native'



const WalletDisplay = () => {
  const { wallet } = useContext(WalletContext)

  return (
    <>
      <View
        style={styles.walletContainer}
      >
        {wallet?.address && (
          <>
            <Text style={styles.balanceTitle} >
               Balance
            </Text>
            <StyledText color={primary} >
              NGN
              {wallet?.balance
                ? numbro(wallet?.balance).format({
                    thousandSeparated: true,
                    mantissa: 2,
                  })
                : 0}
            </StyledText>
          </>
        )}
        {!wallet?.address && (
          <StyledText color={primary}>You have no wallet</StyledText>
        )}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  walletContainer: {
    backgroundColor: "#000000",
    height: 150,
    paddingHorizontal: 20,
    justifyContent: "center",
    borderRadius: 10,

  },
  balanceTitle: {
    fontSize: 16,
    color: "#eeeeee",
    textAlign: "center",
    marginBottom: 10
  }
})

export default WalletDisplay
