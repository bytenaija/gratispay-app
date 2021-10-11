import axios from "axios"
import React, { useState, useEffect } from "react"
import PinLock from "../components/PinLock"
import Constants from "expo-constants"
import { getItemFromStorage } from "../helpers/storage"
import { Vibration } from "react-native"

const PinPage = ({ navigation, authApiBaseUrl }) => {
  const [pin, setPin] = useState("")

  useEffect(() => {
    const checkUserCred = async () => {
      const userCred = await getItemFromStorage("user")
      if (!userCred) {
        navigation.navigate("Login")
      }
    }
    checkUserCred()
  }, [])

  useEffect(() => {
    const checkUserPin = async () => {
      try {
        const userCred = await getItemFromStorage("user")
        if (!userCred) {
          navigation.navigate("Login")
        }
        const result = await axios.post(
          `${authApiBaseUrl}auth/pin`,
          { pin, userId: userCred.id },
          {
            headers: {
              Authorization: `Bearer ${userCred.access_token}`,
            },
          }
        )
        setPin("")

        navigation.navigate("Dashboard")
      } catch (err) {
        console.log(err)
        Vibration.vibrate()
        setPin("")
      }
    }
    if (pin.length >= 4) {
      void checkUserPin()
    }
  }, [pin])
  const handlePinChange = (number) => {
    setPin((pin) => `${pin}${number}`)
  }

  const clear = () => {
    setPin("")
  }

  return (
    <PinLock
      setValue={handlePinChange}
      value={pin}
      title="Enter your Pin"
      clear={clear}
    />
  )
}

PinPage.defaultProps = {
  authApiBaseUrl: Constants.manifest.extra.authApiBaseUrl,
}

export default PinPage
