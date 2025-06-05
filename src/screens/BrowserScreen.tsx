import React, { useRef, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';

const BrowserScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const [url, setUrl] = useState('https://walletconnect.com');
  const [inputUrl, setInputUrl] = useState(url);

  const handleNavigation = () => {
    let finalUrl = inputUrl;
    if (!finalUrl.startsWith('http')) {
      finalUrl = `https://www.google.com/search?q=${finalUrl}`;
    }
    setUrl(finalUrl);
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          placeholder="Search or enter URL"
          placeholderTextColor="#888"
          value={inputUrl}
          onChangeText={setInputUrl}
          onSubmitEditing={handleNavigation}
          style={styles.input}
        />
        <TouchableOpacity onPress={handleNavigation}>
          <Icon name="search-outline" size={22} color="#00f0ff" />
        </TouchableOpacity>
      </View>

      <WebView
        ref={webviewRef}
        source={{ uri: url }}
        style={styles.webview}
        javaScriptEnabled
        domStorageEnabled
      />

      <View style={styles.navControls}>
        <TouchableOpacity onPress={() => webviewRef.current?.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="#00f0ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => webviewRef.current?.goForward()}>
          <Icon name="chevron-forward-outline" size={24} color="#00f0ff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => webviewRef.current?.reload()}>
          <Icon name="reload-outline" size={24} color="#00f0ff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BrowserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  searchBar: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#111',
    alignItems: 'center',
    margin: 8,
    borderRadius: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    paddingLeft: 8,
  },
  webview: {
    flex: 1,
    backgroundColor: '#000',
  },
  navControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#111',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
});
