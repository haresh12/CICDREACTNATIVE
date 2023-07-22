/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  // generateTestCrash,
  hasCrashedInLastSession,
  lastSessionCrashReport,
} from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

function App(): JSX.Element {
  useEffect(() => {
    checkPreviousCrash();
  }, []);
  const checkPreviousCrash = async () => {
    const didCrash = await hasCrashedInLastSession();
    if (didCrash) {
      const lastCrash = await lastSessionCrashReport();

      Alert.alert('Sorry for the bad experience', JSON.stringify(lastCrash));
    }
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        Analytics.trackEvent('My custom event');
      }}>
      <Text>CLICK HERE TO CRASH</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
