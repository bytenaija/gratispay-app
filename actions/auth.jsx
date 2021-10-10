import { deleteItemFromStorage } from "../helpers/storage"

export const logout = (setUser, navigation) => {
  setUser(null)
  deleteItemFromStorage("user")
  navigation.navigate("Login")
}
