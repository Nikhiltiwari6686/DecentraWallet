import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TaskItemProps {
  content: string;
  done: boolean;
  onToggle: () => void;
}

export default function TaskItem({ content, done, onToggle }: TaskItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onToggle}>
      <Text style={[styles.text, done && styles.done]}>{content}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
  done: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});
