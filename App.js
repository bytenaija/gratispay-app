import React, { useState } from "react"
import AppLoading from "expo-app-loading"

import RootStack from "./navigators/RootStack"
import UserContextProvider from "./store/user"
import { getItemFromStorage } from "./helpers/storage"
export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState(null)
  const checkIsUserExists = async () => {
    const userCred = await getItemFromStorage("user")
    setStoredCredentials(userCred)
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
      <RootStack />
    </UserContextProvider>
  )
}
