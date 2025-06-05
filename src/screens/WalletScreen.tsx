import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { WalletContext } from '../context/WalletContext';

const tokens = [
  { name: 'Ethereum', symbol: 'ETH', balance: '2.5', icon: 'logo-ethereum' },
  { name: 'BNB', symbol: 'BNB', balance: '10.4', icon: 'logo-bitcoin' },
  { name: 'USDT', symbol: 'USDT', balance: '1500', icon: 'cash-outline' },
];

const WalletScreen = () => {
  const { walletAddress, balance, createWallet, importWallet, refreshBalance, clearWallet } = useContext(WalletContext);
  const [mnemonicInput, setMnemonicInput] = useState('');

  useEffect(() => {
    if (walletAddress) {
      refreshBalance();
    }
  }, [walletAddress]);

  const handleImport = async () => {
    if (!mnemonicInput.trim()) {
      Alert.alert('Error', 'Please enter a mnemonic phrase.');
      return;
    }
    try {
      await importWallet(mnemonicInput.trim());
      Alert.alert('Success', 'Wallet imported!');
      setMnemonicInput('');
    } catch (error) {
      Alert.alert('Import Failed', 'Invalid mnemonic phrase.');
    }
  };

  const handleCreateWallet = async () => {
    try {
      await createWallet();
      Alert.alert('Success', 'New wallet created!');
    } catch (error) {
      Alert.alert('Error', 'Failed to create wallet');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wallet</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{balance ?? '0 ETH'}</Text>
      </View>

      <Text style={styles.addressText}>Address: {walletAddress ?? 'No wallet connected'}</Text>

      <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton} onPress={handleCreateWallet}>
          <Icon name="add-circle-outline" size={24} color="#00f0ff" />
          <Text style={styles.actionText}>Create Wallet</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { marginTop: 10 }]} onPress={clearWallet}>
          <Icon name="trash-outline" size={24} color="#ff4444" />
          <Text style={styles.actionText}>Clear Wallet</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <TextInput
            style={styles.input}
            placeholder="Enter mnemonic"
            placeholderTextColor="#666"
            value={mnemonicInput}
            onChangeText={setMnemonicInput}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            numberOfLines={2}
          />
          <TouchableOpacity
            style={[styles.importButton, { opacity: mnemonicInput.trim() ? 1 : 0.5 }]}
            onPress={handleImport}
            disabled={!mnemonicInput.trim()}
          >
            <Text style={styles.importButtonText}>Import</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.subTitle}>Your Tokens</Text>

      <FlatList
        data={tokens}
        keyExtractor={(item) => item.symbol}
        renderItem={({ item }) => (
          <View style={styles.tokenCard}>
            <Icon name={item.icon} size={24} color="#00f0ff" style={styles.tokenIcon} />
            <View>
              <Text style={styles.tokenName}>{item.name}</Text>
              <Text style={styles.tokenSymbol}>{item.symbol}</Text>
            </View>
            <Text style={styles.tokenBalance}>{item.balance}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    fontSize: 26,
    color: '#00f0ff',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: '#111',
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  balanceLabel: {
    color: '#888',
    fontSize: 14,
  },
  balanceAmount: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 4,
  },
  addressText: {
    color: '#0ff',
    fontSize: 12,
    marginBottom: 16,
  },
  actionsRow: {
    marginBottom: 24,
  },
  actionButton: {
    alignItems: 'center',
    marginBottom: 12,
  },
  actionText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    fontSize: 14,
    maxHeight: 60,
  },
  importButton: {
    backgroundColor: '#00f0ff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
  },
  importButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    color: '#00f0ff',
    marginBottom: 8,
    fontWeight: '600',
  },
  tokenCard: {
    backgroundColor: '#111',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  tokenIcon: {
    marginRight: 16,
  },
  tokenName: {
    color: '#fff',
    fontSize: 16,
  },
  tokenSymbol: {
    color: '#888',
    fontSize: 12,
  },
  tokenBalance: {
    color: '#00f0ff',
    fontSize: 16,
    fontWeight: '600',
  },
});
