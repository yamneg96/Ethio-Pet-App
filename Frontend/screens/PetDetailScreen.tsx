import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { useNavigation } from '@react-navigation/native';

const PetDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroWrapper}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDITc9c88sQ3P6fBhKVx2HyfTDvPtJ-VmigoQfedtu2-iiI9PgLQJT0oSesU5WSKkEnH3mTzLLxpbWTTOGQbH33Y5ZN8sqxH-4OUeH-HR546y0UNX1WfJGBbLhtI6qwd_MZ9pOnN-orP9V-CmKRXgm5g0rnxl7GJ52Prbu0EgsUUytp_7CnhsfuTL0isUnj_TqXHLB4aC4GSZ8SficYowIE-2Uq-GEdFlqrNhkwih0GIxpjKqW5QA2umtbzbfuklba6PY7FC588frU',
            }}
            style={styles.heroImage}
          >
            <View style={styles.heroOverlay} />
            <View style={styles.heroHeader}>
              <TouchableOpacity style={styles.heroButton} onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={20} color="#ffffff" />
              </TouchableOpacity>
              <View style={styles.heroHeaderRight}>
                <TouchableOpacity style={styles.heroButton}>
                  <MaterialIcons name="share" size={20} color="#ffffff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.heroButton}>
                  <MaterialIcons name="favorite" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>1 / 5</Text>
            </View>
            <View style={styles.heroDots}>
              <View style={styles.dotActive} />
              <View style={styles.dot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </ImageBackground>
        </View>
        <View style={styles.contentCard}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.petName}>Bella</Text>
              <View style={styles.petMetaRow}>
                <Text style={styles.petMeta}>Golden Retriever</Text>
                <View style={styles.dotDivider} />
                <Text style={styles.petPrice}>$1,200</Text>
              </View>
            </View>
            <View style={styles.verifiedPill}>
              <MaterialIcons name="verified" size={14} color="#22c55e" />
              <Text style={styles.verifiedPillText}>Verified</Text>
            </View>
          </View>
          <View style={styles.locationRow}>
            <MaterialIcons name="location-on" size={18} color="#94a3b8" />
            <Text style={styles.locationText}>San Francisco, CA</Text>
          </View>
          <View style={styles.statsGrid}>
            {[
              { label: 'Age', value: '8 Weeks', icon: 'cake', color: '#d47311' },
              { label: 'Gender', value: 'Female', icon: 'female', color: '#ec4899' },
              { label: 'Weight', value: '12 lbs', icon: 'monitor-weight', color: '#3b82f6' },
              { label: 'Health', value: 'Vaccinated', icon: 'medical-services', color: '#22c55e' },
            ].map((item) => (
              <View key={item.label} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${item.color}20` }]}
                >
                  <MaterialIcons name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={styles.statLabel}>{item.label}</Text>
                <Text style={styles.statValue}>{item.value}</Text>
              </View>
            ))}
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Bella</Text>
            <Text style={styles.sectionBody}>
              Bella is a playful and affectionate puppy looking for her forever home. She loves fetch, tummy rubs, and exploring the outdoors. She has been socialized with kids and other pets, making her the perfect addition to a loving family.
              <Text style={styles.readMore}> Read more</Text>
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Seller Info</Text>
            <View style={styles.sellerCard}>
              <ImageBackground
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUTj6hAWd6ioTA2ZZVaaFIcR9yOKVy0gm95NPTtrOI4Bhm2YC9p9meb7a5SUyVFtiu8PtBZ7RgPRIwqSSc1W31JP1DRoat2q5fV5wFVskzJzZQvQPkO2hYjKYC_G3vkwEL8kFcmP1MudO2zWVMcDZ8xilQxEHPaTYMITfoGMOa8wQEXGU859DfqYXysm9rzStmvdSnAw2TUPP24mHRbDoOoRKKLzj8mO2_NjtnTvOF86JvCnhpSF1jakw1CiZM3fEM4IOZf_lTd9Y',
                }}
                style={styles.sellerAvatar}
              >
                <View style={styles.sellerVerifiedIcon}>
                  <MaterialIcons name="verified" size={16} color="#3b82f6" />
                </View>
              </ImageBackground>
              <View style={styles.sellerInfo}>
                <Text style={styles.sellerName}>Paws & Love Kennel</Text>
                <Text style={styles.sellerMeta}>Verified Breeder • 3 years active</Text>
                <View style={styles.ratingRow}>
                  <MaterialIcons name="star" size={16} color="#fbbf24" />
                  <Text style={styles.ratingValue}>4.9</Text>
                  <Text style={styles.ratingCount}>(120 reviews)</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.chatButton}>
                <MaterialIcons name="chat-bubble" size={18} color="#0f172a" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total Price</Text>
          <Text style={styles.bottomPrice}>$1,200</Text>
        </View>
        <TouchableOpacity style={styles.reserveButton}>
          <Text style={styles.reserveText}>Reserve Bella</Text>
          <MaterialIcons name="pets" size={18} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f7f6',
  },
  scrollContent: {
    paddingBottom: 120,
  },
  heroWrapper: {
    width: '100%',
    aspectRatio: 4 / 5,
  },
  heroImage: {
    flex: 1,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  heroHeader: {
    position: 'absolute',
    top: 12,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroHeaderRight: {
    flexDirection: 'row',
    gap: 12,
  },
  heroButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  heroBadgeText: {
    fontSize: 11,
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  heroDots: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  dotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
  },
  contentCard: {
    marginTop: -20,
    backgroundColor: '#f8f7f6',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  petName: {
    fontSize: 28,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  petMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  petMeta: {
    fontSize: 14,
    color: '#94a3b8',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  dotDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#cbd5f5',
  },
  petPrice: {
    fontSize: 14,
    color: '#d47311',
    fontFamily: 'PlusJakartaSans_700Bold',
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#dcfce7',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  verifiedPillText: {
    fontSize: 11,
    color: '#15803d',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  locationText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
  },
  statValue: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  sectionBody: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 20,
  },
  readMore: {
    color: '#d47311',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  sellerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  sellerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  sellerVerifiedIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 14,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  sellerMeta: {
    fontSize: 11,
    color: '#94a3b8',
    marginVertical: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingValue: {
    fontSize: 12,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  ratingCount: {
    fontSize: 12,
    color: '#94a3b8',
  },
  chatButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bottomLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#94a3b8',
  },
  bottomPrice: {
    fontSize: 22,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  reserveButton: {
    flex: 1,
    backgroundColor: '#d47311',
    borderRadius: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  reserveText: {
    color: '#ffffff',
    fontFamily: 'PlusJakartaSans_700Bold',
    fontSize: 14,
  },
});

export default PetDetailScreen;
