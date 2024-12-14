import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';

export default function OverlayScreen({ route, navigation }) {
  const { replacements } = route.params;
  const [position] = useState(new Animated.ValueXY());
  const [opacity] = useState(new Animated.Value(0.7));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      opacity.setValue(1);
    },
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      opacity.setValue(0.7);
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.overlay,
          {
            transform: position.getTranslateTransform(),
            opacity,
          },
        ]}
      >
        {replacements.map((replacement, index) => (
          <Text key={index} style={styles.text}>
            {replacement.originalText} → {replacement.replacementText}
          </Text>
        ))}
      </Animated.View>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeButtonText}>Close Overlay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    elevation: 5,
  },
  text: {
    color: '#fff',
    marginBottom: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});