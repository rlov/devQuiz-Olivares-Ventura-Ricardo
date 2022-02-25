import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'

export default function CostoInput({ costo, setCosto }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon type='material-community' name='cash' color={"black"} size={24}/>
        <Text style={styles.subtitle}>Introduzca el costo de cada grifo (Sepárelos por comas )</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 12
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    subtitle:{
        flex: 1,
        paddingLeft: 10
    }
})