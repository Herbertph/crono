import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from "react-native";

/** Global variables for timer and time units */
let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

/**
 * App Component
 * A simple stopwatch application.
 *
 * @returns {JSX.Element}
 */
function App() {

  const [numero, setNumero] = useState('00:00:00'); // Time displayed
  const [botao, setBotao] = useState('GO!');       // Button text state
  const [ultimo, setUltimo] = useState(null);      // Last time recorded

  /**
   * Starts or stops the timer based on its current state.
   */
  function go() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setBotao('GO!');
    } else {
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }

        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format = (hh < 10 ? '0' + hh : hh) + ':' +
          (mm < 10 ? '0' + mm : mm) + ':' +
          (ss < 10 ? '0' + ss : ss);

        setNumero(format);

      }, 100)
      setBotao('STOP!');
    }
  }

  /**
   * Clears the timer and saves the last recorded time.
   */
  function clear() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    setUltimo(numero);
    setNumero('00:00:00');
    ss = 0;
    mm = 0;
    hh = 0;
    setBotao('GO!');
  }

  return (
    <View style={styles.container}>
      <Image source={require('./src/crono.png')} />
      <Text style={styles.timer}> {numero} </Text>
      <View style={styles.btnArea}>
        <TouchableOpacity style={styles.btn} onPress={go}>
          <Text style={styles.btnText}> {botao} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={clear}>
          <Text style={styles.btnText}>Clear! </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.areaUltima}>
        <Text style={styles.textoCorrida}>
          {ultimo ? 'Last Time: ' + ultimo : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00aeef'
  },
  timer: {
    marginTop: -160,
    color: '#fff',
    fontSize: 45,
    fontWeight: 'bold'
  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9
  },
  btnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00aeef'
  },
  areaUltima: {
    marginTop: 40,
  },
  textoCorrida: {
    fontSize: 23,
    fontStyle: 'italic',
    color: '#fff'
  }
});

export default App;
