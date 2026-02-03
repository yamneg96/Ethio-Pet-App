import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PetDetailScreen from '../screens/PetDetailScreen';
import CartScreen from '../screens/CartScreen';
import ReservationDetailsScreen from '../screens/ReservationDetailsScreen';
import PaymentMethodScreen from '../screens/PaymentMethodScreen';
import ReservationSuccessScreen from '../screens/ReservationSuccessScreen';
import MessageChatScreen from '../screens/MessageChatScreen';
import PublicSellerProfileScreen from '../screens/PublicSellerProfileScreen';
import BuyerOrdersScreen from '../screens/BuyerOrdersScreen';
import SellerDashboardScreen from '../screens/SellerDashboardScreen';
import AppTabs from './AppTabs';
import { useAuthStore } from '../store/authStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        {isAuthenticated ? (
          <Stack.Screen name="AppTabs" component={AppTabs} />
        ) : (
          <Stack.Screen name="AppTabs" component={AppTabs} />
        )}
        <Stack.Screen name="PetDetail" component={PetDetailScreen} />
        <Stack.Screen name="Cart" component={CartScreen} />
        <Stack.Screen name="ReservationDetails" component={ReservationDetailsScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen name="ReservationSuccess" component={ReservationSuccessScreen} />
        <Stack.Screen name="MessageChat" component={MessageChatScreen} />
        <Stack.Screen name="PublicSellerProfile" component={PublicSellerProfileScreen} />
        <Stack.Screen name="BuyerOrders" component={BuyerOrdersScreen} />
        <Stack.Screen name="SellerDashboard" component={SellerDashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
