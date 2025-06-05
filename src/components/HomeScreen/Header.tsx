import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const Header = ({ onVaultModeChange }: { onVaultModeChange?: (val: boolean) => void }) => {
  const [vaultMode, setVaultMode] = useState(false);

  useEffect(() => {
    const loadVaultState = async () => {
      const saved = await EncryptedStorage.getItem('VAULT_MODE');
      if (saved === 'true') {
        setVaultMode(true);
        onVaultModeChange?.(true);
      }
    };
    loadVaultState();
  }, []);

  const toggleVault = async () => {
    const newValue = !vaultMode;
    setVaultMode(newValue);
    await EncryptedStorage.setItem('VAULT_MODE', newValue.toString());
    onVaultModeChange?.(newValue);
    Alert.alert('Vault Mode', newValue ? 'Vault Mode Enabled' : 'Vault Mode Disabled');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🌐 DecentraWallet</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleText}>CeFi</Text>
          <Switch />
          <Text style={styles.toggleText}>DeFi</Text>

          <Text style={styles.toggleText}>|</Text>

          <Text style={styles.toggleText}>Personal</Text>
          <Switch />
          <Text style={styles.toggleText}>Business</Text>

          <Text style={styles.toggleText}>|</Text>

          <Text style={styles.toggleText}>Vault</Text>
          <Switch value={vaultMode} onValueChange={toggleVault} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  logo: {
    color: '#00f0ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  toggleText: {
    color: '#fff',
    marginHorizontal: 4,
  },
});
