import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

type Course = {
  id: string;
  title: string;
  author: string;
  type: 'PDF' | 'Video';
  gated: boolean;
  price?: number;
};

export default function LearnScreen() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Learn Web3 Basics',
      author: 'Alice',
      type: 'PDF',
      gated: false,
    },
    {
      id: '2',
      title: 'DeFi for Beginners',
      author: 'Bob',
      type: 'Video',
      gated: true,
      price: 10,
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'free' | 'gated'>('all');
  const [creatorMode, setCreatorMode] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({});

  const filteredCourses = courses
    .filter(course => {
      if (filter === 'free') return !course.gated;
      if (filter === 'gated') return course.gated;
      return true;
    })
    .filter(course =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );

  const handleAccess = (course: Course) => {
    if (course.gated) {
      Alert.alert('Gated Content', `🔒 Unlock for ${course.price} $DWC`);
    } else {
      setSelectedCourse(course);
    }
  };

  const handleCreate = () => {
    if (!newCourse.title || !newCourse.author || !newCourse.type) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const course: Course = {
      id: Date.now().toString(),
      title: newCourse.title,
      author: newCourse.author,
      type: newCourse.type as 'PDF' | 'Video',
      gated: newCourse.gated || false,
      price: newCourse.gated ? newCourse.price || 0 : undefined,
    };

    setCourses(prev => [course, ...prev]);
    setNewCourse({});
    setCreatorMode(false);
    Alert.alert('Success', 'Course uploaded!');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={() => setCreatorMode(!creatorMode)}
        >
          <Text style={styles.toggleText}>
            {creatorMode ? '👤 Switch to Reader' : '✍️ Switch to Creator'}
          </Text>
        </TouchableOpacity>

        {creatorMode ? (
          <View>
            <Text style={styles.sectionTitle}>📤 Upload New Course</Text>
            <TextInput
              placeholder="Title"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={newCourse.title || ''}
              onChangeText={t => setNewCourse(prev => ({ ...prev, title: t }))}
            />
            <TextInput
              placeholder="Author"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={newCourse.author || ''}
              onChangeText={t => setNewCourse(prev => ({ ...prev, author: t }))}
            />
            <TextInput
              placeholder="Type (PDF or Video)"
              style={styles.input}
              placeholderTextColor="#aaa"
              value={newCourse.type || ''}
              onChangeText={t =>
                setNewCourse(prev => ({ ...prev, type: t as 'PDF' | 'Video' }))
              }
            />
            <TouchableOpacity
              style={styles.gatedToggle}
              onPress={() =>
                setNewCourse(prev => ({ ...prev, gated: !prev.gated }))
              }
            >
              <Text style={styles.toggleText}>
                {newCourse.gated ? '🔒 Gated' : '🔓 Free'}
              </Text>
            </TouchableOpacity>
            {newCourse.gated && (
              <TextInput
                placeholder="Price in $DWC"
                keyboardType="numeric"
                placeholderTextColor="#aaa"
                style={styles.input}
                value={newCourse.price?.toString() || ''}
                onChangeText={t =>
                  setNewCourse(prev => ({ ...prev, price: Number(t) }))
                }
              />
            )}
            <TouchableOpacity style={styles.uploadBtn} onPress={handleCreate}>
              <Text style={{ color: 'white' }}>Upload Course</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text style={styles.sectionTitle}>📚 Courses</Text>
            <TextInput
              placeholder="Search courses"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
            />
            <View style={styles.filterRow}>
              {['all', 'free', 'gated'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterBtn,
                    filter === type && styles.activeFilter,
                  ]}
                  onPress={() => setFilter(type as any)}
                >
                  <Text style={styles.filterText}>{type.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {filteredCourses.map(course => (
              <View key={course.id} style={styles.card}>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.meta}>
                  By {course.author} • {course.type} •{' '}
                  {course.gated ? '🔒 Gated' : 'Free'}
                </Text>
                <TouchableOpacity
                  style={styles.accessBtn}
                  onPress={() => handleAccess(course)}
                >
                  <Text style={{ color: 'white' }}>
                    {course.gated
                      ? `Unlock for ${course.price} $DWC`
                      : '▶ Access'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <Modal
          visible={!!selectedCourse}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedCourse(null)}
        >
          <View style={styles.modalWrap}>
            <View style={styles.modalContent}>
              <Text style={styles.title}>{selectedCourse?.title}</Text>
              <Text style={styles.meta}>By: {selectedCourse?.author}</Text>
              <Text style={{ color: 'white', marginVertical: 10 }}>
                ✅ You accessed this content. Reward: 🎖️ Proof of Learn
              </Text>
              <TouchableOpacity
                onPress={() => setSelectedCourse(null)}
                style={{ marginTop: 10 }}
              >
                <Text style={{ color: '#00f', textAlign: 'right' }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 16 },
  toggleBtn: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  toggleText: { color: 'white', fontWeight: 'bold' },
  sectionTitle: { color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 8,
    color: 'white',
    marginBottom: 10,
  },
  gatedToggle: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadBtn: {
    backgroundColor: '#00aa66',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  filterRow: { flexDirection: 'row', marginVertical: 10 },
  filterBtn: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#0077cc',
  },
  filterText: { color: 'white' },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { color: 'white', fontSize: 16, fontWeight: '600' },
  meta: { color: '#aaa', marginTop: 4 },
  accessBtn: {
    backgroundColor: '#00aaff',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  modalWrap: {
    flex: 1,
    backgroundColor: '#000a',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#111',
    borderRadius: 12,
    padding: 20,
  },
});
