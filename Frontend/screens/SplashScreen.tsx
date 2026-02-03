import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeScreen } from '../components/SafeScreen';

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 1200);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.centerContent}>
        <View style={styles.logoWrapper}>
          <View style={styles.logoGlow} />
          <View style={styles.logoCircle}>
            <MaterialIcons name="pets" size={84} color="#ffffff" />
          </View>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>PetConnect</Text>
          <Text style={styles.subtitle}>Trusted Pet Marketplace</Text>
        </View>
        <ActivityIndicator size="small" color="#36e261" style={styles.spinner} />
      </View>
      <TouchableOpacity style={styles.languageButton} activeOpacity={0.8}>
        <MaterialIcons name="language" size={20} color="#36e261" />
        <Text style={styles.languageText}>EN</Text>
        <MaterialIcons name="expand-more" size={18} color="rgba(14,27,17,0.4)" />
      </TouchableOpacity>
      <View style={styles.decorTop} />
      <View style={styles.decorBottom} />
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  logoWrapper: {
    width: 144,
    height: 144,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlow: {
    position: 'absolute',
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: '#36e261',
    opacity: 0.2,
  },
  logoCircle: {
    width: 144,
    height: 144,
    borderRadius: 72,
    backgroundColor: '#36e261',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  textBlock: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#0e1b11',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: 'rgba(14,27,17,0.7)',
    marginTop: 4,
  },
  spinner: {
    marginTop: 12,
  },
  languageButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  languageText: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0e1b11',
  },
  decorTop: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 128,
    backgroundColor: 'rgba(54,226,97,0.05)',
    top: -80,
    left: -80,
  },
  decorBottom: {
    position: 'absolute',
    width: 384,
    height: 384,
    borderRadius: 192,
    backgroundColor: 'rgba(54,226,97,0.05)',
    bottom: -96,
    right: -96,
  },
});

export default SplashScreen;
