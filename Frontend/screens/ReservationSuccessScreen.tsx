import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';
import { useNavigation } from '@react-navigation/native';
import Logo from '../assets/logo.png';

const ReservationSuccessScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <AnimatedScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="close" size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Confirmation</Text>
        </View>
        <View style={styles.indicators}>
          <View style={styles.indicator} />
          <View style={styles.indicator} />
          <View style={styles.indicatorActive} />
        </View>
        <View style={styles.illustrationWrapper}>
          <View style={styles.illustrationGlow} />
          <MaterialIcons name="pets" size={140} color="rgba(76,175,80,0.2)" style={styles.illustrationIcon} />
          <ImageBackground
            source={Logo} 
            style={styles.illustrationImage}
          />
        </View>
        <View style={styles.badge}>
          <MaterialIcons name="check-circle" size={14} color="#4caf50" />
          <Text style={styles.badgeText}>RESERVATION SECURED</Text>
        </View>
        <Text style={styles.title}>Reservation Confirmed!</Text>
        <Text style={styles.subtitle}>
          Wags and whiskers! Your reservation for <Text style={styles.boldText}>Buddy</Text> has been successfully placed. The seller,{' '}
          <Text style={styles.boldText}>Golden Meadows</Text>, has been notified.
        </Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="person" size={20} color="#ec9213" />
            </View>
            <View style={styles.infoTextBlock}>
              <Text style={styles.infoLabel}>Seller</Text>
              <Text style={styles.infoValue}>Golden Meadows Kennel</Text>
            </View>
            <MaterialIcons name="verified" size={18} color="#4caf50" />
          </View>
          <View style={styles.infoDivider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="calendar-today" size={20} color="#ec9213" />
            </View>
            <View style={styles.infoTextBlock}>
              <Text style={styles.infoLabel}>Next Step</Text>
              <Text style={styles.infoValue}>Coordinate pickup date</Text>
            </View>
          </View>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton}>
            <MaterialIcons name="chat-bubble" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Message Seller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialIcons name="receipt-long" size={18} color="#0f172a" />
            <Text style={styles.secondaryButtonText}>Go to Orders</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </AnimatedScreen>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7f6',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
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
    backgroundColor: 'rgba(236,146,19,0.2)',
  },
  indicatorActive: {
    width: 32,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ec9213',
  },
  illustrationWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  illustrationGlow: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(236,146,19,0.1)',
    position: 'absolute',
  },
  illustrationIcon: {
    position: 'absolute',
  },
  illustrationImage: {
    width: 180,
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(76,175,80,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    gap: 4,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 10,
    letterSpacing: 1,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#4caf50',
  },
  title: {
    fontSize: 28,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
  boldText: {
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  infoCard: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(236,146,19,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTextBlock: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#94a3b8',
  },
  infoValue: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 14,
  },
  actions: {
    marginTop: 20,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#ec9213',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
  },
  secondaryButton: {
    backgroundColor: '#f1f5f9',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 15,
  },
});

export default ReservationSuccessScreen;
