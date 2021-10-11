import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import moment from 'moment'
import numbro from "numbro"


import { BENEFICIARIESGIVEAWAYSTATUS, sortDate } from '../constants/giveaway';


const BeneficiaryWidget = ({ navigation, giveAway = []}) => {
  const currentGiveAway = giveAway.sort(sortDate).slice(0, 2);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.mainText}>
          Benefited From
          </Text>
          <View style={styles.notice}><Text style={styles.noticeText}>{currentGiveAway.length}</Text></View></View>
        <TouchableOpacity style={styles.button}><Text>See All</Text></TouchableOpacity>

      </View>
      <View style={styles.giveawayMainContainer}>
        {giveAway.length > 0 && (<>{currentGiveAway.map(giveaway => <Giveaway giveaway={giveaway} key={giveaway._id} />)}</>)}
         {giveAway.length <= 0 && (<Text>Your followers are still waiting for their baller</Text>)}
      </View>
    </View>
  )
}



const Giveaway = ({ giveaway }) => {


const getCorrectButton = (status, id) => {
 switch (status) {
    case BENEFICIARIESGIVEAWAYSTATUS.PENDING:
return <Text style={styles.textPurple} >

       PENDING
       </Text>

   case BENEFICIARIESGIVEAWAYSTATUS.PAID:
     return <Text style={styles.textGreen} >

       PAID
       </Text>
    case BENEFICIARIESGIVEAWAYSTATUS.ERROR:
    default:
     return <Text style={styles.textRed} >

       ERROR
       </Text>


  }
}


  return (
    <View style={styles.individualContainer}>
      <View style={styles.detailsContainer}>
      <View style={styles.details}>
        <View >{ getCorrectButton(giveaway.status, giveaway._id)}</View>
        <Text>{giveaway.currency} {numbro(giveaway.amount).format({
                    thousandSeparated: true,
                    mantissa: 2,
                  })}</Text>
      </View>
      </View>
      <View>
        <Text>

        {moment(giveaway.createdAt).fromNow()}
        </Text>
      </View>

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
    justifyContent: 'center',
    alignItems: 'center'
  },
  textRed: {
    fontWeight: '900',
    color: '#ff0000',
  },
   purpleIcons: {


    justifyContent: 'center',
    alignItems: 'center'
  },
textPurple: {
    fontWeight: '900',
     color: '#8576ED',
  },
  greenIcons: {

    justifyContent: 'center',
    alignItems: 'center'
  },
  textGreen: {
    fontWeight: '900',
    color: '#00FF00',
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
export default BeneficiaryWidget