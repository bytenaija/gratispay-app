import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, TextInput, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import MainLayout from "../layouts/main-layout"
const ScreenHeight = Dimensions.get("window").height;
import {  Ionicons } from "@expo/vector-icons"
import { createGiveaway } from '../functions/giveaway';
import { GiveawayContext } from "../store/giveaway"
import { UserContext } from "../store/user"



const CreateGiveawayScreen = ({ navigation }) => {
    const {  setGiveaway } = useContext(GiveawayContext)
  const { user } = useContext(UserContext)
  const [amount, setAmount] = useState(0)
  const [numberOfBeneficiaries, setNumberOfBeneficiaries] = useState(0)
  const enterGiveAwayCode = (total) => {
    setAmount(total)
  }

  const changeNumberOfbeneficiaries = (num) => {
    setNumberOfBeneficiaries(num)
  }

  const createGiveAway = async () => {
    if(!amount || !numberOfBeneficiaries) return
    const giveawayData = {
      amount,
      currency: 'NGN',
      numberOfBeneficiaries
    }
    await createGiveaway(user.access_token, giveawayData, setGiveaway)
    navigation.navigate("HomeScreen")
  }
  return(
      <MainLayout navigation={navigation} back>
        <ScrollView style={{ flex: 1, height: "100%",  }}>
          <View style={styles.container}>
          <View >
            <Text style={styles.label}>Amount</Text>
            <TextInput placeholder="50000" style={styles.input} value={amount} onChangeText={enterGiveAwayCode} underlineColorAndroid="transparent" keyboardType="numeric" />
          </View>

          <View >
            <Text style={styles.label}>Number of Beneficiaries</Text>
            <TextInput placeholder="10" style={styles.input} value={numberOfBeneficiaries} onChangeText={changeNumberOfbeneficiaries} underlineColorAndroid="transparent" keyboardType="numeric" />
          </View>
          <TouchableOpacity style={styles.button} onPress={createGiveAway}><Text style={styles.buttonText}>Create</Text></TouchableOpacity>
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
    fontWeight: "800", letterSpacing: 10,
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
export default CreateGiveawayScreen