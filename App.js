import React, { useState } from "react"
import AppLoading from "expo-app-loading"

import RootStack from "./navigators/RootStack"
import UserContextProvider from "./store/user"
import WalletContextProvider from "./store/wallet"
import {
  getItemFromStorage,
  saveItemInStorage,

} from "./helpers/storage"
import { getUserWallets } from "./functions/wallets"
import { checkIfPinSet } from "./functions/auth"
import GiveawayContextProvider from "./store/giveaway"
export default function App() {

  const [appIsReady, setAppIsReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState(null)
  const [wallet, setWallet] = useState({})
  const [giveaways, setGiveaway] = useState([])
  const checkIsUserExists = async () => {
    const userCred = await getItemFromStorage("user")
    console.log(userCred)
    const pinSet = await getItemFromStorage("pinSet")
    if (userCred) {
      userCred.pinSet = pinSet
      if (!pinSet) {
        const userPinSet = await checkIfPinSet(userCred.access_token)
        await saveItemInStorage("pinSet", userPinSet)
        console.log(userPinSet, "pinset")
        userCred.pinSet = userPinSet
      }
    }
    setStoredCredentials(userCred)
    if (userCred) {
      await getUserWallets(userCred, setWallet)
    }
  }




  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={checkIsUserExists}
        onFinish={() => setAppIsReady(true)}
        onError={(e) => console.log(e)}
      />
    )
  }
  return (
    <UserContextProvider
      setUser={setStoredCredentials}
      user={storedCredentials}
    >
      <WalletContextProvider setWallet={setWallet} wallet={wallet}>
        <GiveawayContextProvider setGiveaway={setGiveaway} giveaways={giveaways}>
        <RootStack />
        </GiveawayContextProvider>
      </WalletContextProvider>
    </UserContextProvider>
  )
}
