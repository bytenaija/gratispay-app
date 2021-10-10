
import Constants from "expo-constants"
import axios from "axios"

const accountUrl = Constants.manifest.extra.accountsApiBaseUrl

console.log(accountUrl, "dhdhdhd")

export const getUserGiveAway = async (access_token, setGiveaway) => {
    const auth = `Bearer ${access_token}`
    const url = `${accountUrl}giveaway`
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      })
      console.log("dta", data)
      setGiveaway(data || [])
    } catch (err) {
      console.log((err))
      setGiveaway([])
    }
}

export const setClosed = async (access_token, id, setGiveaway) => {
  const auth = `Bearer ${access_token}`
    const url = `${accountUrl}giveaway/${id}/closed`
    try {
      await axios.patch(url, {}, {
        headers: {
          Authorization: auth,
        },
      })
      getUserGiveAway(access_token, setGiveaway)
    } catch (err) {
      console.log((err))

    }
}
export const setAccepting = async (access_token, id, setGiveaway) => {
  const auth = `Bearer ${access_token}`
  const url = `${accountUrl}giveaway/${id}/accepting`
  try {
    await axios.patch(url, {}, {
      headers: {
        Authorization: auth,
      },
    })
    getUserGiveAway(access_token, setGiveaway)
  } catch (err) {
    console.log((err))
  }
}


export const createGiveaway = async (access_token, giveawayData, setGiveaway) => {
const auth = `Bearer ${access_token}`
  const url = `${accountUrl}giveaway/`
  try {
    await axios.post(url, giveawayData, {
      headers: {
        Authorization: auth,
      },
    })
    getUserGiveAway(access_token, setGiveaway)
  } catch (err) {
    console.log((err))
  }
}

export const enterGiveAway = async (access_token, giveawayData, setGiveaway) => {
const auth = `Bearer ${access_token}`
  const url = `${accountUrl}giveaway/enter`
  try {
    const { data } =await axios.post(url, giveawayData, {
      headers: {
        Authorization: auth,
      },
    })
console.log(data, "enter")
  } catch (err) {
    console.log(err.response.message)
  }
}