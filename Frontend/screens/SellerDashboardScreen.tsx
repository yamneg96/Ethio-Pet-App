import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { AnimatedScreen } from '../components/AnimatedScreen';

const SellerDashboardScreen = () => {
  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <AnimatedScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <View style={styles.avatarWrapper}>
              <ImageBackground
                source={{
                  uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqwJwTFGEtzy9XKDClyDM_l0WCq5EpmHuDyKMsi59EONuSHrqV3zm_IvfhvFPZGSDSOna5i_5CUULNirpNZovrQ116ECmaGlDxtrS1qTjfVmOWZ79AzYAVJ1jL32mJVbxNG4NTYvyNgUzrkMLDaax3IhOcBshbTTnGX1-jNp34wId8o4iU7450PyL46iYra3OVH3W8bBgE4or7G64l_2L6uFkH_mrVBi2LVigKkDlwrjKpFsv7FfkqLp1InR3tziEuJPnfPAF9vLU',
                }}
                style={styles.avatar}
              />
              <View style={styles.statusDot} />
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <MaterialIcons name="notifications" size={20} color="#0e1b11" />
          </TouchableOpacity>
        </View>
        <Text style={styles.dashboardTitle}>Dashboard</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsRow}>
          {[
            { label: 'Active Listings', value: '12', sub: '+2 this week', icon: 'pets', color: '#19e64d' },
            { label: 'Pending', value: '3', sub: 'waiting action', icon: 'hourglass-top', color: '#3b82f6' },
            { label: 'New Inquiries', value: '8', sub: '+5 new', icon: 'chat-bubble', color: '#f59e0b' },
          ].map((item) => (
            <View key={item.label} style={styles.statCard}>
              <View style={[styles.statIcon, { backgroundColor: `${item.color}20` }]}
              >
                <MaterialIcons name={item.icon as any} size={18} color={item.color} />
              </View>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
              <View style={styles.statSubRow}>
                <MaterialIcons name={item.sub.includes('+') ? 'trending-up' : 'info'} size={14} color={item.color} />
                <Text style={[styles.statSubText, { color: item.color }]}>{item.sub}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity>
            <Text style={styles.sectionLink}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.timeline}>
          {[
            {
              title: 'Reservation Confirmed',
              time: '10:30 AM',
              description: 'Golden Retriever Puppy reserved by Sarah M. Deposit received.',
              icon: 'check',
              color: '#19e64d',
            },
            {
              title: 'New Inquiry',
              time: 'Yesterday',
              description: 'Michael sent a question about the French Bulldog litter availability.',
              icon: 'chat',
              color: '#3b82f6',
            },
            {
              title: 'Vaccination Updated',
              time: 'Yesterday',
              description: 'Vaccination record updated for Max (ID: #8821).',
              icon: 'vaccines',
              color: '#94a3b8',
            },
          ].map((item, index) => (
            <View key={item.title} style={styles.timelineRow}>
              <View style={styles.timelineLeft}>
                <View style={[styles.timelineDot, { backgroundColor: `${item.color}20`, borderColor: item.color }]}
                >
                  <MaterialIcons name={item.icon as any} size={16} color={item.color} />
                </View>
                {index < 2 && <View style={styles.timelineLine} />}
              </View>
              <View style={styles.timelineContent}>
                <View style={styles.timelineHeader}>
                  <Text style={styles.timelineTitle}>{item.title}</Text>
                  <Text style={styles.timelineTime}>{item.time}</Text>
                </View>
                <Text style={styles.timelineDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{ height: 120 }} />
      </ScrollView>
      <View style={styles.fab}>
        <TouchableOpacity style={styles.fabButton}>
          <MaterialIcons name="add" size={24} color="#0e1b11" />
          <Text style={styles.fabText}>Add Pet</Text>
        </TouchableOpacity>
      </View>
      </AnimatedScreen>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fcf9' },
  content: { paddingHorizontal: 16, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#ffffff' },
  statusDot: { position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderRadius: 5, backgroundColor: '#19e64d', borderWidth: 2, borderColor: '#ffffff' },
  notificationButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' },
  dashboardTitle: { fontSize: 28, fontFamily: 'Inter_700Bold', color: '#0e1b11', marginTop: 12 },
  statsRow: { paddingVertical: 16, gap: 12 },
  statCard: { width: 160, backgroundColor: '#ffffff', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  statIcon: { width: 32, height: 32, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  statLabel: { fontSize: 12, color: '#5c6f60' },
  statValue: { fontSize: 24, fontFamily: 'Inter_700Bold', color: '#0e1b11', marginTop: 4 },
  statSubRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  statSubText: { fontSize: 11, fontFamily: 'Inter_600SemiBold' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 },
  sectionTitle: { fontSize: 18, fontFamily: 'Inter_700Bold', color: '#0e1b11' },
  sectionLink: { fontSize: 12, color: '#19e64d', fontFamily: 'Inter_600SemiBold' },
  timeline: { marginTop: 12, gap: 16 },
  timelineRow: { flexDirection: 'row', gap: 12 },
  timelineLeft: { alignItems: 'center' },
  timelineDot: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff' },
  timelineLine: { width: 2, flex: 1, backgroundColor: '#d0e7d6', marginTop: -2 },
  timelineContent: { flex: 1 },
  timelineHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  timelineTitle: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#0e1b11' },
  timelineTime: { fontSize: 10, color: '#5c6f60' },
  timelineDescription: { fontSize: 12, color: '#5c6f60', marginTop: 4 },
  fab: { position: 'absolute', right: 16, bottom: 24 },
  fabButton: { backgroundColor: '#19e64d', borderRadius: 28, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 6 },
  fabText: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#0e1b11' },
});

export default SellerDashboardScreen;
