import axios from "axios"
import React, { useState, useEffect } from "react"
import { View, Text } from "react-native"
import PinLock from "../components/PinLock"
import Constants from "expo-constants"
import { getItemFromStorage, saveItemInStorage } from "../helpers/storage"
import { Vibration } from "react-native"
const PinPage = ({ navigation, authApiBaseUrl }) => {
  const [stage, setStage] = useState("default")
  const [pin, setPin] = useState("")
  const [confirmPin, setConfirmPin] = useState("")

  useEffect(() => {
    const setUserPin = async () => {
      try {
        const userCred = await getItemFromStorage("user")
        const result = await axios.patch(
          `${authApiBaseUrl}auth/pin`,
          { pin, userId: userCred.id },
          {
            headers: {
              Authorization: `Bearer ${userCred.access_token}`,
            },
          }
        )
        console.log(result.data)
        setPin("")
        setConfirmPin("")
        setStage("default")
        saveItemInStorage("pinSet", true)
        navigation.navigate("Dashboard")
      } catch (err) {
        console.log(err)
        Vibration.vibrate()
        setPin("")
        setConfirmPin("")
        setStage("default")
      }
    }
    if (pin.length >= 4) {
      setStage("confirm")
    }

    if (confirmPin.length >= 4) {
      if (pin === confirmPin) {
        void setUserPin()
      } else {
        Vibration.vibrate()

        setPin("")
        setConfirmPin("")
        setStage("default")
      }
    }
  }, [pin, confirmPin])
  const handlePinChange = (number) => {
    setPin((pin) => `${pin}${number}`)
  }

  const handleConfirmPinChange = (number) => {
    setConfirmPin((confirmPin) => `${confirmPin}${number}`)
  }
  const clear = () => {
    if (stage === "confirm") {
      setConfirmPin("")
    } else {
      setPin("")
    }
  }
  switch (stage) {
    case "confirm":
      return (
        <PinLock
          setValue={handleConfirmPinChange}
          value={confirmPin}
          title="Confirm your pin"
          clear={clear}
        />
      )
    default:
      return (
        <PinLock
          setValue={handlePinChange}
          value={pin}
          title="Enter your Pin"
          clear={clear}
        />
      )
  }
}

PinPage.defaultProps = {
  authApiBaseUrl: Constants.manifest.extra.authApiBaseUrl,
}

export default PinPage
