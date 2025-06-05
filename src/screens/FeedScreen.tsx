import React from 'react';
import { Alert,
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const mockPosts = [
  {
    id: '1',
    user: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: 'https://picsum.photos/300/200',
    caption: 'Exploring Web3!',
  },
  {
    id: '2',
    user: 'Jane Smith',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    image: 'https://picsum.photos/300/201',
    caption: 'Loving DecentraWallet 💜',
  },
  {
    id: '3',
    user: 'Alice Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    image: 'https://picsum.photos/300/202',
    caption: 'New to crypto, excited to learn!',
  },
  {
    id: '4',
    user: 'Bob Brown',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    image: 'https://picsum.photos/300/203',
    caption: 'Just sent my first transaction!',
  },
];

const YOUR_AVATAR =
  'https://randomuser.me/api/portraits/men/99.jpg'; 

const FeedsScreen = () => {
  const onPostPress = () => {
    Alert.alert('Open post creation modal or screen');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Feeds</Text>
        <Ionicons
          name="people-outline"
          size={24}
          color="#fff"
          style={styles.headerIcon}
        />
      </View>

      <View style={styles.profilePostRow}>
        <Image source={{ uri: YOUR_AVATAR }} style={styles.myAvatar} />
        <TouchableOpacity style={styles.postButton} onPress={onPostPress}>
          <Text style={styles.postButtonText}>Post on Feed</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 50 }}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <View style={styles.userInfo}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.username}>{item.user}</Text>
            </View>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', paddingHorizontal: 12, paddingTop: 40 },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    position: 'relative',
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerIcon: {
    position: 'absolute',
    right: '60%',
    top: 2,
  },
  profilePostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  myAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#0af',
  },
  postButton: {
    flex: 1,
    backgroundColor: '#0af',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  post: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  caption: {
    color: '#ccc',
    fontSize: 14,
  },
});

export default FeedsScreen;
