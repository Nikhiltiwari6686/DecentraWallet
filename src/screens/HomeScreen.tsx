import React, { useState } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Header from './../components/HomeScreen/Header';
import UserCard from './../components/HomeScreen/UserCard';
import ActionGrid from './../components/HomeScreen/ActionGrid';
import TokenStrip from './../components/HomeScreen/TokenStrip';
import ActivityCarousel from './../components/HomeScreen/ActivityCarousel';

const HomeScreen = () => {
  const [vaultMode, setVaultMode] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Header onVaultModeChange={setVaultMode} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {vaultMode ? (
          <View style={styles.vaultNotice}>
            <Text style={styles.vaultText}> Vault Mode is active</Text>
            <Text style={styles.vaultSubText}>
              Wallet details are hidden for security.
            </Text>
          </View>
        ) : (
          <>
            <UserCard />
            <ActionGrid />
            <TokenStrip />
            <ActivityCarousel />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  vaultNotice: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  vaultText: {
    color: '#00f0ff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vaultSubText: {
    color: '#888',
    marginTop: 8,
    fontSize: 14,
  },
});
