import React, { createContext, useState } from "react"

export const WalletContext = createContext({ wallet: {}, setWallet: () => {} })

const WalletContextProvider = ({ children, setWallet, wallet }) => {
  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  )
}

export default WalletContextProvider
