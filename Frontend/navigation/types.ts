export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  AppTabs: undefined;
  PetDetail: { petId: string } | undefined;
  Cart: undefined;
  ReservationDetails: undefined;
  PaymentMethod: undefined;
  ReservationSuccess: undefined;
  MessageChat: { threadId?: string } | undefined;
  PublicSellerProfile: { sellerId?: string } | undefined;
  BuyerOrders: undefined;
  SellerDashboard: undefined;
};

export type AppTabParamList = {
  Home: undefined;
  Explore: undefined;
  Favorites: undefined;
  OrdersOrDashboard: undefined;
  Profile: undefined;
};
