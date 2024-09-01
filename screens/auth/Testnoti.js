import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Button, View, Text, Animated, StyleSheet } from 'react-native';

const AnimatedNumber = ({ value, style }) => {
  const animatedValue = useRef(new Animated.Value(value)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value,
      duration: 500,
      useNativeDriver: false, // Set to false since we're animating text
    }).start();
  }, [value]);

  const animatedValueText = animatedValue.interpolate({
    inputRange: [Math.floor(value), Math.ceil(value)],
    outputRange: [Math.floor(value).toString(), value.toString()],
  });

  return (
    <Text style={style}>
      {animatedValue.__getValue()}
    </Text>
  );
};

const FloatingPointNumber = ({ value }) => {
  const integerPart = Math.floor(value);
  const fractionalPart = ((value - integerPart) * 100).toFixed(0).padStart(2, '0'); // Ensure two decimal places

  return (
    <View style={styles.container}>
      <AnimatedNumber value={integerPart} style={styles.number} />
      <Text style={styles.number}>.</Text>
      <AnimatedNumber value={fractionalPart} style={styles.number} />
    </View>
  );
};

const Dig = () => {
  const [value, setValue] = useState(7979.00);

  const increase = () => {
    setValue(prev => parseFloat((prev + 1999.99).toFixed(2)));
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <FloatingPointNumber value={value} />
      <Button title="Increase" onPress={increase} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  number: {
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default Dig;
