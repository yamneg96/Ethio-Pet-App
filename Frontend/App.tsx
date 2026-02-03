import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts as useJakartaFonts, PlusJakartaSans_400Regular, PlusJakartaSans_500Medium, PlusJakartaSans_600SemiBold, PlusJakartaSans_700Bold, PlusJakartaSans_800ExtraBold } from '@expo-google-fonts/plus-jakarta-sans';
import { useFonts as useInterFonts, Inter_400Regular, Inter_500Medium, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { View, Text, StyleSheet } from 'react-native';
import RootNavigator from './navigation/RootNavigator';

const DEBUG_MINIMAL_RENDER = true;

export default function App() {
  const [jakartaLoaded] = useJakartaFonts({
    PlusJakartaSans_400Regular,
    PlusJakartaSans_500Medium,
    PlusJakartaSans_600SemiBold,
    PlusJakartaSans_700Bold,
    PlusJakartaSans_800ExtraBold,
  });

  const [interLoaded] = useInterFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_700Bold,
    Inter_900Black,
  });

  if (!jakartaLoaded || !interLoaded) {
    return null;
  }

  if (DEBUG_MINIMAL_RENDER) {
    return (
      <View style={styles.debugContainer}>
        <StatusBar style="dark" />
        <Text style={styles.debugText}>Debug minimal render</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <RootNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  debugContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  debugText: {
    fontSize: 16,
    color: '#0f172a',
  },
});
