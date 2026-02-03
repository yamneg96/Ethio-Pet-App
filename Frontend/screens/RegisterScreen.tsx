import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeScreen } from '../components/SafeScreen';
import { useAuthStore } from '../store/authStore';

const RegisterScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [role, setRole] = useState<'Buyer' | 'Seller'>('Buyer');
  const setRoleStore = useAuthStore((state) => state.setRole);
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  const handleSubmit = () => {
    setRoleStore(role === 'Buyer' ? 'buyer' : 'seller');
    setAuthenticated(true);
    navigation.replace('AppTabs');
  };

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios-new" size={20} color="#0f172a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.langButton}>
          <MaterialIcons name="language" size={20} color="#0f172a" />
          <Text style={styles.langText}>EN</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>
            Join our community to find your new best friend or find them a loving home.
          </Text>
        </View>
        <View style={styles.roleSelector}>
          <View style={styles.roleSwitch}>
            <View
              style={[
                styles.roleIndicator,
                role === 'Buyer' ? { left: 4 } : { left: '50%' },
              ]}
            />
            <TouchableOpacity style={styles.roleButton} onPress={() => setRole('Buyer')}>
              <Text style={[styles.roleText, role === 'Buyer' && styles.roleTextActive]}>Buyer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => setRole('Seller')}>
              <Text style={[styles.roleText, role === 'Seller' && styles.roleTextActive]}>Seller</Text>
            </TouchableOpacity>
          </View>
          {role === 'Seller' && (
            <Text style={styles.roleHint}>*Sellers require identity verification after signup.</Text>
          )}
        </View>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="person" size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput placeholder="John Doe" placeholderTextColor="#94a3b8" style={styles.input} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="call" size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput placeholder="+1 (555) 000-0000" placeholderTextColor="#94a3b8" style={styles.input} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="mail" size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput placeholder="name@example.com" placeholderTextColor="#94a3b8" style={styles.input} />
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons name="lock" size={20} color="#94a3b8" style={styles.inputIcon} />
              <TextInput placeholder="Min. 8 characters" placeholderTextColor="#94a3b8" secureTextEntry style={styles.input} />
              <MaterialIcons name="visibility-off" size={20} color="#94a3b8" />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.primaryButtonText}>Create Account</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>Or sign up with</Text>
          <View style={styles.dividerLine} />
        </View>
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLBN0jlhPssrY67EVO9Q5vehqZXh0N592SDCBUDqeXJBGPM05GPrkV-r6aURcfKl4FnEIZo6zksa8qBikCxbD__A_LprXXhU20HGxFh3KGVwM9mzSKwBFJAmJ6wgZPgZVjzFMxEkrnDhJxxnPO-570OhsFCt3D8xaxHzehJ01efwCYoI5C-q79Fpq1vFo_Mk-73Rblb15rTje4wZv5C6ssYYGd3e1tKacB2lCeXzvErqFbsiEQUEI-2JHXqmIew8SRuAaqNYJW_FQ',
              }}
              style={styles.socialIcon}
            />
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <MaterialIcons name="desktop-mac" size={22} color="#0f172a" />
            <Text style={styles.socialText}>Apple</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already a member?{' '}
            <Text style={styles.footerLink} onPress={() => navigation.navigate('Login')}>
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  langText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  hero: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: '#64748b',
    lineHeight: 22,
  },
  roleSelector: {
    marginBottom: 24,
  },
  roleSwitch: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    padding: 4,
    position: 'relative',
  },
  roleIndicator: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  roleText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#94a3b8',
  },
  roleTextActive: {
    color: '#137fec',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  roleHint: {
    marginTop: 8,
    fontSize: 12,
    color: '#94a3b8',
  },
  form: {
    gap: 16,
    marginBottom: 24,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#0f172a',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  inputIcon: {
    marginRight: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#0f172a',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#137fec',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 20,
    shadowColor: '#137fec',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e2e8f0',
  },
  dividerText: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
  },
  socialIcon: {
    width: 20,
    height: 20,
  },
  socialText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#334155',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  footerText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: '#64748b',
  },
  footerLink: {
    color: '#137fec',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});

export default RegisterScreen;
