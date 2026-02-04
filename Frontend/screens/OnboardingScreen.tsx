import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeScreen } from '../components/SafeScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';

const heroImage = {
  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM7YnVLmedfjLYhzn7u4WdnfB6BIbxBLooqjbQz4Wc5Tn8W3cwL5vZn0r08dajymlJMiC3DPgbMxjAZqCd4lYN5m1zfKKUQxw6WlgFRDx7DdoBeYMoMO4IYPeYnwfeb41yS9u3o_zZQpE-uMwEGKPPy0p9o3lQzxRwJx25aWUtQLCPVPjN6jBaCBFiiS57FsuMsIoPKyAlhQLKNRG0D-fFwQ41xOtCfAYKml5RYXa0UYZG9U9npWSPXgIr4H58gOdYjsVaIVpEC6E',
};

const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <AnimatedScreen>
      <View style={styles.heroWrapper}>
        <ImageBackground source={heroImage} style={styles.heroImage} resizeMode="cover">
          <View style={styles.heroOverlay} />
        </ImageBackground>
      </View>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.langButton} activeOpacity={0.85}>
          <MaterialIcons name="language" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>
          Find Your New{`\n`}
          <Text style={styles.titleAccent}>Best Friend</Text>
        </Text>
        <Text style={styles.subtitle}>
          Discover and reserve pets from 100% verified sellers. A marketplace built on trust and love.
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.primaryButtonText}>Get Started</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.secondaryButtonText}>
              Already have an account? <Text style={styles.secondaryAccent}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      </AnimatedScreen>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },
  heroWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '65%',
  },
  heroImage: {
    flex: 1,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'flex-end',
    zIndex: 2,
  },
  langButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  sheet: {
    marginTop: 'auto',
    backgroundColor: '#f6f7f8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingBottom: 32,
    paddingTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: -8 },
  },
  handle: {
    width: 48,
    height: 6,
    borderRadius: 999,
    backgroundColor: '#e2e8f0',
    alignSelf: 'center',
    marginVertical: 16,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#0f172a',
    lineHeight: 36,
  },
  titleAccent: {
    color: '#137fec',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: '#64748b',
    marginTop: 16,
    marginBottom: 32,
    lineHeight: 24,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#137fec',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#137fec',
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  secondaryButton: {
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#334155',
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  secondaryAccent: {
    color: '#137fec',
  },
});

export default OnboardingScreen;
