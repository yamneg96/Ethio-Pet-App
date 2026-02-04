import React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { StyleProp, ViewStyle } from 'react-native';

type AnimatedScreenProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AnimatedScreen({ children, style }: AnimatedScreenProps) {
  return (
    <Animated.View style={[{ flex: 1 }, style]} entering={FadeInDown.duration(360)}>
      {children}
    </Animated.View>
  );
}
