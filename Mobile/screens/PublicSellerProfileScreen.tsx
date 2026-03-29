import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';
import { useNavigation } from '@react-navigation/native';

const listings = [
  {
    id: '1',
    name: 'Buddy',
    detail: 'Golden Retriever • 8 wks',
    price: '$1,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDROEH4_BNpDJA6UctidMVjxmXTLs_bzeVhJFDxgcz20z1COY31poHYX74pOMKWzGT8340zGT-AL0U9N8teMqk-2xWbqjlcZVM5ZkpnWowPaaSlRKnkRh7hA_rzFaionZ8OFCtPpER6iWQ9LvPNSg5y6be9SpbFu8BAUVXfGraR_Ld3_TTMq_sxxHnkBiSB6036EH74HvwdUzQR4KnXGkLi7poPnw0C3x51mRhHpa8Zx6JQXK6FCsRm_2x9tW3TwNd12EZqiNcJ1Qk',
  },
  {
    id: '2',
    name: 'Bella',
    detail: 'Golden Retriever • 9 wks',
    price: '$1,200',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3YQqjWJumY7BpV_aKNPsV0eIQDmxjtP3iFxKmdEulpUNL-YtVq1oz6A0vY8ymibumRSWlAikm7tYP6Ao4D8FWITP_ZMhLw0_p4DB86gfDbCx4NotazoEx8MyuokuAzAQZdnnAWR7u5_TlK6o8EdH542isqhUqKUHn1FLk17jV-C8re_8LXa1nF7Rl_Fyo6FbnYiHBImQLLUONsQljgySjYAD2BhdINuFgd9PILFDaP-JR5XK0Kb4z1gjmun3AxC39CfKTXfQPjjg',
  },
  {
    id: '3',
    name: 'Charlie',
    detail: 'Golden Retriever • 8 wks',
    price: '$1,150',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjnw7zlTVftsD1xcwy-HyE8dgcTtoF6Zp8S18LbIJQu_zvQpYLlCCXymAqz-YnMEgSlCAFXOQwGtSMdHLicHdwkuWmJHtnqr6L0IGmy0dYfWmFzPpAiJt0AZYHK84TwDBmDD3mFqUEMfjMDSt1IwAUlq00e799e0PCAyoif7XYBdCNFDgVtcjLFh4jnLL2bJR91IjfKVJMqeKBN6j0JIT0LaqmhdGm8C40mbuFLJa_uqesv0kppL4xNJ1iNk9iKGUFF60JTG2umVY',
  },
];

const reviews = [
  {
    id: '1',
    name: 'Michael R.',
    text: '"Sarah was amazing to work with! We love our new puppy. The process was so smooth and professional."',
    time: '2 days ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSSK-M7ja0WdOC4YiwD_ckCrOU2c3-x1MOdrOyDD9TgvFwfjkBd6NCpQqr43WJ5NHnSJZgNm4w17NYgAsLsySOhw6gGyQpLWv4euaYGnABlFN5LMIIzHAWxvFpR07VDHdz9TA7513n4xTB6sgSJAXkCN5mLU_TMf0iijUGO5B4ccmtxezBz6qjnPUHBYiGwSHpPqGizYTvH5VC8zPUAJL-c1tOAzjVs88JEAEQL8RTkOZZSpOBirvqk0mv3F8nch8HNFJwzlalaz4',
  },
  {
    id: '2',
    name: 'Jenny K.',
    text: '"Beautiful dogs and very knowledgeable breeder. Highly recommend checking them out."',
    time: '1 week ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTTwELDJ4KQqS3NMieXdJX6uDIWtbSaTUQ_TTUOwZwFklBvCj7HR8XvN0oEeVRLesGmY7GXhv2TYGp5PRY4b1lmackdm-26gol-SSEiYJ2k7-JxIG9DmCkhYeQvfI2ree0ITSiPGM4EQ9v78ZwJLB50dOawUK-rkcx6FmJMFVNcinXZE4Wi7StMWdLkHaLK6uFLDYxQ8kybrkYBqma-7MVMPPbQkbzDI9xsfhwb9pZvzlDxbfV6wg8goFEWG_TyCSzUAvDIUr1Res',
  },
];

const PublicSellerProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <AnimatedScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={20} color="#0d1b19" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Seller Profile</Text>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="ios-share" size={20} color="#0d1b19" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileBlock}>
          <View style={styles.profileImageWrapper}>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEjDt9emJIeHjBhQB0mJs9erl2Jx35jK1E8ufupyckM9kY8YeujgqCzenUB7LjNjd-zU7KXAqVf4lNzSXAOFM2B8oKy1YALgcKwn8dO5pk1ka6Acn5w-lewoB_IeK5e6QX7Qsx2SGHHezgwtl-wsptCRBQR6zOGXCN8HZgvLrMzAkUTPQw6GeC885zmGCfyp1bxsE_rHOx_NBNp89Bw6K1HuPAvZGz94hXMdYXwR25d9QLHDfgeMqOgSauqBftPw0p5DMRSdt1V0I',
              }}
              style={styles.profileImage}
            />
            <View style={styles.profileBadge}>
              <MaterialIcons name="verified-user" size={16} color="#0d1b19" />
            </View>
          </View>
          <Text style={styles.profileName}>Sarah's Golden Retrievers</Text>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={16} color="#4c9a8d" />
            <Text style={styles.locationText}>San Francisco, CA</Text>
          </View>
          <View style={styles.verifiedPill}>
            <Text style={styles.verifiedText}>Verified Seller</Text>
          </View>
        </View>
        <View style={styles.statsRow}>
          {[
            { value: '5 Yrs', label: 'On Platform' },
            { value: '1 hr', label: 'Reply Time' },
            { value: '4.9', label: 'Rating' },
          ].map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionTitle}>About Sarah</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            Passionate breeder focused on health and temperament. All puppies are raised in our home with love and socialization. We specialize in English Cream Golden Retrievers and have been connecting families with their furry best friends since 2019.
          </Text>
        </View>
        <View style={styles.listingHeader}>
          <Text style={styles.sectionTitle}>Active Listings</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>See all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.listingRow}>
          {listings.map((item) => (
            <View key={item.id} style={styles.listingCard}>
              <ImageBackground source={{ uri: item.image }} style={styles.listingImage}>
                <View style={styles.listingFavorite}>
                  <MaterialIcons name="favorite" size={14} color="#ffffff" />
                </View>
              </ImageBackground>
              <Text style={styles.listingName}>{item.name}</Text>
              <Text style={styles.listingDetail}>{item.detail}</Text>
              <Text style={styles.listingPrice}>{item.price}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>Recent Reviews</Text>
        <View style={styles.reviewList}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.reviewUser}>
                  <ImageBackground source={{ uri: review.image }} style={styles.reviewAvatar} />
                  <Text style={styles.reviewName}>{review.name}</Text>
                </View>
                <View style={styles.reviewStars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <MaterialIcons key={star} name={star === 5 && review.id === '2' ? 'star-half' : 'star'} size={14} color="#f59e0b" />
                  ))}
                </View>
              </View>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Text style={styles.reviewTime}>{review.time}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.readAllButton}>
          <Text style={styles.readAllText}>Read all 24 reviews</Text>
        </TouchableOpacity>
        <View style={{ height: 80 }} />
      </ScrollView>
      <View style={styles.floatingButton}>
        <TouchableOpacity style={styles.messageButton}>
          <MaterialIcons name="chat-bubble" size={18} color="#0d1b19" />
          <Text style={styles.messageButtonText}>Message Sarah</Text>
        </TouchableOpacity>
      </View>
      </AnimatedScreen>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8f8' },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
  iconButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: '#0d1b19' },
  profileBlock: { alignItems: 'center', marginTop: 8 },
  profileImageWrapper: { position: 'relative' },
  profileImage: { width: 112, height: 112, borderRadius: 56, borderWidth: 4, borderColor: '#ffffff', overflow: 'hidden' },
  profileBadge: { position: 'absolute', bottom: 0, right: 0, width: 26, height: 26, borderRadius: 13, backgroundColor: '#13ecc8', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#ffffff' },
  profileName: { fontSize: 20, fontFamily: 'PlusJakartaSans_700Bold', color: '#0d1b19', marginTop: 12 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  locationText: { fontSize: 12, color: '#4c9a8d' },
  verifiedPill: { marginTop: 6, backgroundColor: 'rgba(19,236,200,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  verifiedText: { fontSize: 10, color: '#13ecc8', fontFamily: 'PlusJakartaSans_700Bold', textTransform: 'uppercase', letterSpacing: 1 },
  statsRow: { marginTop: 16, flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: '#ffffff', borderRadius: 16, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#e2e8f0' },
  statValue: { fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: '#0d1b19' },
  statLabel: { fontSize: 9, color: '#4c9a8d', textTransform: 'uppercase', marginTop: 4, letterSpacing: 1 },
  sectionTitle: { marginTop: 20, fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: '#0d1b19' },
  aboutCard: { marginTop: 8, backgroundColor: '#ffffff', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: '#e2e8f0' },
  aboutText: { fontSize: 12, color: '#4c9a8d', lineHeight: 18 },
  listingHeader: { marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  linkText: { fontSize: 12, color: '#13ecc8', fontFamily: 'PlusJakartaSans_700Bold' },
  listingRow: { paddingVertical: 12, gap: 12 },
  listingCard: { width: 200, backgroundColor: '#ffffff', borderRadius: 16, padding: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  listingImage: { height: 120, borderRadius: 12, overflow: 'hidden', marginBottom: 8 },
  listingFavorite: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.3)', padding: 4, borderRadius: 12 },
  listingName: { fontSize: 14, fontFamily: 'PlusJakartaSans_700Bold', color: '#0d1b19' },
  listingDetail: { fontSize: 11, color: '#4c9a8d', marginTop: 2 },
  listingPrice: { fontSize: 14, fontFamily: 'PlusJakartaSans_700Bold', color: '#13ecc8', marginTop: 6 },
  reviewList: { marginTop: 12, gap: 12 },
  reviewCard: { backgroundColor: '#ffffff', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  reviewUser: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  reviewAvatar: { width: 32, height: 32, borderRadius: 16, overflow: 'hidden' },
  reviewName: { fontSize: 12, fontFamily: 'PlusJakartaSans_700Bold', color: '#0d1b19' },
  reviewStars: { flexDirection: 'row', gap: 2 },
  reviewText: { fontSize: 12, color: '#4c9a8d', fontStyle: 'italic' },
  reviewTime: { fontSize: 10, color: '#94a3b8', marginTop: 6 },
  readAllButton: { marginTop: 12, backgroundColor: '#f1f5f9', borderRadius: 14, paddingVertical: 12, alignItems: 'center' },
  readAllText: { fontSize: 12, color: '#4c9a8d', fontFamily: 'PlusJakartaSans_600SemiBold' },
  floatingButton: { position: 'absolute', left: 16, right: 16, bottom: 16 },
  messageButton: { backgroundColor: '#13ecc8', borderRadius: 14, paddingVertical: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  messageButtonText: { fontSize: 16, fontFamily: 'PlusJakartaSans_700Bold', color: '#0d1b19' },
});

export default PublicSellerProfileScreen;
