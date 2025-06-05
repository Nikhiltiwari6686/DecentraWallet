import React from 'react';
import { View, Text, Switch } from 'react-native';

interface Props {
  isVaultMode: boolean;
  onToggle: () => void;
}

const VaultToggle = ({ isVaultMode, onToggle }: Props) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 16 }}>
      <Text style={{ color: 'white', fontSize: 16 }}>Vault Mode</Text>
      <Switch value={isVaultMode} onValueChange={onToggle} />
    </View>
  );
};

export default VaultToggle;
