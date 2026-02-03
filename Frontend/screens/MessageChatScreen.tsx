import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';

const MessageChatScreen = () => {
  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.inboxHeader}>
          <TouchableOpacity style={styles.menuButton}>
            <MaterialIcons name="menu" size={22} color="#0f172a" />
          </TouchableOpacity>
          <Text style={styles.inboxTitle}>Messages</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {['All Chats', 'Buying', 'Selling'].map((chip, index) => (
            <TouchableOpacity key={chip} style={[styles.chip, index === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{chip}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.chatList}>
          <View style={styles.chatItem}>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC69Z2zWDtFtUoAYIucZI7jR_y5EbLXd9UtTf_DPm7qC68oEp6s_g8eNl0ckbmJEFufCpVgdQYpGLMJmU81z8CzbX0rFQh90I1ejNELyE_ZFBz9g_jdlRt_KsBoMO4eU8KQEGl-JupktVEbNuapxt4eWY1hexOUGcFb87qYSuVBDvmhQxANKm9Aya1KFcGelyDv5YMJVMqELwZ_uDGCMBufpvsuitu0VEU5iKdLTIpIRYhfFxPtiq8VmjKu1_jMRaFFTRLuI3gKnVc',
              }}
              style={styles.avatar}
            />
            <View style={styles.chatContent}>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.chatName}>Sarah Jenkins</Text>
                <Text style={styles.chatTime}>10:30 AM</Text>
              </View>
              <View style={styles.chatMessageRow}>
                <Text style={styles.chatMessage}>Is the Golden Retriever puppy still available?</Text>
                <View style={styles.unreadDot} />
              </View>
            </View>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCELozNDja_jkGkX51DH2G3Ze7SThSLnHB3lqtuflEyZT67vuX2p2rselXSQyCSsIEx5gSFZCjRvIEmbh18SSQCMmSfZeZKLHxjcPOKBkCy0HVny1vWzg5ZZ2_ll9qY-O5hWXB1DBDObWTuzI-5UlcxIQQfhwZVI71DlsjVNRgjSpcggrL3bMToURW6xswvCnw5_64wC9A9r79yY4bvCIgkQiOhlqLGkT0NqkMYMHaZer71hQIPlc3ujBQ6TYwgR-HLNV_g2KelY64',
              }}
              style={styles.thumb}
            />
          </View>
          <View style={styles.chatItem}>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDThSwBggN_QlSgwEWvve9NoO62-rs8Z3h5dSAB7BU4k9iF4sVD7m1oOJuVnGJFjTEnhz5jc0opQG3bL6aM2diTH_eslJXzpNE-IPXH0yUmr3S1W0-coVSHnriaZQ16vPgmOEE27aKiwql-Rr9BSY-AtI7EWZIZjknzs3OgimPSGt6Tv42cTEqV3br_4XyVr12V-aCBAcb8yvmeGYQDW4DWHvqIgGAwP-hLySO9dFC92MRoTCEQlXK4WmJcxKe_MLKuDA8Ub-DX2e0',
              }}
              style={styles.avatar}
            />
            <View style={styles.chatContent}>
              <View style={styles.chatHeaderRow}>
                <Text style={styles.chatName}>Mike Smith</Text>
                <Text style={styles.chatTime}>Yesterday</Text>
              </View>
              <Text style={styles.chatMessageMuted}>I can send the vaccination records tomorrow.</Text>
            </View>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBw52UrvE_d7mXMTf8g7FnZFtzu9DqSSJFz-iMuF8RBAB49kQyHYKGHt_8iFBmTDBp-Ag2rx8kN-QrWQnBUCXOtR4hu6eBrLBR3s8Hio_posP-XOxU1s8F8RB9x_m9AsC2Gc6_fi8nsA_kefD8rTQYlEv7Ek4pO0ig5Wh5pEyuwQLbC038YkKVHdrVE1NMTvIWBL16_fpicoIQKsd-jCZcTO81ODDLiQwElVaZSSSN2CTpLax3FSji8EacfRGOOBkLMdl2Yn4MjtQ',
              }}
              style={styles.thumb}
            />
          </View>
        </View>
        <View style={styles.sectionDivider}>
          <Text style={styles.sectionDividerText}>Active Chat View Below</Text>
        </View>
        <View style={styles.chatHeader}>
          <TouchableOpacity style={styles.backChatButton}>
            <MaterialIcons name="arrow-back" size={20} color="#64748b" />
          </TouchableOpacity>
          <View style={styles.chatHeaderInfo}>
            <View style={styles.chatHeaderNameRow}>
              <Text style={styles.chatHeaderName}>Paws & Claws</Text>
              <MaterialIcons name="verified" size={14} color="#195de6" />
            </View>
            <Text style={styles.chatHeaderSub}>Replies within 1 hour</Text>
          </View>
          <TouchableOpacity style={styles.reserveButton}>
            <MaterialIcons name="shield" size={16} color="#195de6" />
            <Text style={styles.reserveText}>Reserve</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.safetyBanner}>
          <MaterialIcons name="info" size={18} color="#f97316" />
          <Text style={styles.safetyText}>
            <Text style={styles.safetyBold}>Safety Tip:</Text> Always keep transactions inside the app to protect your purchase protection guarantee.
          </Text>
        </View>
        <View style={styles.petContext}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlHHolGRqwWO8ahrCn28hy9fUG-sWKLdiPhvZwQCiiXxly5nwjkOTtbQVM_TLGUGrCabXOBCZAsWkDYcB3iSon58skG0Z3zl35ko-l-6ECxzYDRNdDsoSp_jLQGQyxFxxoC4HKiPCnnRjDQ9zu_0UmccX4UvkzSA0SxMNCiBa2o6-xUccxOy66DI3a-1Jm5W_E3Hng9wFH0mMIwSafLXfFV7NM-woWNZVnJE6BX8ohPkSH3MfRAqILknAVtm6QTC4apKNn6yMCxik',
            }}
            style={styles.petContextImage}
          />
          <View>
            <Text style={styles.petContextTitle}>Beagle Puppy</Text>
            <Text style={styles.petContextSubtitle}>Purebred • 8 weeks</Text>
          </View>
          <Text style={styles.petContextPrice}>$1,200</Text>
        </View>
        <View style={styles.messagesArea}>
          <View style={styles.dateChip}>
            <Text style={styles.dateChipText}>Today</Text>
          </View>
          <View style={styles.messageRowLeft}>
            <ImageBackground
              source={{
                uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5vbFoPTqWSNyyTU56iIRxfwXYC0eha26qcfV_uWzAc90PIwu-XXDwf2YUWOlEJgOvyGXfumFrYKy9TW1k8mF5Qr7Mud-HFM6ACPBpoe5Cxxv3NahHP6uImDRAcRYuXbutH_0EErdXo6tgyXuEhzThOdc_XCDa_vkSN1Qp0CBM0tc3ZkHESZIE5Bkvk-E24fltZDhpF0JOPCeBDsRgv0bp2_YtT6jm7K1s-gDrYukAE8cxTrCaeYpDJgSvl7m8Tpj0FQhWuwgiw-U',
              }}
              style={styles.messageAvatar}
            />
            <View style={styles.messageBubbleLeft}>
              <Text style={styles.messageText}>Hello! Are you interested in the Beagle puppy we just listed?</Text>
            </View>
          </View>
          <View style={styles.messageRowRight}>
            <View style={styles.messageBubbleRight}>
              <Text style={styles.messageTextRight}>Hello, yes I am! He is adorable. Is he still available to be reserved?</Text>
            </View>
          </View>
        </View>
        <View style={styles.inputBar}>
          <TouchableOpacity>
            <MaterialIcons name="add-circle" size={26} color="#94a3b8" />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput placeholder="Type a message..." placeholderTextColor="#94a3b8" style={styles.input} />
            <MaterialIcons name="sentiment-satisfied" size={18} color="#94a3b8" />
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <MaterialIcons name="send" size={18} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f8' },
  content: { paddingBottom: 24 },
  inboxHeader: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  menuButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  inboxTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontFamily: 'Inter_700Bold', color: '#0f172a', marginRight: 40 },
  chipRow: { paddingHorizontal: 16, gap: 12, paddingBottom: 8 },
  chip: { paddingHorizontal: 18, paddingVertical: 8, borderRadius: 999, backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#e2e8f0' },
  chipActive: { backgroundColor: '#195de6', borderColor: '#195de6' },
  chipText: { fontSize: 12, color: '#64748b', fontFamily: 'Inter_600SemiBold' },
  chipTextActive: { color: '#ffffff' },
  chatList: { gap: 12, paddingHorizontal: 16, paddingVertical: 8 },
  chatItem: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  avatar: { width: 56, height: 56, borderRadius: 28, overflow: 'hidden' },
  chatContent: { flex: 1 },
  chatHeaderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  chatName: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#0f172a' },
  chatTime: { fontSize: 10, color: '#195de6' },
  chatMessageRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  chatMessage: { fontSize: 12, color: '#0f172a', flex: 1 },
  chatMessageMuted: { fontSize: 12, color: '#94a3b8' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#195de6' },
  thumb: { width: 40, height: 40, borderRadius: 10, overflow: 'hidden' },
  sectionDivider: { marginVertical: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e2e8f0', paddingVertical: 4 },
  sectionDividerText: { fontSize: 10, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1 },
  chatHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#e2e8f0' },
  backChatButton: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  chatHeaderInfo: { flex: 1, marginLeft: 8 },
  chatHeaderNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  chatHeaderName: { fontSize: 14, fontFamily: 'Inter_700Bold', color: '#0f172a' },
  chatHeaderSub: { fontSize: 11, color: '#195de6' },
  reserveButton: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(25,93,230,0.1)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12 },
  reserveText: { fontSize: 12, color: '#195de6', fontFamily: 'Inter_700Bold' },
  safetyBanner: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#fff7ed', borderBottomWidth: 1, borderColor: '#fde68a' },
  safetyText: { fontSize: 11, color: '#92400e', flex: 1 },
  safetyBold: { fontFamily: 'Inter_700Bold' },
  petContext: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#ffffff', borderBottomWidth: 1, borderColor: '#e2e8f0' },
  petContextImage: { width: 40, height: 40, borderRadius: 8, overflow: 'hidden' },
  petContextTitle: { fontSize: 13, fontFamily: 'Inter_700Bold', color: '#0f172a' },
  petContextSubtitle: { fontSize: 11, color: '#94a3b8' },
  petContextPrice: { marginLeft: 'auto', fontSize: 13, fontFamily: 'Inter_700Bold', color: '#0f172a' },
  messagesArea: { padding: 16, gap: 12 },
  dateChip: { alignSelf: 'center', paddingHorizontal: 10, paddingVertical: 4, backgroundColor: '#f1f5f9', borderRadius: 999 },
  dateChipText: { fontSize: 10, color: '#94a3b8' },
  messageRowLeft: { flexDirection: 'row', gap: 8, alignItems: 'flex-end' },
  messageAvatar: { width: 32, height: 32, borderRadius: 16 },
  messageBubbleLeft: { backgroundColor: '#e8f5e9', padding: 12, borderRadius: 16 },
  messageText: { fontSize: 12, color: '#0f172a' },
  messageRowRight: { alignItems: 'flex-end' },
  messageBubbleRight: { backgroundColor: '#195de6', padding: 12, borderRadius: 16 },
  messageTextRight: { fontSize: 12, color: '#ffffff' },
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#ffffff', borderTopWidth: 1, borderColor: '#e2e8f0' },
  inputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#f8fafc', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8 },
  input: { flex: 1, fontSize: 12, color: '#0f172a' },
  sendButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#195de6', alignItems: 'center', justifyContent: 'center' },
});

export default MessageChatScreen;
