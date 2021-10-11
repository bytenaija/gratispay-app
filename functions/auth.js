import Constants from "expo-constants"

const authUrl = Constants.manifest.extra.authApiBaseUrl
import axios from "axios"

export const checkIfPinSet = async (access_token) => {
    const auth = `Bearer ${access_token}`
    const url = `${authUrl}auth/pin`
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      })

      if (data) {
        return data.pinSet
      }
      return false
    } catch (err) {
      return false
    }
}

export const addUsertoken = async (access_token, token) => {
  const auth = `Bearer ${access_token}`
  const url = `${authUrl}auth/token`
  try {
    const { data } = await axios.patch(url, {token}, {
      headers: {
        Authorization: auth,
      },
    })

    return data
  } catch (err) {
    console.log(error)
  }
}