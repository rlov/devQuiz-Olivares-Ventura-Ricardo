import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, ToastAndroid } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Icon, Button } from 'react-native-elements'
import GasStationInput from './src/components/GasStationInput'
import CostInput from './src/components/CostInput'
import CustomDivider from './src/components/CustomDivider'
import ResultContainer from './src/components/ResultContainer'
import RNBootSplash from 'react-native-bootsplash'
//react-native-elements
const MAIN_COLOR = "#00a680"

export default function App() {

  const [grifo, setGrifo] = useState([])
  const [costo, setCosto] = useState([])
  const [formError, setFormError] = useState({})
  const [result, setResult] = useState(null)

  useEffect(() => {
    (async() => {
        await RNBootSplash.hide({ fade: true })
    })()
}, []);

  const checkIfNumberIsInteger = (n) => {
    return Number.isInteger(n)
  }

  const checkIfNumberIsNotNegative = (n) => {
    return n >= 0;
  }

  const checkIsNumberIsValid = (n) => {
    return !isNaN(n)
  }

  const getTheInitialGasStation = () => {
    let currentGas = 0; //El carro inicia con el tanque vacío
    let currentIndex = 0; 
    let auxParams = []; //Este array contendrá los parámetros que debemos mostrar en la interfaz
    let band = true; //Si es true quiere decir que el grifo cumple la condición del problema, caso contrario NO

    for(let i = currentIndex; i < grifo.length; i++){
      
      currentGas = grifo[i]; //Se carga la gasolina inicial en el tanque del auto

      //IDA
      for (let j = currentIndex; j < grifo.length; j++) {
        
        //Ahora para viajar al siguiente grifo, debemos comprobar siel currentGas es mayor o igual que el costo
        if(currentGas >= costo[j] && j < (grifo.length - 1)){
          currentGas -= costo[j];  //Quiere decir que se viajo al siguiente grifo y por lo tanto le disminuimos el costo
          currentGas += grifo[j + 1];  //Y le aumentamos la gasolina del grifo al que se ha viajado
        }
        else if(currentGas < costo[j]){ //Ya no se puede viajar al siguiente grifo
          band = false;
          break; //Salimos del bucle, ya que, quiere decir que no se puede viajar y no tiene sentido seguir realizando las siguientes comparaciones
        }
        else{ 
          //Estamos en el último elemento, por lo tanto debemos comprobar si se puede viajar el primer grifo

          if(currentGas >= costo[j]){
            currentGas -= costo[j];
            currentGas += grifo[0];
          }
          else{
            band = false;
          }
        }
      }

      if(band){ //Si band = true, entonces seguimos realizando las comparaciones, caso contrario no tiene sentido seguir comparando
        //VUELTA
        for(let j = 0; j < currentIndex; j++){
          if(currentGas >= costo[j]){
            currentGas -= costo[j];
            currentGas += grifo[j + 1];
          }
          else{
            band = false;
            break; //Salimos del bucle, ya que, quiere decir que no se puede viajar y no tiene sentido seguir realizando las siguientes comparaciones
          }
        }
      }
      
      //Comprobamos si el índice actual cumple o no con la condición del problema
      if(band){
        auxParams.push(currentIndex);
      }

      currentIndex++;
      band = true;
    }

    setResult(auxParams)
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
      getTheInitialGasStation()
    }
    setFormError(errors)
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.title}>Bienvenido</Text>

          <GasStationInput grifo={grifo} setGrifo={setGrifo} formError={formError}
          setFormError={setFormError} setResult={setResult}/>

          <CustomDivider marginTop={10} marginBottom={25}/>

          <CostInput costo={costo} setCosto={setCosto} formError={formError}
          setFormError={setFormError} setResult={setResult}/>

          {
            (formError?.differentLength) && (
              <Text style={styles.textError}>
                Los dos campos deben tener la misma cantidad de elementos
              </Text>
            )
          }

          {
            (result) && (
              <ResultContainer result={result}/>
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