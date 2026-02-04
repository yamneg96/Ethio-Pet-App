import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';
import { listPets } from '../services/pets';

const filters = ['All', 'Dogs', 'Cats', 'Small Pets', 'Location'];

const listings = [
  {
    id: '1',
    name: 'Bella',
    price: '$1,200',
    breed: 'Golden Retriever',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBbVmoHYzA6yWKxztoimeU2i5gQglucZiDRauSuSoQmd3dzGsBvqQA9xS6FyTwulpCcNfuG0Et5itwp1J3Woa5Sj90d_8PcxLPbv4_Vf1lgAk696svqnlajhTv-yz0TWiqXbs65VLYTSyMAeHsabOuD-6EeggL-1Lj7NsOkzvn4QxZAR8CCd0ZW57pYPcQRKV2B6i4Z3ebgMP0GnasxIvg7tgMrDaLFUnHL_oXNztyn84OBxAxjw9yoxKiqLBg-DeY9CQg22sI7-lI',
  },
  {
    id: '2',
    name: 'Luna',
    price: '$850',
    breed: 'Siamese',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAH_wVM_miMizzJyH9DtJzN-AjllhT-jjAiqQAVIsS9smQIShMgzo7_83qGhvO3_mA3vBUS4iwDSsqFzmNKfo1JTL9Ubh_ks3LEwI9p1QK0hP2xJbbjD-nR4kPUHtLybGr8KzxyFrtgBsoUxBJNyF4JLn3oGSwDrUmwGRh9p00MawLmBQUbvo_64qLHKZ-q60h0JPxLZDd7rWav14BUiv8lULnWVXpRqk0qGYVXvY9OMVbA0LzhbNv4nlPiQwbqI-gr6j72mW0t46U',
  },
  {
    id: '3',
    name: 'Max',
    price: '$1,500',
    breed: 'Pembroke Corgi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDdOxW7m_baqMZ-EaIhcbMdyRDGU5cLnYPHCymuropkm-yG9xEDp91LAJ1eio2rB8Zxr3X1U9p6wqByHB1gFDyFenF1ic_dFCx5KG7bfZQcBmwq0EVPNCmdmrksCk1TmZ1hEVoLJGeR2hbFlWySuMAGGNMyL5K_zWDC3oww7oJa2iQSLS72YaDDN5uJxpu2xs115mNOaCnVfkKGjftCxjM0sRjBUhTysXkM70k8N354GHvO_1fmJ8x7rZKCJgSwzhUV5ih7o8hpdeA',
  },
  {
    id: '4',
    name: 'Rio',
    price: '$600',
    breed: 'Tabby Cat',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC57akiqNfnO8iMyApshL3yotQP_AAqYO32DPy6nPip20sVo7usQkvN1M5_5zvuwNNfK9sB-oV94928QOs086vXjn38LMIe6Z_7YFowIMtfKsqanmQ8ZTMgd-iBG64sHbVtsjGqLAis63Zj3IiIbJ0UuOJcJujzNTvGhUuPWBk14uURoz0DznZK1oHyTBCP1VYQtCpyqas2VAkPk7WUo8FZxR2c_mARaWl3Cdh891_NDDFjNsgvqpL8hyFtGqV7fgz7VGrvWa9I6NQ',
  },
];

const ExploreScreen = () => {
  const [items, setItems] = useState(listings);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listPets({ limit: 12 });
        const mapped = data.map((pet) => ({
          id: pet.id,
          name: pet.name,
          breed: pet.breed,
          price: `$${pet.price}`,
          image: pet.images?.find((img) => img.isPrimary)?.url || pet.images?.[0]?.url || listings[0].image,
        }));
        if (mapped.length) setItems(mapped);
      } catch {
      }
    };
    load();
  }, []);

  const data = useMemo(() => items, [items]);
  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore</Text>
        <TouchableOpacity style={styles.langButton}>
          <MaterialIcons name="language" size={20} color="#0f172a" />
        </TouchableOpacity>
      </View>
      <View style={styles.searchWrapper}>
        <MaterialIcons name="search" size={22} color="#9ca3af" />
        <TextInput placeholder="Search by breed, name..." placeholderTextColor="#9ca3af" style={styles.searchInput} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {filters.map((filter, index) => (
          <TouchableOpacity key={filter} style={[styles.filterChip, index === 0 && styles.filterChipActive]}>
            <Text style={[styles.filterText, index === 0 && styles.filterTextActive]}>{filter}</Text>
            {filter === 'Location' && <MaterialIcons name="expand-more" size={18} color="#6b7280" />}
          </TouchableOpacity>
        ))}
      </ScrollView>
        <AnimatedScreen>
      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {data.map((pet) => (
          <View key={pet.id} style={styles.card}>
            <View style={styles.cardImageWrapper}>
              <ImageBackground source={{ uri: pet.image }} style={styles.cardImage}>
                <TouchableOpacity style={styles.favoriteButton}>
                  <MaterialIcons name="favorite" size={16} color="#ffffff" />
                </TouchableOpacity>
              </ImageBackground>
            </View>
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardName}>{pet.name}</Text>
                <Text style={styles.cardPrice}>{pet.price}</Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.cardBreed}>{pet.breed}</Text>
                <View style={styles.verifiedBadge}>
                  <MaterialIcons name="verified" size={14} color="#19e64d" />
                </View>
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
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#0f172a',
  },
  langButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    marginHorizontal: 20,
    marginTop: 8,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#0f172a',
  },
  filterRow: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 999,
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  filterChipActive: {
    backgroundColor: '#19e64d',
  },
  filterText: {
    fontSize: 13,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#334155',
  },
  filterTextActive: {
    color: '#ffffff',
  },
  grid: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 10,
  },
  cardImageWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    aspectRatio: 4 / 5,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 8,
  },
  favoriteButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    paddingTop: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  cardPrice: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_800ExtraBold',
    color: '#19e64d',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  cardBreed: {
    fontSize: 11,
    fontFamily: 'PlusJakartaSans_600SemiBold',
    color: '#6b7280',
    flex: 1,
  },
  verifiedBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(25,230,77,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ExploreScreen;
