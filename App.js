import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Icon, Button } from 'react-native-elements'
import GrifoInput from './src/components/GrifoInput'
import CostoInput from './src/components/CostoInput'
import CustomDivider from './src/components/CustomDivider'
//react-native-elements
const MAIN_COLOR = "#00a680"

export default function App() {

  const [grifo, setGrifo] = useState([])
  const [costo, setCosto] = useState([])

  const onPressCalculate = () => {
    /*
      "4, 2, 3", debemos borrar los espacios en blanco del string, luego convertirlo a un array
      luego comprobar si cada elemento es entero y no negativo
    */
    
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Bienvenido</Text>

          <GrifoInput grifo={grifo} setGrifo={setGrifo}/>

          <CustomDivider marginTop={20} marginBottom={20}/>

          <CostoInput costo={costo} setCosto={setCosto}/>

        </ScrollView>

        <Button buttonStyle={styles.button} title={"Calcular"} icon={<Icon type='material-community' name='check' color={"white"} size={20}/>}/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: 'white'
  },
  scrollView:{
    paddingVertical: 30
  },
  title:{
    fontSize: 34,
    padding: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button:{
    marginBottom: 10,
    marginHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#00a680"
  }
})