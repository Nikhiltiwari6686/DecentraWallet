import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert, Clipboard } from 'react-native';
import { getVaultKey } from './../../utils/VaultManager';

const VaultExport = () => {
  const [key, setKey] = useState<string | null>(null);

  const fetchKey = async () => {
    const vaultKey = await getVaultKey();
    setKey(vaultKey);
  };

  useEffect(() => {
    fetchKey();
  }, []);

  const handleCopy = () => {
    if (key) {
      Clipboard.setString(key);
      Alert.alert('Copied', 'Private key copied to clipboard.');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ color: 'white' }}>Your Vault Private Key:</Text>
      <Text style={{ color: 'gray', marginVertical: 8 }}>{key || 'Loading...'}</Text>
      <Button title="Copy Key" onPress={handleCopy} />
    </View>
  );
};

export default VaultExport;
