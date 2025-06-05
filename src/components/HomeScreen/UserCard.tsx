import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { WalletContext } from './../../context/WalletContext'; // adjust path if needed

const UserCard = () => {
  const { walletAddress, balance } = useContext(WalletContext);

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://via.placeholder.com/60' }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.name}>
          {walletAddress
            ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
            : 'Not Connected'}
        </Text>
        <Text style={styles.balance}>
          Balance: {balance ?? '0 ETH'}
        </Text>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  name: { color: '#fff', fontWeight: '600', fontSize: 16 },
  balance: { color: '#aaa' },
});
