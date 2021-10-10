import React, { createContext, useState } from "react"

export const GiveawayContext = createContext({ giveaways: {}, setGiveaway: () => {} })

const GiveawayContextProvider = ({ children, setGiveaway, giveaways }) => {
  return (
    <GiveawayContext.Provider value={{ giveaways, setGiveaway }}>
      {children}
    </GiveawayContext.Provider>
  )
}

export default GiveawayContextProvider
