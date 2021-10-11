
import Constants from "expo-constants"
import axios from "axios"

const accountUrl = Constants.manifest.extra.accountsApiBaseUrl


export const getUserGiveAway = async (access_token, setGiveaway) => {
    const auth = `Bearer ${access_token}`
    const url = `${accountUrl}giveaway`
    try {
      const { data } = await axios.get(url, {
        headers: {
          Authorization: auth,
        },
      })
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

export const enterGiveAway = async (access_token, giveawayData, setGiveawayEntered) => {
const auth = `Bearer ${access_token}`
  const url = `${accountUrl}giveaway/enter`
  try {
    const { data } =await axios.post(url, giveawayData, {
      headers: {
        Authorization: auth,
      },
    })
    await getGiveawayBenefitedFrom(access_token, setGiveawayEntered)
  } catch (err) {
    console.log(err.response.message)
  }
}


export const getGiveawayBenefitedFrom = async (access_token, setGiveawayEntered) => {
  const auth = `Bearer ${access_token}`
  const url = `${accountUrl}giveaway/benefits`
  try {
    const { data } =await axios.get(url,  {
      headers: {
        Authorization: auth,
      },
    })
    setGiveawayEntered(data)
  } catch (err) {
    console.log(err.response.message)
    setGiveawayEntered([])
  }
}