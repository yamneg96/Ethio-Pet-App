import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuthStore } from '../store/authStore';

const LoginScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const handleLogin = () => {
    setAuthenticated(true);
    navigation.replace('AppTabs');
  };

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.langButton}>
          <MaterialIcons name="language" size={20} color="#94a3b8" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.branding}>
          <View style={styles.logoWrapper}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeMqrpgfYbt1ZRWa0bYXdXYaj2pC9o0QVKtFe996B-C764FS8Q4cA3WWfoCUKVoYnxGGAAt9SgIw3rKeKIpCR7i2KLqayHMQC3OoW2_Ia7fHOJsNaM2QcTFhFJzvT6sRhR1LewtPqujzahaf8mRBX4J0nq-yX0yZXyJBposrUw4QRA8-1v0Y1m-Dl2wmHEtNchT7TQ1kLVs5nQ4PdnGB7qfSCWiihT0506ODke6v0BES7B_iUBWqCOUiNjRICDcHUn_h_prB1l8Eg',
              }}
              style={styles.logo}
            />
          </View>
          <Text style={styles.appName}>PetConnect</Text>
          <Text style={styles.welcome}>Welcome back, please login.</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email or Phone</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter email or phone number"
              placeholderTextColor="#94a3b8"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                placeholderTextColor="#94a3b8"
                secureTextEntry
              />
              <MaterialIcons name="visibility-off" size={20} color="#94a3b8" />
            </View>
          </View>
          <TouchableOpacity style={styles.forgotLink}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.trustRow}>
            <MaterialIcons name="verified-user" size={16} color="#94a3b8" />
            <Text style={styles.trustText}>Verified & Secure Marketplace</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Register')}>
              Create an account
            </Text>
          </Text>
        </View>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  langButton: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  branding: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  logoWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  appName: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  welcome: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
  },
  form: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: '#0f172a',
  },
  input: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#0f172a',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    paddingRight: 16,
  },
  forgotLink: {
    alignItems: 'flex-end',
  },
  forgotText: {
    fontSize: 13,
    fontFamily: 'Inter_500Medium',
    color: '#197fe6',
  },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    backgroundColor: '#197fe6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#197fe6',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    gap: 16,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
    color: '#94a3b8',
  },
  divider: {
    height: 1,
    alignSelf: 'stretch',
    backgroundColor: '#e2e8f0',
  },
  footerText: {
    fontSize: 15,
    fontFamily: 'Inter_400Regular',
    color: '#64748b',
    textAlign: 'center',
  },
  footerLink: {
    color: '#197fe6',
    fontFamily: 'Inter_700Bold',
  },
});

export default LoginScreen;
