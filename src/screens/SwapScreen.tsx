import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const tokens = [
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'USDC', name: 'USD Coin' },
  { symbol: 'DAI', name: 'Dai Stablecoin' },
  { symbol: 'BTC', name: 'Bitcoin' },
];

const mockRates: Record<string, number> = {
  'ETH-USDC': 1700,
  'USDC-ETH': 1 / 1700,
  'ETH-DAI': 1700,
  'DAI-ETH': 1 / 1700,
  'USDC-DAI': 1,
  'DAI-USDC': 1,
};

export default function SwapScreen() {
  const [fromToken, setFromToken] = useState(tokens[0]);
  const [toToken, setToToken] = useState(tokens[1]);
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectingFromToken, setSelectingFromToken] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!fromAmount || isNaN(Number(fromAmount)) || Number(fromAmount) <= 0) {
      setToAmount('0');
      setError('');
      return;
    }

    const rateKey = `${fromToken.symbol}-${toToken.symbol}`;
    const rate = mockRates[rateKey];
    if (!rate) {
      setToAmount('0');
      setError('Swap pair not supported.');
      return;
    }

    setError('');
    const estimated = Number(fromAmount) * rate;
    setToAmount(estimated.toFixed(4));
  }, [fromAmount, fromToken, toToken]);

  function openTokenSelector(isFrom: boolean) {
    setSelectingFromToken(isFrom);
    setModalVisible(true);
  }

  function selectToken(token: typeof tokens[0]) {
    if (selectingFromToken) {
      if (token.symbol === toToken.symbol) {
        setError('From and To tokens cannot be the same.');
        return;
      }
      setFromToken(token);
    } else {
      if (token.symbol === fromToken.symbol) {
        setError('From and To tokens cannot be the same.');
        return;
      }
      setToToken(token);
    }
    setError('');
    setModalVisible(false);
  }

  function onSwapPress() {
    Alert.alert(
      'Confirm Swap',
      `Swapping ${fromAmount} ${fromToken.symbol} to approx. ${toAmount} ${toToken.symbol}`,
      [{ text: 'OK' }]
    );
  }

  const isSwapDisabled =
    !fromAmount ||
    isNaN(Number(fromAmount)) ||
    Number(fromAmount) <= 0 ||
    error !== '';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Swap Tokens</Text>

      <View style={styles.tokenRow}>
        <Text style={styles.label}>From</Text>
        <TouchableOpacity
          style={styles.tokenSelector}
          onPress={() => openTokenSelector(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.tokenText}>{fromToken.symbol}</Text>
          <Ionicons name="chevron-down" size={20} color="#bbb" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="0.0"
        placeholderTextColor="#666"
        keyboardType="numeric"
        value={fromAmount}
        onChangeText={setFromAmount}
      />

      <View style={styles.tokenRow}>
        <Text style={styles.label}>To</Text>
        <TouchableOpacity
          style={styles.tokenSelector}
          onPress={() => openTokenSelector(false)}
          activeOpacity={0.7}
        >
          <Text style={styles.tokenText}>{toToken.symbol}</Text>
          <Ionicons name="chevron-down" size={20} color="#bbb" />
        </TouchableOpacity>
      </View>
      <View style={styles.estimatedContainer}>
        <Text style={styles.estimatedLabel}>Estimated Amount</Text>
        <Text style={styles.estimatedAmount}>{toAmount}</Text>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity
        style={[styles.swapButton, isSwapDisabled && styles.swapButtonDisabled]}
        disabled={isSwapDisabled}
        onPress={onSwapPress}
      >
        <Text style={styles.swapButtonText}>Swap</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Token</Text>
            <FlatList
              data={tokens}
              keyExtractor={(item) => item.symbol}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.tokenItem}
                  onPress={() => selectToken(item)}
                >
                  <Text style={styles.tokenItemText}>
                    {item.symbol} - {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
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
    backgroundColor: '#121212',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  label: {
    color: '#bbb',
    fontSize: 16,
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  tokenText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 15,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 18,
  },
  estimatedContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
  },
  estimatedLabel: {
    color: '#bbb',
    fontSize: 14,
  },
  estimatedAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 4,
  },
  errorText: {
    marginTop: 12,
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 14,
  },
  swapButton: {
    marginTop: 30,
    backgroundColor: '#3B82F6',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  swapButtonDisabled: {
    backgroundColor: '#555',
  },
  swapButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 15,
  },
  tokenItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  tokenItemText: {
    color: '#eee',
    fontSize: 16,
  },
  modalClose: {
    marginTop: 15,
    paddingVertical: 12,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});
