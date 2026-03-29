import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';

const favorites = [
  {
    id: '1',
    name: 'Bella',
    breed: 'Golden Retriever',
    age: '8 weeks old',
    price: '$1,200',
    time: 'Just now',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJL-V362pRozp8lbnuHhpMJswlcF0B3GNAxDsgbYlTqqGKrcvXlGwXcIPoPNRB18-u0qVAPX3KbUV-dqScNw8EmnjT6SZbx0-x6VtWkE7C0DNL-BExDWkg2N6ON75EoES02n8Lz-rKaN_Cgm647o_TNKmAGjrEiiCKj-AtCzEAScpf0QD18mlGlGBtZVaV2pjmMscDKOg5WPpTGT6UKaitfJHpj5YaCwvZAOz6n1g-Rokf_AQUn52rwDOWtGfmy6ecOz2r6d1zEdM',
    verified: true,
  },
  {
    id: '2',
    name: 'Max',
    breed: 'French Bulldog',
    age: '3 months old',
    price: '$2,500',
    time: '1d ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC82OOSsOu7L23UTMHYc0gMcWBwLA4RI30M5-i_UqDYhc5BJpN_7aaP8eCPibP8CUfev3ppg9-q6kqNT2vYYoDKUXHFKyviIkpgL3LSWfLycg8c8mCs7X7LlE1Sc6ZrY5KR40jGXL5fyUkhLJrf0DqDj7y7hFnP_fO6MxV7I1DwbxhoH1D_mcpnNBWcywhBMCuMSosHZaEwE1so6Uuo2uyzHaOVFAa8KClgB1k1vLqyb-RSv5YsFxKJwbD6W0Fk-mltr6BSj53yWN0',
    verified: false,
  },
  {
    id: '3',
    name: 'Charlie',
    breed: 'Bulldog',
    age: '10 weeks old',
    price: '$1,800',
    time: '3d ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRXPIZwz-RXng-AfCobMwFW3V5IxII4rzODuAlFqZwMbf2kv6KindBQUcOkWpkLnWe9nc0qcLzWCM_BhXphqHV9c750A09IKRLOeguxXpjnM94B7E1-1GfaHFRmnBU0ZAUflsHiySn9azTN8TCoyS72yzVHuxAIYjHBQigvj-2yW442Etj-efKyhRo52qaT3G_KreiOAlO35tWPIO4q2tFmzD5QzKFdHGocDLI9LnFbcpSEs46pJ5CXsB7ajNagx0faR3n6AxC9_0',
    verified: true,
  },
  {
    id: '4',
    name: 'Luna',
    breed: 'Poodle',
    age: '4 months old',
    price: '$950',
    time: '5d ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIwUb56HPyjK7UExe17716vafxQ630cGiKALfUzZ2tyR0ef8LgS2q-p29ba7CcBYe4Qks2FJ7yi0eE_6S5dWNXLD9O96sS23HUu5jAWHNkT1rfu-SdaJnPvwpbLTDjorKV7_e9yed6zqGSQ27OO4b9t025V6I_wpt3CfoS8Qd3IXcTk5ZxXpEsrbJfKkq16JYUGWuw6gQ9s7Zf0t-X1mbPuWXYZUeNVlGIZoupwvxwHcxu-wy-zavUvdlwkEqidbqmBEVCKp6Jp88',
    verified: false,
  },
];

const FavoritesScreen = () => {
  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <AnimatedScreen>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favorites</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={22} color="#64748b" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {favorites.map((pet) => (
          <View key={pet.id} style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: pet.image }} style={styles.image} />
              <TouchableOpacity style={styles.favoriteIcon}>
                <MaterialIcons name="favorite" size={18} color="#19e64d" />
              </TouchableOpacity>
              {pet.verified && (
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="verified" size={12} color="#19e64d" />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.cardName}>{pet.name}</Text>
              <Text style={styles.cardBreed}>{pet.breed}</Text>
              <Text style={styles.cardAge}>{pet.age}</Text>
              <View style={styles.cardFooter}>
                <Text style={styles.cardPrice}>{pet.price}</Text>
                <Text style={styles.cardTime}>{pet.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      </AnimatedScreen>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  imageWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(15,23,42,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  verifiedText: {
    fontSize: 10,
    color: '#ffffff',
    fontFamily: 'Inter_600SemiBold',
  },
  cardBody: {
    paddingTop: 8,
  },
  cardName: {
    fontSize: 14,
    fontFamily: 'Inter_700Bold',
    color: '#0f172a',
  },
  cardBreed: {
    fontSize: 11,
    color: '#64748b',
    fontFamily: 'Inter_500Medium',
    marginTop: 2,
  },
  cardAge: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
  cardFooter: {
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPrice: {
    fontSize: 13,
    fontFamily: 'Inter_700Bold',
    color: '#19e64d',
  },
  cardTime: {
    fontSize: 9,
    color: '#94a3b8',
  },
});

export default FavoritesScreen;
