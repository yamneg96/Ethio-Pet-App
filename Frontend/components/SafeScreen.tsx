import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView, Edges } from 'react-native-safe-area-context';

type SafeScreenProps = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  edges?: Edges;
};

export const SafeScreen = ({ children, style, edges }: SafeScreenProps) => {
  return (
    <SafeAreaView edges={edges ?? ['top', 'bottom']} style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
