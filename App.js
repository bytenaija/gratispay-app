import React, { useState, useRef, useEffect } from "react"
import AppLoading from "expo-app-loading"
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants"


import RootStack from "./navigators/RootStack"
import UserContextProvider from "./store/user"
import WalletContextProvider from "./store/wallet"
import {
  getItemFromStorage,
  saveItemInStorage,

} from "./helpers/storage"
import { getUserWallets } from "./functions/wallets"
import { checkIfPinSet,addUsertoken } from "./functions/auth"
import GiveawayContextProvider from "./store/giveaway"
import BenefitContextProvider from "./store/benefit";
import NotificationContextProvider from "./store/notifications";


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function App() {
  const [notification, setNotification] = useState(false);
  const [, setExpoPushToken] = useState(false);
  const [giveawayEntered, setGiveAwayEntered] = useState([])
  const notificationListener = useRef();
  const responseListener = useRef();
  const [appIsReady, setAppIsReady] = useState(false)
  const [storedCredentials, setStoredCredentials] = useState(null)
  const [wallet, setWallet] = useState({})
  const [giveaways, setGiveaway] = useState([])
  const checkIsUserExists = async () => {
    const userCred = await getItemFromStorage("user")
    const pinSet = await getItemFromStorage("pinSet")
    if (userCred) {
      userCred.pinSet = pinSet
      if (!pinSet) {
        const userPinSet = await checkIfPinSet(userCred.access_token)
        await saveItemInStorage("pinSet", userPinSet)
        userCred.pinSet = userPinSet
      }
    }
    setStoredCredentials(userCred)
    if (userCred) {
      await getUserWallets(userCred.access_token, setWallet)
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      const userCred = await getItemFromStorage("user")
      if (userCred) {
        const result = await addUsertoken(userCred.access_token, token)
      }
      setExpoPushToken(token)
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response, "haba");
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


  if (!appIsReady) {
    return (
      <AppLoading
        startAsync={checkIsUserExists}
        onFinish={() => setAppIsReady(true)}
        onError={(e) => console.log(e)}
      />
    )
  }

  async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;

  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
  return (
    <UserContextProvider
      setUser={setStoredCredentials}
      user={storedCredentials}
    >
      <WalletContextProvider setWallet={setWallet} wallet={wallet}>
        <GiveawayContextProvider setGiveaway={setGiveaway} giveaways={giveaways}>
          <BenefitContextProvider setGiveAwayEntered={setGiveAwayEntered} giveawayEntered={giveawayEntered}>
            <NotificationContextProvider notifications={notification} setNotifications={setNotification} >
              <RootStack />
            </NotificationContextProvider>
          </BenefitContextProvider>
        </GiveawayContextProvider>
      </WalletContextProvider>
    </UserContextProvider>
  )
}
