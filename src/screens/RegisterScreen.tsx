import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

type Props = {
  onRegisterSuccess: (userEmail: string | null) => void;
  switchToLogin: () => void;
};

export default function RegisterScreen({ onRegisterSuccess, switchToLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      onRegisterSuccess(userCredential.user?.email || null);
      setError('');
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError('Unknown error during sign up');
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
      <Button title="Register" onPress={handleSignUp} />
      <View style={{ height: 10 }} />
      <Button title="Go to Login" onPress={switchToLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
  error: { color: 'red', marginBottom: 10 },
});
