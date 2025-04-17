import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const Inputs: React.FC<InputFieldProps> = ({ label, placeholder, value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginTop: 8,
    borderWidth: 1,
    padding: 10,
  },
});

export default Inputs;
