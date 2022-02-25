import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
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
  const [formError, setFormError] = useState({})

  console.log("grifo: ",grifo)
  console.log("costo: ",costo)

  const checkIfNumberIsInteger = (n) => {
    return Number.isInteger(n)
  }

  const checkIfNumberIsNotNegative = (n) => {
    return n >= 0;
  }

  const checkIsNumberIsValid = (n) => {
    return !isNaN(n)
  }

  

  const onPressCalculate = () => {
    let errors = {};

    if(grifo?.length == 0){
      errors.grifo = true;
      errors.grifoMessage = "La gasolina es requerida"
      ToastAndroid.show("La gasolina en cada grifo es requerida", ToastAndroid.SHORT)
    }
    else if(costo?.length == 0){
      errors.costo = true;
      errors.costoMessage = "El costo es requerido"
      ToastAndroid.show("El costo es requerido", ToastAndroid.SHORT)
    }
    else if(grifo?.length != costo?.length){
      errors.differentLength = true;
    }

    //Ahora debemos comprobar si cada elemento es entero y no negativo
    else if(!grifo?.every(checkIfNumberIsInteger) || !grifo.every(checkIfNumberIsNotNegative)){
      errors.grifo = true;
      errors.grifoMessage = "La gasolina de cada grifo debe ser un número ENTERO y MAYOR A CERO"
      ToastAndroid.show("La gasolina en cada grifo debe ser un número ENTERO y MAYOR A CERO", ToastAndroid.SHORT)
    }
    else if(!costo?.every(checkIfNumberIsInteger) || !costo.every(checkIfNumberIsNotNegative)){
      errors.costo = true;
      errors.costoMessage = "El costo de cada grifo debe ser un número ENTERO y MAYOR A CERO"
      ToastAndroid.show("El costo de cada grifo debe ser un número ENTERO y MAYOR A CERO", ToastAndroid.SHORT)
    }

    //También debemos comprobar si cada elemento del grifo y del costo es un número válido
    else if(!costo?.every(checkIsNumberIsValid)){
      errors.grifo = true;
      errors.grifoMessage = "Introduce valores válidos para la gasolina de cada grifo"
      ToastAndroid.show("Introduce valores válidos para la gasolina de cada grifo", ToastAndroid.SHORT)
    }
    else if(!grifo.every(checkIsNumberIsValid)){
      errors.costo = true;
      errors.costoMessage = "Introduce valores válidos para la el costo de cada grifo"
      ToastAndroid.show("Introduce valores válidos para la el costo de cada grifo", ToastAndroid.SHORT)
    }
    else{
      console.log("Todo correcto")
    }
    setFormError(errors)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Bienvenido</Text>

          <GrifoInput grifo={grifo} setGrifo={setGrifo} formError={formError}
          setFormError={setFormError}/>

          <CustomDivider marginTop={10} marginBottom={25}/>

          <CostoInput costo={costo} setCosto={setCosto} formError={formError}
          setFormError={setFormError}/>

          {
            (formError?.differentLength) && (
              <Text style={styles.textError}>
                Los dos campos deben tener la misma cantidad de elementos
              </Text>
            )
          }

        </ScrollView>

        <Button  
          onPress={onPressCalculate}
          buttonStyle={styles.button} 
          title={"Calcular"} 
          icon={<Icon type='material-community' name='check' color={"white"} size={20}/>}/>
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
    paddingVertical: 20
  },
  title:{
    fontSize: 32,
    padding: 15,
    paddingTop: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button:{
    marginBottom: 10,
    marginHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: "#00a680"
  },
  textError:{
        color: 'red',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        fontSize: 14
    }
})