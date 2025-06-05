import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type Message = {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: number;
};

type RouteParams = {
  MockMessaging: { user: { id: string; name: string; avatar: string } };
};

const MockMessagingScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'MockMessaging'>>();
  const { user } = route.params;

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: `Hello ${user.name}! This is a mock message.`, sender: 'other', timestamp: Date.now() - 60000 },
    { id: '2', text: 'Hi! This is a reply from me.', sender: 'me', timestamp: Date.now() - 30000 },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    const newMsg: Message = {
      id: (messages.length + 1).toString(),
      text: input.trim(),
      sender: 'me',
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageBubble, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.userName}>{user.name}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        inverted
        contentContainerStyle={{ flexDirection: 'column-reverse' }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#888"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MockMessagingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
  userName: { color: '#0ff', fontWeight: 'bold', fontSize: 18 },
  messageBubble: {
    marginVertical: 6,
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 12,
    maxWidth: '70%',
  },
  myMessage: { backgroundColor: '#00f0ff', alignSelf: 'flex-end' },
  otherMessage: { backgroundColor: '#222', alignSelf: 'flex-start' },
  messageText: { color: '#fff' },
  timestamp: { color: '#aaa', fontSize: 10, marginTop: 4, textAlign: 'right' },
  inputRow: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#111',
  },
  input: {
    flex: 1,
    color: '#fff',
    backgroundColor: '#222',
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  sendButton: {
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#00f0ff',
    borderRadius: 20,
    marginLeft: 8,
  },
});
