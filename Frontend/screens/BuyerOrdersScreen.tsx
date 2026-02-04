import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';
import { useNavigation } from '@react-navigation/native';

const BuyerOrdersScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <AnimatedScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back-ios-new" size={18} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="more-horiz" size={20} color="#0f172a" />
          </TouchableOpacity>
        </View>
        <View style={styles.orderCard}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzAtv9YcR0JCFUkwosti-Li9I4zEPQhWQC4iB-bwmAs_DbgDlqm5GPzmjR3QRmZYrFW-9QsgtzKWMhD2niLVXEDZr5hePGn45mCccc_OGoDkMpTONWoHXx-AWcjfn1bpsZE9VmMfHGwoVHjPoG9yJmNles7XH63VW4YJMPocM8z46ClHq4LpdBwqfnKrxtRutMO_-KT7BFpKIgwr5dCFz7lZ9bNQ62CKcITl2xGoAvBKe120MBYxuPFMhvatsTYR2WFG5RfThbz_U',
            }}
            style={styles.orderImage}
          />
          <View style={styles.orderInfo}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.orderName}>Bella</Text>
                <Text style={styles.orderBreed}>Golden Retriever</Text>
              </View>
              <Text style={styles.orderStatus}>In Transit</Text>
            </View>
            <View style={styles.orderIdRow}>
              <Text style={styles.orderIdLabel}>Order ID:</Text>
              <Text style={styles.orderIdValue}>#PET-82931-X</Text>
            </View>
          </View>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Tracking Status</Text>
          <View style={styles.timeline}>
            {[
              { label: 'Order Placed', time: 'Oct 24, 2023 • 10:45 AM', status: 'completed', icon: 'check' },
              { label: 'Payment Confirmed', time: 'Oct 24, 2023 • 11:30 AM', status: 'completed', icon: 'check' },
              { label: 'Out for Delivery', time: 'In transit to your location', status: 'active', icon: 'local-shipping' },
              { label: 'Delivered', time: 'Estimated: Today, 5:00 PM', status: 'pending', icon: 'home' },
            ].map((step, index) => (
              <View key={step.label} style={styles.timelineRow}>
                <View style={styles.timelineLeft}>
                  <View
                    style={[
                      styles.timelineDot,
                      step.status === 'completed' && styles.timelineDotCompleted,
                      step.status === 'active' && styles.timelineDotActive,
                    ]}
                  >
                    <MaterialIcons name={step.icon as any} size={18} color={step.status === 'completed' ? '#ffffff' : step.status === 'active' ? '#19e64d' : '#cbd5f5'} />
                  </View>
                  {index < 3 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[styles.timelineTitle, step.status === 'active' && styles.timelineTitleActive]}>{step.label}</Text>
                  <Text style={[styles.timelineTime, step.status === 'pending' && styles.timelineTimeMuted]}>{step.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.sellerHeader}>
            <Text style={styles.sectionLabel}>Seller Information</Text>
            <View style={styles.verifiedRow}>
              <MaterialIcons name="verified" size={14} color="#19e64d" />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>
          <View style={styles.sellerRow}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzAtv9YcR0JCFUkwosti-Li9I4zEPQhWQC4iB-bwmAs_DbgDlqm5GPzmjR3QRmZYrFW-9QsgtzKWMhD2niLVXEDZr5hePGn45mCccc_OGoDkMpTONWoHXx-AWcjfn1bpsZE9VmMfHGwoVHjPoG9yJmNles7XH63VW4YJMPocM8z46ClHq4LpdBwqfnKrxtRutMO_-KT7BFpKIgwr5dCFz7lZ9bNQ62CKcITl2xGoAvBKe120MBYxuPFMhvatsTYR2WFG5RfThbz_U',
              }}
              style={styles.sellerAvatar}
            />
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>Sunrise Paws Kennel</Text>
              <Text style={styles.sellerLocation}>Addis Ababa, Ethiopia</Text>
            </View>
            <TouchableOpacity style={styles.chatButton}>
              <MaterialIcons name="chat-bubble" size={18} color="#19e64d" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionLabel}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Total Price</Text>
            <Text style={styles.summaryValue}>$1,200.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Deposit Paid</Text>
            <Text style={styles.summaryPaid}>-$300.00</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotal}>Remaining Balance</Text>
            <Text style={styles.summaryTotalValue}>$900.00</Text>
          </View>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.primaryButton}>
            <MaterialIcons name="mail" size={18} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Contact Seller</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <MaterialIcons name="receipt-long" size={18} color="#0f172a" />
            <Text style={styles.secondaryButtonText}>View Receipt</Text>
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
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  orderCard: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    gap: 12,
  },
  orderImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderName: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  orderBreed: {
    fontSize: 12,
    color: '#64748b',
  },
  orderStatus: {
    backgroundColor: 'rgba(59,130,246,0.1)',
    color: '#3b82f6',
    fontSize: 10,
    fontFamily: 'Inter_700Bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    textTransform: 'uppercase',
  },
  orderIdRow: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 6,
  },
  orderIdLabel: {
    fontSize: 11,
    color: '#94a3b8',
  },
  orderIdValue: {
    fontSize: 11,
    color: '#64748b',
    fontFamily: 'Inter_500Medium',
  },
  sectionCard: {
    marginTop: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  sectionLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontFamily: 'Inter_600SemiBold',
    marginBottom: 12,
  },
  timeline: {
    gap: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timelineLeft: {
    alignItems: 'center',
  },
  timelineDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  timelineDotCompleted: {
    backgroundColor: '#19e64d',
    borderColor: '#19e64d',
  },
  timelineDotActive: {
    borderColor: '#19e64d',
    backgroundColor: 'rgba(25,230,77,0.1)',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e2e8f0',
    marginTop: -4,
  },
  timelineContent: {
    flex: 1,
    paddingTop: 6,
  },
  timelineTitle: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  timelineTitleActive: {
    color: '#19e64d',
  },
  timelineTime: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  timelineTimeMuted: {
    color: '#cbd5f5',
  },
  sellerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  verifiedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 11,
    color: '#19e64d',
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  sellerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  sellerLocation: {
    fontSize: 11,
    color: '#94a3b8',
  },
  chatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(25,230,77,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  summaryValue: {
    fontSize: 12,
    color: '#0f172a',
  },
  summaryPaid: {
    fontSize: 12,
    color: '#19e64d',
    fontFamily: 'Inter_700Bold',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  summaryTotal: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  actionRow: {
    marginTop: 16,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#19e64d',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontFamily: 'Inter_700Bold',
    fontSize: 14,
  },
});

export default BuyerOrdersScreen;
