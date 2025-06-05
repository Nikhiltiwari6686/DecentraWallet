import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { saveVaultKey } from '../../utils/VaultManager';

const VaultRecovery = () => {
  const [input, setInput] = useState('');

  const handleRestore = async () => {
    if (input.trim().length === 64) {
      await saveVaultKey(input);
      Alert.alert('Success', 'Vault key restored.');
    } else {
      Alert.alert('Invalid Key', 'Make sure your key is valid.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Paste your vault private key"
        placeholderTextColor="gray"
        style={{
          borderColor: 'gray',
          borderWidth: 1,
          padding: 8,
          color: 'white',
          marginBottom: 16,
        }}
      />
      <Button title="Restore Vault" onPress={handleRestore} />
    </View>
  );
};

export default VaultRecovery;
