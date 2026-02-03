import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/authStore';

const BuyerProfileScreen = () => {
  const navigation = useNavigation();
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="arrow-back" size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileBlock}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCzAtv9YcR0JCFUkwosti-Li9I4zEPQhWQC4iB-bwmAs_DbgDlqm5GPzmjR3QRmZYrFW-9QsgtzKWMhD2niLVXEDZr5hePGn45mCccc_OGoDkMpTONWoHXx-AWcjfn1bpsZE9VmMfHGwoVHjPoG9yJmNles7XH63VW4YJMPocM8z46ClHq4LpdBwqfnKrxtRutMO_-KT7BFpKIgwr5dCFz7lZ9bNQ62CKcITl2xGoAvBKe120MBYxuPFMhvatsTYR2WFG5RfThbz_U',
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <MaterialIcons name="photo-camera" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>Johan Doe</Text>
          <Text style={styles.phone}>+251 91 123 4567</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Verified Buyer</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Reservations</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Favorites</Text>
          </View>
        </View>
        <Text style={styles.sectionLabel}>Account</Text>
        <View style={styles.menuList}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('BuyerOrders' as never)}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="shopping-bag" size={20} color="#19e64d" />
              </View>
              <Text style={styles.menuText}>My Orders</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#cbd5f5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="calendar-month" size={20} color="#19e64d" />
              </View>
              <Text style={styles.menuText}>My Reservations</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#cbd5f5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="favorite" size={20} color="#19e64d" />
              </View>
              <Text style={styles.menuText}>Favorite Pets</Text>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#cbd5f5" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.menuIcon}>
                <MaterialIcons name="credit-card" size={20} color="#19e64d" />
              </View>
              <View>
                <Text style={styles.menuText}>Payment Methods</Text>
                <Text style={styles.menuSubText}>Visa ending in 4242</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={22} color="#cbd5f5" />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionLabel}>Language Settings</Text>
        <View style={styles.languageCard}>
          {['English', 'Amharic', 'Oromic'].map((lang, index) => (
            <View key={lang} style={[styles.languageRow, index !== 2 && styles.languageDivider]}>
              <View>
                <Text style={styles.languageTitle}>{lang}</Text>
                <Text style={styles.languageSubtitle}>{lang === 'English' ? 'English' : lang === 'Amharic' ? 'አማርኛ' : 'Afaan Oromoo'}</Text>
              </View>
              <View style={styles.radio}>
                {index === 0 && <View style={styles.radioActive} />}
              </View>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            setAuthenticated(false);
            navigation.navigate('Login' as never);
          }}
        >
          <MaterialIcons name="logout" size={20} color="#ef4444" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  editText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#19e64d',
  },
  profileBlock: {
    alignItems: 'center',
    marginTop: 8,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#19e64d',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
    marginTop: 12,
  },
  phone: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  badge: {
    marginTop: 8,
    backgroundColor: 'rgba(25,230,77,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: 'Inter_600SemiBold',
    color: '#19e64d',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sectionLabel: {
    marginTop: 24,
    fontSize: 11,
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  menuList: {
    marginTop: 10,
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'rgba(25,230,77,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#0f172a',
  },
  menuSubText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  languageCard: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  languageRow: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  languageDivider: {
    borderBottomWidth: 1,
    borderColor: '#e2e8f0',
  },
  languageTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#0f172a',
  },
  languageSubtitle: {
    fontSize: 11,
    color: '#94a3b8',
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#cbd5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#19e64d',
  },
  logoutButton: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  logoutText: {
    color: '#ef4444',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  },
});

export default BuyerProfileScreen;
