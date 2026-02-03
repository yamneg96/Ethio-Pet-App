import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';

const featuredPets = [
  {
    id: '1',
    name: 'Bailey',
    breed: 'Golden Retriever',
    age: '3 months',
    gender: 'Female',
    weight: '5.2 kg',
    distance: '2.5 km',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBgU9XUqeR9Ev7PUCvd9kLnisANrVIuR9ex_LoUDWZ0X9BwDtGXlQKNwiu4RMPz5gjcrfY9DzVPeo6Pr8hq07nFjbxPiECeoCEX3AWkImeCPTxXS8DMANTTVGd7dFJYa4HxbJ30aO2bwHs66WXtF8deUY24TKYJBrysy8sPmD6HUR1wEivpMaWFaxFjuWvlsi7AvTGh96IH6vabyy5v3g29mImbzXfQbbuwMkU6qrWZjq5mHaBA9bFU7Bu_PZFPtPDaOKStTHZ0uvo',
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'British Shorthair',
    age: '9 weeks',
    gender: 'Female',
    weight: '1.8 kg',
    distance: '4.1 km',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqvWANO98mJZwl43g89LfGUQkEWxnsApp-txrColl2r8XnCp8bSBdid3xEXDemJyM1M81Xdj_odABfVF8ekogodDLcXX3U0IUEO0A5aNsWars3ulvBa_j-9Ye1Cd0jN5NOzabuECC7gGHm2I9egWbRb6-TWgN2l9JlgjcYVAQunhQVKjO77EMuwqMdSbnp-LAMlgY2RbA5yAft4_wtJTugUZ5wu9uMBsXx47nFujWkvleuBmaKFp8-UEvf7Is6aaQH_p7Ivb6DUxc',
  },
];

const categories = [
  { id: 'all', label: 'All', icon: 'pets', active: true },
  { id: 'dogs', label: 'Dogs', icon: 'pets', active: false },
  { id: 'cats', label: 'Cats', icon: 'cruelty-free', active: false },
  { id: 'birds', label: 'Birds', icon: 'flutter-dash', active: false },
  { id: 'small', label: 'Small', icon: 'pest-control-rodent', active: false },
];

const HomeScreen = () => {
  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <View style={styles.profileRow}>
          <View style={styles.avatarWrapper}>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZKLs_jPcFO8x5X9h8Ec_AmjvyhIhaxMSeZVv8HBttNMd6q2crfUcPAywGvmm4DExxZOHB-2swtdw5jdouuaadm8nCtMs0EwuqoEOi1EuLR4CjF81j951uPU36O22Ml4wUznKpgMbGCDwqEU9AIz60n41dSpBSmEA-VCVSGeCFzyl7KHuC1QujSa4h_G3WRy2GaiV-PXkhSfYCLftCem9Bb_OPszBoev_5_ZorjZcVPP2vY9Fzlu80r0zFVQFhZDY49BwongI69vM',
              }}
              style={styles.avatar}
            />
            <View style={styles.statusDot} />
          </View>
          <View>
            <Text style={styles.welcomeText}>Welcome back</Text>
            <Text style={styles.userName}>Alex Morgan</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="notifications" size={22} color="#0d1b0d" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.heroTitle}>
          Find your new{`\n`}
          <Text style={styles.heroAccent}>best friend</Text> 🐾
        </Text>
        <Text style={styles.heroSubtitle}>Adopt a pet from verified sellers.</Text>
        <View style={styles.searchWrapper}>
          <MaterialIcons name="search" size={22} color="#6b7280" />
          <TextInput
            placeholder="Search breed, name, or shelter..."
            placeholderTextColor="#9ca3af"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="tune" size={18} color="#0d1b0d" />
          </TouchableOpacity>
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {categories.map((item) => (
            <TouchableOpacity key={item.id} style={styles.categoryItem}>
              <View style={[styles.categoryIcon, item.active ? styles.categoryIconActive : styles.categoryIconInactive]}>
                <MaterialIcons name={item.icon as any} size={30} color={item.active ? '#0d1b0d' : '#6b7280'} />
              </View>
              <Text style={[styles.categoryLabel, item.active && styles.categoryLabelActive]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Pets</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>See All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.featuredList}>
          {featuredPets.map((pet) => (
            <View key={pet.id} style={styles.card}>
              <View style={styles.cardImageWrapper}>
                <ImageBackground source={{ uri: pet.image }} style={styles.cardImage}>
                  <View style={styles.cardOverlay} />
                  <View style={styles.verifiedBadge}>
                    <MaterialIcons name="verified" size={16} color="#13ec13" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                  <TouchableOpacity style={styles.favoriteButton}>
                    <MaterialIcons name="favorite-border" size={18} color="#ffffff" />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petBreed}>{pet.breed}</Text>
                  </View>
                  <View style={styles.ageBadge}>
                    <Text style={styles.ageText}>{pet.age}</Text>
                  </View>
                </View>
                <View style={styles.petMeta}>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="female" size={18} color="#6b7280" />
                    <Text style={styles.metaText}>{pet.gender}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <MaterialIcons name="monitor-weight" size={18} color="#6b7280" />
                    <Text style={styles.metaText}>{pet.weight}</Text>
                  </View>
                  <View style={styles.metaItemRight}>
                    <MaterialIcons name="location-on" size={18} color="#f87171" />
                    <Text style={styles.metaText}>{pet.distance}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statusDot: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#13ec13',
    borderWidth: 2,
    borderColor: '#f6f8f6',
    bottom: 0,
    right: 0,
  },
  welcomeText: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: '#4a5b4a',
  },
  userName: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d1b0d',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d1b0d',
    marginTop: 16,
  },
  heroAccent: {
    color: '#13ec13',
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#4a5b4a',
    fontFamily: 'PlusJakartaSans_500Medium',
    marginTop: 6,
    marginBottom: 16,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_500Medium',
    color: '#0d1b0d',
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: '#13ec13',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    marginTop: 24,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d1b0d',
  },
  linkText: {
    fontSize: 13,
    color: '#13ec13',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  categoryRow: {
    paddingRight: 20,
    gap: 16,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryIconActive: {
    backgroundColor: '#13ec13',
  },
  categoryIconInactive: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  categoryLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontFamily: 'PlusJakartaSans_600SemiBold',
    marginTop: 8,
  },
  categoryLabelActive: {
    color: '#13ec13',
  },
  featuredList: {
    gap: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 32,
    padding: 12,
  },
  cardImageWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardImage: {
    height: 240,
    justifyContent: 'space-between',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d1b0d',
    textTransform: 'uppercase',
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingHorizontal: 8,
    paddingTop: 12,
    paddingBottom: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  petName: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0d1b0d',
  },
  petBreed: {
    fontSize: 14,
    color: '#4a5b4a',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  ageBadge: {
    backgroundColor: 'rgba(19,236,19,0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },
  ageText: {
    fontSize: 12,
    color: '#16a34a',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  petMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 'auto',
  },
  metaText: {
    fontSize: 12,
    color: '#4a5b4a',
    fontFamily: 'PlusJakartaSans_500Medium',
  },
});

export default HomeScreen;
