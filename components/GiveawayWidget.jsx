import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import numbro from "numbro"
import  Constants  from 'expo-constants';

import { STATUS } from '../constants/giveaway';
import { borderColor } from 'styled-system';

const GiveAwayWidget = ({ navigation, giveAway = [], handleClose, handleAccepting }) => {
  const currentGiveAway = giveAway.slice(0, 2);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.mainText}>
          Current Giveaway
          </Text>
          <View style={styles.notice}><Text style={styles.noticeText}>{currentGiveAway.length}</Text></View></View>
        <TouchableOpacity style={styles.button}><Text>See All</Text></TouchableOpacity>

      </View>
      <View style={styles.giveawayMainContainer}>
        {giveAway.length > 0 && (<>{currentGiveAway.map(giveaway => <Giveaway giveaway={giveaway} key={giveaway._id} handleAccepting={handleAccepting} handleClose={handleClose}/>)}</>)}
         {giveAway.length <= 0 && (<Text>Your followers are still waiting for their baller</Text>)}
      </View>
    </View>
  )
}



const Giveaway = ({ giveaway, handleAccepting, handleClose }) => {


const getCorrectButton = (status, id) => {
 switch (status) {
    case STATUS.ACCEPTING:
return <TouchableOpacity style={styles.redIcons} onPress={() => handleClose(id)}>

       <FontAwesome name="pause" color="#ff0000" />
       </TouchableOpacity>

    case STATUS.CLOSED:
    case STATUS.CREATED:
    default:
     return <TouchableOpacity style={styles.purpleIcons} onPress={() => handleAccepting(id)}>

       <FontAwesome name="play" color="#8576ed" />
       </TouchableOpacity>


  }
}

const getCorrectIcon = (status) => {
  switch (status) {
    case STATUS.ACCEPTING:
      return <View style={{ ...styles.icon, borderColor: "#00ff00" }}>

        <FontAwesome name="briefcase" color="#00ff00" size={20}/>
      </View>
    case STATUS.CLOSED:
      return <View style={{ ...styles.icon, borderColor: "#ff0000" }}><FontAwesome name="power-off" color="#ff0000" size={20}/></View>
    case STATUS.CREATED:
    default:
      return <View style={{ ...styles.icon, borderColor: "#8576ed" }}><FontAwesome name="refresh" color="#8576ed" size={20}/></View>
  }
}
  return (
    <View style={styles.individualContainer}>
      <View style={styles.detailsContainer}>


        {getCorrectIcon(giveaway.status)}

      <View style={styles.details}>
        <Text style={styles.codeText}>{giveaway.code}</Text>
        <Text>{giveaway.currency} {numbro(giveaway.amount).format({
                    thousandSeparated: true,
                    mantissa: 2,
                  })}</Text>
      </View>
      </View>
      <View style={{alignItems: 'center', }}>{ getCorrectButton(giveaway.status, giveaway._id)}</View>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,

    borderRadius: 5
  },

  button: {
    color: '#cccccc'
  },
  header: {
    justifyContent: "space-between",
    flexDirection: 'row',
    flex: 1
  },
  headerText: {
    flex: 1,
    flexDirection: 'row'
  },
  notice: {
    backgroundColor: '#000000',

    borderRadius: 100,
    width: 15,
    height: 15, marginLeft: 5,

    alignItems: 'center',
    justifyContent: 'center'
  },
  noticeText: {
    color: "#ffffff",
    fontSize: 10
  },
  mainText: {
    fontWeight: '900'
  },
  giveawayMainContainer: {
    marginTop: 20
  },

  individualContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: .5,
    borderStyle: 'solid',
    padding: 5,
    borderColor: "#8576ED",
    justifyContent: 'space-between'
  },

   details: {
    marginLeft: 20
  },
  codeText: {
    fontWeight: '800',
    fontSize: 24
  },
  redIcons: {
    width: 50,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ff0000',
    justifyContent: 'center',
    alignItems: 'center'
  },
   purpleIcons: {
    width: 50,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#8576ED',
    justifyContent: 'center',
    alignItems: 'center'
  },
  detailsContainer: {
      flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'solid'
  }

})
export default GiveAwayWidget