/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import {
  // generateTestCrash,
  hasCrashedInLastSession,
  lastSessionCrashReport,
} from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

function App(): JSX.Element {
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [inflationRate, setInflationRate] = useState('');

  useEffect(() => {
    checkPreviousCrash();
  }, []);

  const handleCalculate = () => {
    const initial = parseFloat(initialValue);
    const final = parseFloat(finalValue);

    if (!isNaN(initial) && !isNaN(final) && initial !== 0) {
      const rate = ((final - initial) / initial) * 100;
      setInflationRate(rate.toFixed(2));
    } else {
      setInflationRate('N/A');
    }
    Analytics.trackEvent('Inflation calculated'); // we can pass more properties also but not importent
  };

  const checkPreviousCrash = async () => {
    const didCrash = await hasCrashedInLastSession();
    if (didCrash) {
      const lastCrash = await lastSessionCrashReport();

      Alert.alert('Sorry for the bad experience', JSON.stringify(lastCrash));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inflation Tracking App</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Initial Value"
          keyboardType="numeric"
          value={initialValue}
          onChangeText={setInitialValue}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Final Value"
          keyboardType="numeric"
          value={finalValue}
          onChangeText={setFinalValue}
        />
      </View>
      <TouchableOpacity
        style={styles.calculateButton}
        onPress={handleCalculate}>
        <Text style={styles.calculateButtonText}>Calculate</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>Inflation Rate: {inflationRate}%</Text>
      <Text style={styles.resultText}>Change 1 {inflationRate}%</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  calculateButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 16,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultText: {
    fontSize: 18,
  },
});

export default App;
