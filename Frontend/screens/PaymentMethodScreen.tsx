import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';
import { useNavigation } from '@react-navigation/native';

const PaymentMethodScreen = () => {
  const navigation = useNavigation();
  const [method, setMethod] = useState('card');

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <AnimatedScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={18} color="#0d141b" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reservation</Text>
        </View>
        <View style={styles.indicators}>
          <View style={styles.indicator} />
          <View style={styles.indicatorActive} />
          <View style={styles.indicator} />
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Deposit Amount</Text>
            <Text style={styles.summaryAmount}>$150.00</Text>
          </View>
          <View style={styles.summaryRowBorder}>
            <Text style={styles.summaryLabel}>Balance at Pickup</Text>
            <Text style={styles.summaryValue}>$450.00</Text>
          </View>
        </View>
        <Text style={styles.title}>Payment Method</Text>
        <Text style={styles.subtitle}>Choose how you'd like to pay your reservation deposit.</Text>
        <View style={styles.radioList}>
          <TouchableOpacity
            style={[styles.radioItem, method === 'card' && styles.radioItemActive]}
            onPress={() => setMethod('card')}
          >
            <View style={[styles.radioIcon, method === 'card' && styles.radioIconActive]}>
              <MaterialIcons name="credit-card" size={20} color={method === 'card' ? '#137fec' : '#94a3b8'} />
            </View>
            <View style={styles.radioContent}>
              <Text style={styles.radioTitle}>Credit or Debit Card</Text>
              <Text style={styles.radioSubtitle}>Visa, Mastercard, or Amex</Text>
            </View>
            <View style={[styles.radioDot, method === 'card' && styles.radioDotActive]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setMethod('mobile')}
          >
            <View style={styles.radioIcon}>
              <MaterialIcons name="account-balance-wallet" size={20} color="#94a3b8" />
            </View>
            <View style={styles.radioContent}>
              <Text style={styles.radioTitle}>Mobile Money (Telebirr)</Text>
              <Text style={styles.radioSubtitle}>Instant mobile payment</Text>
            </View>
            <View style={[styles.radioDot, method === 'mobile' && styles.radioDotActive]} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setMethod('bank')}
          >
            <View style={styles.radioIcon}>
              <MaterialIcons name="account-balance" size={20} color="#94a3b8" />
            </View>
            <View style={styles.radioContent}>
              <Text style={styles.radioTitle}>Bank Transfer</Text>
              <Text style={styles.radioSubtitle}>Direct transfer from local bank</Text>
            </View>
            <View style={[styles.radioDot, method === 'bank' && styles.radioDotActive]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
      </AnimatedScreen>
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.payText}>Pay Now $150.00</Text>
          <MaterialIcons name="lock" size={16} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.securityRow}>
          <MaterialIcons name="verified-user" size={12} color="#94a3b8" />
          <Text style={styles.securityText}>Secure Trusted Checkout</Text>
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
  content: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d141b',
    marginRight: 40,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(19,127,236,0.2)',
  },
  indicatorActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#137fec',
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryRowBorder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  summaryAmount: {
    fontSize: 20,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#137fec',
  },
  summaryValue: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#0d141b',
  },
  title: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d141b',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#4c739a',
    marginTop: 6,
    marginBottom: 12,
  },
  radioList: {
    gap: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#cfdbe7',
    padding: 14,
  },
  radioItemActive: {
    borderColor: '#137fec',
    backgroundColor: 'rgba(19,127,236,0.05)',
  },
  radioIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIconActive: {
    backgroundColor: '#ffffff',
  },
  radioContent: {
    flex: 1,
  },
  radioTitle: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d141b',
  },
  radioSubtitle: {
    fontSize: 11,
    color: '#4c739a',
    marginTop: 2,
  },
  radioDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#cfdbe7',
  },
  radioDotActive: {
    borderColor: '#137fec',
    backgroundColor: '#137fec',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 12,
    backgroundColor: 'rgba(246,247,248,0.95)',
  },
  payButton: {
    backgroundColor: '#137fec',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  payText: {
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
  },
  securityRow: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  securityText: {
    fontSize: 9,
    letterSpacing: 2,
    color: '#94a3b8',
    textTransform: 'uppercase',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});

export default PaymentMethodScreen;
