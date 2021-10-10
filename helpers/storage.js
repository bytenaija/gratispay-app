import AsyncStorage from "@react-native-async-storage/async-storage"

export async function saveItemInStorage(key, value) {
  if (typeof value !== "string") value = JSON.stringify(value)
  await AsyncStorage.setItem(key, value)
}

export async function getItemFromStorage(key) {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return JSON.parse(value)
    } else {
      return null
    }
  } catch (e) {
    return null
  }
}

export async function deleteItemFromStorage(key) {
  return await AsyncStorage.removeItem(key)
}
