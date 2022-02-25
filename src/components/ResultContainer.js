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
          <>
              {result?.map((item, index) => (
                <GasItem item={item} key={index}/>
              ))}
            <ExplicationContainer result={result}/>
          </>
        ) : (
          <>
            <GasItem item={"-1"}/>
            <ExplicationContainer />
          </>
        )
      }
    </View>
  )
}

const ExplicationContainer = ({ result = -1 }) => {

  const getGrifos = () => {
    let auxText = "";
    result?.forEach((item, index) => {
      auxText += `grifo[${item}]`
      if(index < (result?.length - 1) && result?.length > 0){
        auxText += ", "
      }

      if(index ==  (result?.length - 2)){
        auxText += "y "
      }

    })
    return auxText;
  }

  return(
    <View>
      <Text style={{fontSize: 16}}>
        Quiere decir que:
      </Text>
      {
        (result == -1) ? (
          <>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>
              NO se puede recorrer el circuito una vez, sin importar dónde comience.
            </Text>
          </>
        ) : (
          <>
          <Text style={{fontWeight: 'bold', fontSize: 15}}>
            Si se comienza desde el {getGrifos()}, entonces SÍ se puede recorrer el circuito en el sentido de las agujas del reloj
          </Text>
          </>
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