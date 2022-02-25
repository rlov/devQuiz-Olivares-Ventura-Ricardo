import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'

export default function GrifoInput({ grifo, setGrifo }) {

    const onChangeText = (t) => {
        const auxGrifo = t.replace(/\s+/g, '');
        const arrayGrifo = auxGrifo.split(',')
        setGrifo(arrayGrifo)
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon type='material-community' name='water-pump' color={"black"} size={24}/>
        <Text style={styles.subtitle}>Introduzca la gasolina de cada grifo (Sepárelos por comas)</Text>
      </View>
      <Input 
            keyboardType='numeric' 
            autoCapitalize='none'
            placeholder='Por ejemplo: 1,2,3,4,5' inputStyle={styles.input}
            inputContainerStyle={{borderBottomWidth: 0}}
            onChangeText={onChangeText}
      />
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
    },
    input:{
        fontSize: 14,
        borderWidth: 1,
        borderColor: "#c1c1c1",
        marginTop: 18,
        paddingHorizontal: 10,
        borderRadius: 5
    }
})