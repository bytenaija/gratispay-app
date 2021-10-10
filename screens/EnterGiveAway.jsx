import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, TextInput, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import MainLayout from "../layouts/main-layout"
const ScreenHeight = Dimensions.get("window").height;
import {  Ionicons } from "@expo/vector-icons"
import { createGiveaway, enterGiveAway } from '../functions/giveaway';
import { GiveawayContext } from "../store/giveaway"
import { UserContext } from "../store/user"



const EnterGiveAwayScreen = ({ navigation }) => {
    const {  setGiveaway } = useContext(GiveawayContext)
  const { user } = useContext(UserContext)
   const [giveawayCode, setGiveAwayCode] = useState('')
  const enterGiveAwayCode = (code) => {
    setGiveAwayCode(code.toUpperCase())
  }

  const enterGiveaway = async () => {
    if(!giveawayCode) return
    const giveawayData = {
      code: giveawayCode,
      amount: 5000
    }
    await enterGiveAway(user.access_token, giveawayData, setGiveaway)
    navigation.navigate("HomeScreen")
  }

  return(
      <MainLayout navigation={navigation} back>
        <ScrollView style={{ flex: 1, height: "100%",  }}>
          <View style={styles.container}>
          <View >
            <Text style={styles.label}>Giveaway Code</Text>
            <TextInput placeholder="G Z 9 X L N" style={styles.input} value={giveawayCode} onChangeText={enterGiveAwayCode} underlineColorAndroid="transparent"/>
          </View>

          <TouchableOpacity style={styles.button} onPress={enterGiveaway}><Text style={styles.buttonText}>Enter</Text></TouchableOpacity>
          </View>
        </ScrollView>
      </MainLayout>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    height: ScreenHeight,

  },

  label: {
    fontWeight: "800",
    fontSize: 24
  },
  input: {
    height: 70,
    borderStyle: 'solid',
    borderColor: "#8576ED",
    borderWidth: 1,
    marginVertical: 20,
    padding: 20,
    fontSize: 24,
    fontWeight: "800", letterSpacing: 15,
    textAlign: "center"
  },
  button: {
    width: '100%',
    backgroundColor: "#8576ED",
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ffffff',
    padding: 10,
    borderRadius: 10,
    paddingVertical: 20,
    marginTop: 20
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18
  }
});
export default EnterGiveAwayScreen