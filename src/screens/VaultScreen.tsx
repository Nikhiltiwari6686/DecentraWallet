import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import VaultToggle from '../components/Vault/VaultToggle';
import VaultExport from '../components/Vault/VaultExport';
import VaultRecovery from '../components/Vault/VaultRecovery';

const VaultScreen = () => {
  const [vaultMode, setVaultMode] = useState(false);

  return (
    <ScrollView style={{ backgroundColor: 'black', flex: 1 }}>
      <VaultToggle isVaultMode={vaultMode} onToggle={() => setVaultMode(!vaultMode)} />
      {vaultMode && (
        <View>
          <VaultExport />
          <VaultRecovery />
        </View>
      )}
    </ScrollView>
  );
};

export default VaultScreen;
