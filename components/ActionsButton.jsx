import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

const ActionsButton = ({navigation}) => {
  return (
    <View style={styles.container}>
      <IconButton text="Enter" color="#3D83F9" icon="arrow-circle-o-down" link="EnterGiveAway" navigation={navigation}/>
      <IconButton text="Top Up" color="#EEA57C" icon="plus-square-o" link="EnterGiveAway" navigation={navigation}/>
      <IconButton text="Giveaway" color="#8576ED" icon="paper-plane-o" link="CreateGiveaway" navigation={navigation}/>
       <IconButton text="Withdraw" color="#FF467E" icon="arrow-circle-down" link="EnterGiveAway" navigation={navigation}/>
    </View>
  )
}

const IconButton = ({ navigation, icon, text, link, color }) => {
  return <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate(link)}>
    <View style={{ ...styles.icon, borderColor: color  }}>

      <FontAwesome name={icon} size={20} color={color}/>
    </View>


      <Text style={styles.iconText}>{text}</Text>

  </TouchableOpacity>
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
    height: 100,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: 'row',
    borderRadius: 5
  },
  iconButton: {
    width: 70,
    alignItems: "center"
  },
  iconText: {
    color: "#000000",
    fontSize: 14,
  },
  icon: {
    padding: 5,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 10,
    borderStyle: 'solid',
    borderWidth: 1
  }
})
export default ActionsButton