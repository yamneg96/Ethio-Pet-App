import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { AppTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import BuyerOrdersScreen from '../screens/BuyerOrdersScreen';
import SellerDashboardScreen from '../screens/SellerDashboardScreen';
import BuyerProfileScreen from '../screens/BuyerProfileScreen';
import { useAuthStore } from '../store/authStore';

const Tab = createBottomTabNavigator<AppTabParamList>();

const OrdersOrDashboardScreen = () => {
  const role = useAuthStore((state) => state.role);
  return role === 'seller' ? <SellerDashboardScreen /> : <BuyerOrdersScreen />;
};

const AppTabs = () => {
  const role = useAuthStore((state) => state.role);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 12,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
        },
        tabBarIcon: ({ focused, color, size }) => {
          const iconSize = size ?? 24;
          let name: keyof typeof MaterialIcons.glyphMap = 'home';

          if (route.name === 'Home') name = 'home';
          if (route.name === 'Explore') name = 'explore';
          if (route.name === 'Favorites') name = 'favorite-border';
          if (route.name === 'OrdersOrDashboard') name = role === 'seller' ? 'dashboard' : 'shopping-bag';
          if (route.name === 'Profile') name = 'person';

          return <MaterialIcons name={name} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: '#13ec13',
        tabBarInactiveTintColor: '#6b7280',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen
        name="OrdersOrDashboard"
        component={OrdersOrDashboardScreen}
        options={{ tabBarLabel: role === 'seller' ? 'Dashboard' : 'Orders' }}
      />
      <Tab.Screen name="Profile" component={BuyerProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppTabs;
