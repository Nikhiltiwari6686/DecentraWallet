import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const ActivityCarousel = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {['Sent 0.5 ETH', 'Received ₹5,000', 'Earned Badge', 'New Airdrop'].map((item, idx) => (
        <View key={idx} style={styles.card}>
          <Text style={styles.text}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default ActivityCarousel;

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 16,
  },
  card: {
    backgroundColor: '#333',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
  },
  text: { color: '#fff' },
});
