import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

interface Expense {
  id: string;
  description: string;
  amount: number;
}

const ExpenseTrackerScreen = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addExpense = () => {
    const amt = parseFloat(amount);
    if (description.trim() && !isNaN(amt)) {
      const newExpense = {
        id: Date.now().toString(),
        description: description.trim(),
        amount: amt,
      };
      setExpenses([newExpense, ...expenses]);
      setDescription('');
      setAmount('');
    }
  };

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Tracker</Text>
      <TextInput
        style={styles.input}
        placeholder="Description"
        placeholderTextColor="#999"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Add Expense" onPress={addExpense} />
      <Text style={styles.total}>Total: ₹{total.toFixed(2)}</Text>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.expense}>
            {item.description}: ₹{item.amount.toFixed(2)}
          </Text>
        )}
      />
    </View>
  );
};

export default ExpenseTrackerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    color: '#00f0ff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  total: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  expense: {
    color: '#fff',
    fontSize: 16,
    paddingVertical: 6,
  },
});
