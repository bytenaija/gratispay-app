import React, { createContext } from "react"

export const BenefitContext = createContext({ giveawayEntered: {}, setGiveAwayEntered: () => {} })

const BenefitContextProvider = ({ children, giveawayEntered, setGiveAwayEntered }) => {
  return (
    <BenefitContext.Provider value={{ giveawayEntered, setGiveAwayEntered }}>
      {children}
    </BenefitContext.Provider>
  )
}

export default BenefitContextProvider
