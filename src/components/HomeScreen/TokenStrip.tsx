import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TokenStrip = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.strip}>
      {['$DWC: 2,400', 'Rewards: 120', 'Staked: 400', 'Claimable: 40'].map((item, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default TokenStrip;

const styles = StyleSheet.create({
  strip: { marginHorizontal: 16, marginTop: 8 },
  card: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 8,
  },
  text: { color: '#0ff', fontWeight: '600' },
});
