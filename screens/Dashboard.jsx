import { StyleSheet, Text, View, ScrollView } from "react-native"
import React, { useEffect } from "react"
import { WalletContext } from "../store/wallet"


import MainLayout from "../layouts/main-layout"
import { useContext } from "react"
import { UserContext } from "../store/user"

import WalletDisplay from "../components/WalletDisplay"

import ActionsButton from "../components/ActionsButton"
import { getUserWallets } from "../functions/wallets"
import GiveAwayWidget from "../components/GiveawayWidget"
import { getUserGiveAway, setAccepting,setClosed } from "../functions/giveaway"
import { GiveawayContext } from "../store/giveaway"

const Dashboard = ({ navigation }) => {
  const { wallet, setWallet } = useContext(WalletContext)
  const { giveaways, setGiveaway } = useContext(GiveawayContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    if (!wallet && user) {
      getUserWallets(user.access_token, setWallet)
    }

    getUserGiveAway(user.access_token, setGiveaway)
  }, [user, wallet])

  const handleAccepting = async (id) => {
    setAccepting(user.access_token, id, setGiveaway)
  }

   const handleClose = async (id) => {
    setClosed(user.access_token, id, setGiveaway)
  }
  return (
    <MainLayout navigation={navigation}>
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <View >
          <Text
            style={{
              color: "#000000",
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Welcome {user?.firstName}
          </Text>
        </View>
        <View >
          <WalletDisplay />
        </View>
        <View >
          <ActionsButton navigation={navigation}/>
        </View>

          <View >
          <GiveAwayWidget navigation={navigation} giveAway={giveaways} handleAccepting={handleAccepting} handleClose={handleClose}/>
        </View>
      </ScrollView>
    </MainLayout>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  walletBalance: {},
})
