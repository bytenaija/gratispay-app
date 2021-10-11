import {
  getItemFromStorage,
  saveItemInStorage,
  deleteItemFromStorage,
} from "../helpers/storage"
import axios from "axios"
import Constants from "expo-constants"


const walletUrl = Constants.manifest.extra.walletsApiBaseUrl
export const getUserWallets = async (access_token, setWallet) => {
    const auth = `Bearer ${access_token}`
    const url = `${walletUrl}wallets`
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      })

      if (data) {
        setWallet(data)
        await saveItemInStorage("wallets", data)
      }
    } catch (err) {
      console.log(err)
      if (err.response.status === 401) {
        await deleteItemFromStorage("wallet")
        await deleteItemFromStorage("user")
      } else {
        const storedWallet = await getItemFromStorage("wallet")
        setWallet(storedWallet)
      }
    }
  }