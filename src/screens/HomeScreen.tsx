import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextReplacement } from '../types';

export default function HomeScreen({ navigation }) {
  const [originalText, setOriginalText] = useState('');
  const [replacementText, setReplacementText] = useState('');
  const [replacements, setReplacements] = useState<TextReplacement[]>([]);

  useEffect(() => {
    loadReplacements();
  }, []);

  const loadReplacements = async () => {
    try {
      const stored = await AsyncStorage.getItem('replacements');
      if (stored) {
        setReplacements(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading replacements:', error);
    }
  };

  const saveReplacements = async (newReplacements: TextReplacement[]) => {
    try {
      await AsyncStorage.setItem('replacements', JSON.stringify(newReplacements));
    } catch (error) {
      console.error('Error saving replacements:', error);
    }
  };

  const addReplacement = () => {
    if (!originalText || !replacementText) {
      Alert.alert('Error', 'Please enter both original and replacement text');
      return;
    }

    const newReplacement = { originalText, replacementText };
    const newReplacements = [...replacements, newReplacement];
    setReplacements(newReplacements);
    saveReplacements(newReplacements);
    
    setOriginalText('');
    setReplacementText('');
  };

  const startOverlay = () => {
    if (replacements.length === 0) {
      Alert.alert('Error', 'Please add at least one text replacement');
      return;
    }
    navigation.navigate('Overlay', { replacements });
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Original Text"
          value={originalText}
          onChangeText={setOriginalText}
        />
        <TextInput
          style={styles.input}
          placeholder="Replace With"
          value={replacementText}
          onChangeText={setReplacementText}
        />
        <TouchableOpacity style={styles.button} onPress={addReplacement}>
          <Text style={styles.buttonText}>Add Replacement</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={replacements}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text>{item.originalText} → {item.replacementText}</Text>
          </View>
        )}
      />

      <TouchableOpacity 
        style={[styles.button, styles.startButton]} 
        onPress={startOverlay}
      >
        <Text style={styles.buttonText}>Start Overlay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CD964',
    marginTop: 20,
  },
  list: {
    flex: 1,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});