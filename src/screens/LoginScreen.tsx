import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

type Props = {
  onLoginSuccess: (userEmail: string | null) => void;
  switchToRegister: () => void;
};

export default function LoginScreen({ onLoginSuccess, switchToRegister }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      onLoginSuccess(userCredential.user?.email || null);
      setError('');
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError('Unknown error during sign in');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Button title="Sign In" onPress={handleSignIn} />
      <View style={{ height: 10 }} />
      <Button title="Go to Register" onPress={switchToRegister} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 },
});
