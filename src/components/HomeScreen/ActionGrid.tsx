import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

const actions = [
  { label: 'Wallet', icon: 'wallet-outline', screen: 'Wallet' },
  { label: 'Swap', icon: 'swap-horizontal-outline', screen: 'Swap' },
  { label: 'Pay', icon: 'send-outline', screen: 'Pay' },
  { label: 'Receive', icon: 'download-outline', screen: 'Receive' },
  { label: 'Browser', icon: 'globe-outline', screen: 'Browser' },
  { label: 'Learn', icon: 'school-outline', screen: 'Learn' },
  { label: 'To-do List', icon: 'checkbox-outline', screen: 'TodoList' },
  { label: 'Expenses', icon: 'cash-outline', screen: 'ExpenseTracker' },
];

const ActionGrid = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.grid}>
      {actions.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.tile}
          onPress={() => navigation.navigate(item.screen as keyof RootStackParamList)}
        >
          <Icon name={item.icon} size={28} color="#00f0ff" />
          <Text style={styles.label}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ActionGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: 16,
  },
  tile: {
    width: '22%',
    marginVertical: 12,
    alignItems: 'center',
  },
  label: { color: '#fff', fontSize: 12, marginTop: 4 },
});
