import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Clipboard,
  Modal,
  FlatList,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import QRCode from 'react-native-qrcode-svg';

const tokens = [
  { symbol: 'ETH', name: 'Ethereum', address: '0x1234...abcdETH' },
  { symbol: 'USDC', name: 'USD Coin', address: '0x5678...efghUSDC' },
  { symbol: 'DAI', name: 'Dai Stablecoin', address: '0x9abc...ijklDAI' },
  { symbol: 'BTC', name: 'Bitcoin', address: 'bc1qxy...btcaddr' },
];

export default function ReceiveScreen() {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [modalVisible, setModalVisible] = useState(false);

  function copyAddressToClipboard() {
    // Use Clipboard API
    Clipboard.setString(selectedToken.address);
    Alert.alert('Copied!', `Address copied to clipboard.`);
  }

  function openTokenSelector() {
    setModalVisible(true);
  }

  function selectToken(token: typeof tokens[0]) {
    setSelectedToken(token);
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Receive {selectedToken.symbol}</Text>

      <View style={styles.qrContainer}>
        <QRCode
          value={selectedToken.address}
          size={220}
          color="#3B82F6"
          backgroundColor="#121212"
        />
      </View>

      <TouchableOpacity
        style={styles.addressContainer}
        onPress={copyAddressToClipboard}
        activeOpacity={0.7}
      >
        <Text style={styles.addressText}>{selectedToken.address}</Text>
        <Ionicons name="copy-outline" size={22} color="#3B82F6" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tokenSelector}
        onPress={openTokenSelector}
        activeOpacity={0.7}
      >
        <Text style={styles.tokenText}>{selectedToken.symbol}</Text>
        <Ionicons name="chevron-down" size={20} color="#bbb" />
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
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 30,
  },
  qrContainer: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  addressContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  addressText: {
    color: '#fff',
    fontSize: 16,
    flexShrink: 1,
    marginRight: 10,
  },
  tokenSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 30,
    width: '100%',
    justifyContent: 'center',
  },
  tokenText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 8,
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
