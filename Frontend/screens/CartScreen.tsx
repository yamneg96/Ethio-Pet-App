import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeScreen } from '../components/SafeScreen';
import { useNavigation } from '@react-navigation/native';

const cartItems = [
  {
    id: '1',
    name: 'Bella',
    description: 'Golden Retriever Puppy',
    deposit: '$250.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-OcC2z-vKRk3wXpK52IHSv12Z0vz4jfdYbBBfYiq63W7mLboV58GIGndydwWDtuXAi9TWS2vyMwxE98MIUyy_eBJF0oWDjSMPrCojxgdAkStSAJLBA3alUwnxYW2LjL8WJ4DHbVDq9x_JMCqu9M34XZnsVF-c3O70plug5TpiDkBNOvvRrNmHDzx9_huk24Qe2ASb2cxyZa_wyfBDEi9G2t5gu9qA-FTSDELgHQXsi5xfDVH7QfvLwyPxGrHCviHMI2TxmgAP8mk',
  },
  {
    id: '2',
    name: 'Luna',
    description: 'Siamese Kitten',
    deposit: '$150.00',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuApk9FT7cW2ALamN0UWxIEGrijd7wJDERZIfkj3n4_WdScTjug69xdIq2numStgI5SJFcZE5GdsFKHh430q1TwC0FcWYxUuVVn5VXvvqjR6nggq2Ab-4FRvtiNQNFfsukmFGdjhiU0_b1X3xMDVVNmO0PG_Xi_26U8-Wkebw2-ZStAv9NJejQjQrR9eDVJL_n38qPizophk-7iGB6eQgWxKRvOmyaGcZh57MpzNIn1eNMuYwr65Ru4er0tDnFTgsKBsog36lir_tYQ',
  },
];

const CartScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeScreen style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={22} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservation Cart</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.cartList}>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <ImageBackground source={{ uri: item.image }} style={styles.cartImage} />
              <View style={styles.cartInfo}>
                <View style={styles.cartHeader}>
                  <Text style={styles.cartName}>{item.name}</Text>
                  <TouchableOpacity>
                    <MaterialIcons name="delete" size={20} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.cartDescription}>{item.description}</Text>
                <Text style={styles.cartDeposit}>Deposit: {item.deposit}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>$400.00</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Fee</Text>
            <Text style={styles.summaryValue}>$20.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotal}>Total</Text>
            <Text style={styles.summaryTotalValue}>$420.00</Text>
          </View>
        </View>
        <View style={styles.trustBadge}>
          <MaterialIcons name="verified-user" size={16} color="#16a34a" />
          <Text style={styles.trustText}>Secure transaction with Verified Sellers</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
    marginRight: 40,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  cartList: {
    gap: 16,
    marginTop: 12,
  },
  cartItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
  },
  cartInfo: {
    flex: 1,
  },
  cartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cartName: {
    fontSize: 15,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  cartDescription: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },
  cartDeposit: {
    fontSize: 12,
    color: '#ee8c2b',
    fontFamily: 'PlusJakartaSans_700Bold',
    marginTop: 4,
  },
  summaryCard: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  summaryTitle: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 12,
    color: '#0f172a',
    fontFamily: 'PlusJakartaSans_600SemiBold',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 8,
  },
  summaryTotal: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#0f172a',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
    color: '#ee8c2b',
  },
  trustBadge: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  trustText: {
    fontSize: 11,
    color: '#64748b',
  },
  bottomAction: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 16,
    paddingTop: 12,
    backgroundColor: 'rgba(248,247,246,0.95)',
  },
  checkoutButton: {
    height: 56,
    backgroundColor: '#ee8c2b',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans_700Bold',
  },
});

export default CartScreen;
