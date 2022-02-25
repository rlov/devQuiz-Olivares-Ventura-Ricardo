import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'

export default function ResultContainer({ result }) {
  return (
    <View style={styles.container}>      
      <Text style={styles.subtitle}>Resultado:</Text>
      {
        (result?.length > 0) ? (
          <Text style={[styles.subtitle, {fontWeight: 'normal', fontSize: 15}]}>
            Parámetros devueltos:
          </Text>
        ) : (
          <Text style={[styles.subtitle, {fontWeight: 'normal', fontSize: 15}]}>
            Parámetro devuelto:
          </Text>
        )
      }
      {
        (result?.length > 0) ? (
          result?.map((item, index) => (
            <GasItem item={item} key={index}/>
          ))
        ) : (
          <GasItem item={"-1"}/>
        )
      }
    </View>
  )
}

const GasItem = ({item}) => {
  return(
    <View style={styles.gasItemContainer}>
      <Text style={styles.gasItem}>{item}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal: 12,
    marginTop: 15
  },
  subtitle:{
    /* flex: 1, */
    /* paddingLeft: 10, */
    fontSize: 19,
    fontWeight: 'bold'
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  gasItemContainer:{

  },
  gasItem:{
    textAlign: 'center',
    fontSize: 18
  }
})