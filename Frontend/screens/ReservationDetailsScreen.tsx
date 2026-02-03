import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { useNavigation } from '@react-navigation/native';

const ReservationDetailsScreen = () => {
  const navigation = useNavigation();
  const [deliveryType, setDeliveryType] = useState<'Delivery' | 'Local Pickup'>('Delivery');

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios" size={18} color="#0d1b12" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reservation Details</Text>
        </View>
        <View style={styles.progressBlock}>
          <View>
            <Text style={styles.stepTitle}>Step 1 of 3</Text>
            <Text style={styles.stepSubtitle}>1. Details, 2. Payment, 3. Confirm</Text>
          </View>
          <Text style={styles.stepPercent}>33%</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <Text style={styles.sectionHeader}>Delivery & Contact Info</Text>
        <View style={styles.segmented}>
          {['Delivery', 'Local Pickup'].map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.segmentItem, deliveryType === item && styles.segmentItemActive]}
              onPress={() => setDeliveryType(item as 'Delivery' | 'Local Pickup')}
            >
              <Text style={[styles.segmentText, deliveryType === item && styles.segmentTextActive]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Delivery Address</Text>
          <View style={styles.inputRow}>
            <MaterialIcons name="location-on" size={20} color="#94a3b8" />
            <TextInput placeholder="Enter your full address" placeholderTextColor="#94a3b8" style={styles.input} />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.formGroupHalf}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="call" size={18} color="#94a3b8" />
              <TextInput placeholder="(555) 000-0000" placeholderTextColor="#94a3b8" style={styles.input} />
            </View>
          </View>
          <View style={styles.formGroupHalf}>
            <Text style={styles.label}>Preferred Date</Text>
            <View style={styles.inputRow}>
              <MaterialIcons name="calendar-today" size={18} color="#94a3b8" />
              <TextInput placeholder="MM/DD/YYYY" placeholderTextColor="#94a3b8" style={styles.input} />
            </View>
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Delivery Instructions (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="e.g. Leave with neighbor, gate code: 1234"
            placeholderTextColor="#94a3b8"
            multiline
          />
        </View>
        <View style={styles.mapWrapper}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlDGrhgjBUmFXVNXRmLnoiHS-B4cLQrMpqwRwVzIBdxwG1I08HatoYsp3L4g04FAhikpxaZwYUEFmn_II8zAaIryDgKDKQIwmcQr6ZtVPgQgIxqHbs1L9L_XC2xdY5KJcR98zl0s937cUblahqMeU2ShzaYUohtEe0E4WfS5YRhKiff0X1Nacgw32bOETa9CSsyomz1-DhwEDxhsXegjjfsfTlnM9-a3CJpA8lT_nVOXI81jDD1vlZlMJk_F8uH4nGoIuconWrr-U',
            }}
            style={styles.mapImage}
          >
            <View style={styles.mapPin}>
              <MaterialIcons name="pets" size={18} color="#ffffff" />
            </View>
          </ImageBackground>
          <Text style={styles.mapCaption}>Your location will be shared with the verified seller</Text>
        </View>
        <View style={styles.indicators}>
          <View style={styles.indicatorActive} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Continue to Payment</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#0d1b12" />
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fcf9',
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
    color: '#0d1b12',
    marginRight: 40,
  },
  progressBlock: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  stepTitle: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
    textTransform: 'uppercase',
    color: '#0d1b12',
  },
  stepSubtitle: {
    fontSize: 11,
    color: '#4c9a66',
  },
  stepPercent: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d1b12',
  },
  progressBar: {
    height: 8,
    borderRadius: 999,
    backgroundColor: '#cfe7d7',
    marginTop: 8,
  },
  progressFill: {
    height: 8,
    width: '33%',
    borderRadius: 999,
    backgroundColor: '#2bee6c',
  },
  sectionHeader: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d1b12',
    marginTop: 20,
    marginBottom: 12,
  },
  segmented: {
    flexDirection: 'row',
    backgroundColor: '#e7f3eb',
    borderRadius: 14,
    padding: 4,
    marginBottom: 16,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  segmentText: {
    fontSize: 13,
    color: '#4c9a66',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  segmentTextActive: {
    color: '#0d1b12',
  },
  formGroup: {
    gap: 8,
    marginBottom: 14,
  },
  formGroupHalf: {
    flex: 1,
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#0d1b12',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cfe7d7',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#0d1b12',
  },
  textArea: {
    height: 90,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cfe7d7',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  mapWrapper: {
    marginTop: 12,
  },
  mapImage: {
    height: 160,
    borderRadius: 14,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPin: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2bee6c',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  mapCaption: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 11,
    color: '#4c9a66',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 20,
  },
  indicatorActive: {
    width: 24,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#2bee6c',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#cfe7d7',
  },
  primaryButton: {
    backgroundColor: '#2bee6c',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d1b12',
  },
});

export default ReservationDetailsScreen;
