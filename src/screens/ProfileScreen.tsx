import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from 'react-native';
import { WalletContext } from '../context/WalletContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const { walletAddress, balance } = useContext(WalletContext);

  const userProfile = {
    username: 'DecentraUser',
    avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    fullName: 'Nikhil Tiwari',
    bio:
      'Blockchain developer, Web3 enthusiast, and DeFi lover. Building a decentralized future with DecentraWallet 🚀',
    location: 'Uttar Pradesh, India',
    website: 'https://decentrawallet.app',
    twitter: 'https://twitter.com/decentrawallet',
    followers: 1220,
    following: 180,
    posts: 56,
    nftsOwned: 8,
  };

  const [walletType, setWalletType] = useState<'Centralized' | 'Decentralized'>(
    'Decentralized'
  );

  const onEditProfile = () => {
    Alert.alert('Edit Profile', 'Open Edit Profile screen or modal');
  };

  const onToggleWalletType = () => {
    setWalletType((prev) =>
      prev === 'Centralized' ? 'Decentralized' : 'Centralized'
    );
    Alert.alert(
      'Wallet Switch',
      `Switched to ${
        walletType === 'Centralized' ? 'Decentralized' : 'Centralized'
      } Wallet`
    );
  };

  const openLink = (url: string) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open link: ' + url);
      }
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
   
      <View style={styles.header}>
        <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{userProfile.username}</Text>
        <Text style={styles.fullName}>{userProfile.fullName}</Text>
        <Text style={styles.walletAddress}>
          {walletAddress ?? 'Wallet not connected'}
        </Text>
        <Text style={styles.balance}>{balance ?? '--'} ETH</Text>

        <TouchableOpacity style={styles.editButton} onPress={onEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.walletToggleButton}
          onPress={onToggleWalletType}
        >
          <Icon
            name={walletType === 'Centralized' ? 'bank' : 'wallet-outline'}
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.walletToggleText}>
            Switch to{' '}
            {walletType === 'Centralized' ? 'Decentralized' : 'Centralized'} Wallet
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProfile.posts}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProfile.followers}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProfile.following}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userProfile.nftsOwned}</Text>
          <Text style={styles.statLabel}>NFTs Owned</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <Text style={styles.sectionContent}>{userProfile.bio}</Text>
      </View>

      <View style={styles.section}>
        <Icon name="map-marker" size={20} color="#1db954" />
        <Text style={[styles.sectionContent, { marginLeft: 8 }]}>
          {userProfile.location}
        </Text>
      </View>

      <View style={[styles.section, { flexDirection: 'row', marginTop: 16 }]}>
        <TouchableOpacity
          onPress={() => openLink(userProfile.twitter)}
          style={styles.socialIcon}
        >
          <Icon name="twitter" size={28} color="#1DA1F2" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openLink(userProfile.website)}
          style={styles.socialIcon}
        >
          <Icon name="web" size={28} color="#00aced" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <Text style={styles.sectionContent}>
          Posted 3 new feeds and interacted with the community in the last week.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your NFTs</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(userProfile.nftsOwned)].map((_, i) => (
            <Image
              key={i}
              source={{
                uri: `https://picsum.photos/seed/nft${i}/100/100`,
              }}
              style={styles.nftImage}
            />
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1db954',
  },
  username: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  fullName: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 6,
  },
  walletAddress: {
    fontFamily: 'monospace',
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  balance: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1db954',
    marginBottom: 12,
  },
  editButton: {
    backgroundColor: '#1db954',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 25,
    marginBottom: 16,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  walletToggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  walletToggleText: {
    color: '#eee',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#1db954',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    color: '#eee',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 8,
  },
  sectionContent: {
    color: '#bbb',
    fontSize: 14,
    lineHeight: 20,
  },
  socialIcon: {
    marginRight: 24,
  },
  nftImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#1db954',
  },
});

export default ProfileScreen;
