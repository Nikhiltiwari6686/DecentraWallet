import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { Contract, parseUnits, formatUnits } from 'ethers';
import { WalletContext } from '../context/WalletContext';

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', address: '' },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  },
  {
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  },
  {
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  },
];

const ERC20_ABI = [
  'function transfer(address to, uint amount) returns (bool)',
  'function balanceOf(address) view returns (uint)',
  'function decimals() view returns (uint8)',
];

const isValidAddress = (address: string) =>
  address.length === 42 && address.startsWith('0x');

export default function PayScreen() {
  const { signer, addTransaction, transactionHistory } = useContext(WalletContext);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [decimals, setDecimals] = useState<number>(18);

  useEffect(() => {
    async function fetchBalance() {
      if (!signer) return setBalance(null);

      try {
        const userAddress = await signer.getAddress();
        const provider = signer.provider;
        if (!provider) throw new Error('No provider');

        if (selectedToken.address === '') {
          const ethBalance = await provider.getBalance(userAddress);
          setDecimals(18);
          setBalance(formatUnits(ethBalance, 18));
        } else {
          const tokenContract = new Contract(selectedToken.address, ERC20_ABI, provider);
          const tokenDecimals = await tokenContract.decimals();
          setDecimals(tokenDecimals);

          const tokenBalance = await tokenContract.balanceOf(userAddress);
          setBalance(formatUnits(tokenBalance, tokenDecimals));
        }
      } catch (e) {
        console.error('Balance fetch error:', e);
        setBalance(null);
      }
    }

    fetchBalance();
  }, [selectedToken, signer]);

  const onSendPress = async () => {
    if (!signer) return setError('Wallet not connected');
    if (!isValidAddress(recipient)) return setError('Invalid recipient address');
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0)
      return setError('Enter a valid amount');
    if (balance === null) return setError('Unable to fetch balance');
    if (Number(amount) > Number(balance))
      return setError(`Insufficient balance. You have ${balance} ${selectedToken.symbol}`);

    setError('');
    setLoading(true);

    try {
      if (selectedToken.address === '') {
        const tx = await signer.sendTransaction({
          to: recipient,
          value: parseUnits(amount, decimals),
        });
        await tx.wait();

        addTransaction(`Sent ${amount} ETH to ${recipient}`);
        Alert.alert('Success', `Sent ${amount} ETH to ${recipient}`);
      } else {
        const tokenContract = new Contract(selectedToken.address, ERC20_ABI, signer);
        const amountParsed = parseUnits(amount, decimals);
        const tx = await tokenContract.transfer(recipient, amountParsed);
        await tx.wait();

        addTransaction(`Sent ${amount} ${selectedToken.symbol} to ${recipient}`);
        Alert.alert('Success', `Sent ${amount} ${selectedToken.symbol} to ${recipient}`);
      }

      setRecipient('');
      setAmount('');
      setBalance(null);
    } catch (e: any) {
      console.error('Send error:', e);
      setError(e.message || 'Transaction failed');
    } finally {
      setLoading(false);
    }
  };

  const isSendDisabled =
    !recipient || !amount || Number(amount) <= 0 || !isValidAddress(recipient) || loading;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Send Payment</Text>

      <Text style={styles.label}>Recipient Address</Text>
      <TextInput
        style={styles.input}
        placeholder="0x..."
        placeholderTextColor="#666"
        value={recipient}
        onChangeText={setRecipient}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <Text style={[styles.label, { marginTop: 20 }]}>Amount</Text>
      <View style={styles.amountRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="0.0"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <TouchableOpacity
          style={styles.tokenSelector}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.tokenText}>{selectedToken.symbol}</Text>
          <Ionicons name="chevron-down" size={20} color="#bbb" />
        </TouchableOpacity>
      </View>

      {balance !== null && (
        <Text style={styles.balanceText}>
          Balance: {parseFloat(balance).toFixed(4)} {selectedToken.symbol}
        </Text>
      )}

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.sendButton, isSendDisabled && styles.sendButtonDisabled]}
        disabled={isSendDisabled}
        onPress={onSendPress}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.sendButtonText}>Send</Text>
        )}
      </TouchableOpacity>

      <View style={styles.historyContainer}>
        <Text style={styles.historyTitle}>Transaction History</Text>

        {transactionHistory.length === 0 ? (
          <Text style={styles.emptyText}>No transactions yet.</Text>
        ) : (
          <FlatList
            data={transactionHistory.slice().reverse()} 
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.txItem}>
                <Text style={styles.txText}>{item}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Token</Text>
            <FlatList
              data={tokens}
              keyExtractor={(item) => item.symbol}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tokenItem}
                  onPress={() => {
                    setSelectedToken(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.tokenName}>{item.name}</Text>
                  <Text style={styles.tokenSymbol}>{item.symbol}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 24,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 10,
    borderRadius: 8,
  },
  tokenText: {
    color: '#fff',
    fontWeight: '600',
    marginRight: 6,
  },
  balanceText: {
    color: '#888',
    marginTop: 8,
    fontSize: 14,
  },
  errorText: {
    color: '#f33',
    marginTop: 8,
    fontSize: 14,
  },
  sendButton: {
    marginTop: 30,
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#555',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  historyContainer: {
    flex: 1,
    marginTop: 30,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  emptyText: {
    color: '#666',
    fontSize: 16,
    marginTop: 10,
  },
  txItem: {
    backgroundColor: '#222',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  txText: {
    color: '#eee',
    fontSize: 14,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: '#000a',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#222',
    borderRadius: 12,
    maxHeight: '70%',
  },
  modalTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  tokenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  tokenName: {
    color: '#fff',
    fontSize: 16,
  },
  tokenSymbol: {
    color: '#aaa',
    fontSize: 16,
  },
  modalCloseButton: {
    padding: 16,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#007bff',
    fontWeight: '700',
  },
});
