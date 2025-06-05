import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface Message {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  time: string;
}

export type RootStackParamList = {
  Chat: undefined;
  MockMessaging: { user: Message };
};

type ChatScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Chat'
>;

const mockMessages: Message[] = [
  {
    id: '1',
    name: 'Alice',
    lastMessage: 'Hey, how are you?',
    avatar: 'https://i.pravatar.cc/100?img=1',
    time: '2m ago',
  },
  {
    id: '3',
    name: 'Charlie',
    lastMessage: 'Got the tokens.',
    avatar: 'https://i.pravatar.cc/100?img=3',
    time: '3h ago',
  },
];

const ChatScreen = () => {
  const navigation = useNavigation<ChatScreenNavigationProp>();

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('MockMessaging', { user: item })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockMessages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  list: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  time: {
    color: '#888',
    fontSize: 12,
  },
  message: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
});
