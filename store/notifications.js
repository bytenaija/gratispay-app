import React, { createContext } from "react"

export const NotificationContext = createContext({ notifications: {}, setNotifications: () => {} })

const NotificationContextProvider = ({ children, notifications, setNotifications }) => {
  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContextProvider
