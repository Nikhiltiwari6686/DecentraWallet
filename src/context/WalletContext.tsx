import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatEther, HDNodeWallet, JsonRpcProvider, Mnemonic, Signer } from 'ethers';

const RPC_URL = 'https://sepolia.infura.io/v3/36972627fc9a45c8a00e9bd42b6c262c';

const STORAGE_KEY = 'user_mnemonic';
const TX_HISTORY_KEY = 'transaction_history';

type WalletContextType = {
  signer: Signer | null;
  walletAddress: string | null;
  balance: string | null;
  transactionHistory: string[];
  createWallet: () => Promise<void>;
  importWallet: (mnemonic: string) => Promise<void>;
  clearWallet: () => Promise<void>;
  refreshBalance: () => Promise<void>;
  addTransaction: (txDescription: string) => Promise<void>;

  walletType: 'CeFi' | 'DeFi';
  switchWalletType: () => void;
  dwcBalance: string | null;
};

export const WalletContext = createContext<WalletContextType>({
  signer: null,
  walletAddress: null,
  balance: null,
  transactionHistory: [],
  createWallet: async () => {},
  importWallet: async (_mnemonic: string) => {},
  clearWallet: async () => {},
  refreshBalance: async () => {},
  addTransaction: async (_txDescription: string) => {},

  walletType: 'DeFi',
  switchWalletType: () => {},
  dwcBalance: null,
});

type Props = {
  children: ReactNode;
};

export const WalletProvider = ({ children }: Props) => {
  const provider = new JsonRpcProvider(RPC_URL);

  const [signer, setSigner] = useState<Signer | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<string[]>([]);

  const [walletType, setWalletType] = useState<'CeFi' | 'DeFi'>('DeFi');
  const [dwcBalance, setDwcBalance] = useState<string | null>(null);

  const saveTransactionHistory = async (history: string[]) => {
    try {
      await AsyncStorage.setItem(TX_HISTORY_KEY, JSON.stringify(history));
    } catch (e) {
      console.error('Failed to save transaction history', e);
    }
  };

  const addTransaction = async (txDescription: string) => {
    const newHistory = [...transactionHistory, txDescription];
    setTransactionHistory(newHistory);
    await saveTransactionHistory(newHistory);
  };

  const createWallet = async () => {
    const newWallet = HDNodeWallet.createRandom().connect(provider);
    if (!newWallet.mnemonic) {
      throw new Error('Mnemonic is not available');
    }
    setSigner(newWallet);
    setWalletAddress(newWallet.address);
    await AsyncStorage.setItem(STORAGE_KEY, newWallet.mnemonic.phrase);

    setTransactionHistory([]);
    await AsyncStorage.removeItem(TX_HISTORY_KEY);

    await refreshBalance();
  };

  const importWallet = async (mnemonicPhrase: string) => {
    try {
      const mnemonicObj = Mnemonic.fromPhrase(mnemonicPhrase.trim());
      const importedWallet = HDNodeWallet.fromMnemonic(mnemonicObj).connect(provider);
      setSigner(importedWallet);
      setWalletAddress(importedWallet.address);
      await AsyncStorage.setItem(STORAGE_KEY, mnemonicPhrase.trim());

      const storedHistory = await AsyncStorage.getItem(TX_HISTORY_KEY);
      if (storedHistory) {
        setTransactionHistory(JSON.parse(storedHistory));
      } else {
        setTransactionHistory([]);
      }

      await refreshBalance();
    } catch (error) {
      console.error('Invalid mnemonic:', error);
      throw error;
    }
  };

  const clearWallet = async () => {
    setSigner(null);
    setWalletAddress(null);
    setBalance(null);
    setTransactionHistory([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
    await AsyncStorage.removeItem(TX_HISTORY_KEY);
  };

  const refreshBalance = async () => {
    try {
      if (!signer) {
        setBalance(null);
        return;
      }
      const bal = await provider.getBalance(await signer.getAddress());
      setBalance(formatEther(bal) + ' ETH');
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      setBalance(null);
    }
  };

  const switchWalletType = () => {
    setWalletType((prev) => (prev === 'CeFi' ? 'DeFi' : 'CeFi'));
  };

  const fetchDwcBalance = async (address: string | null, type: 'CeFi' | 'DeFi') => {
    if (!address) {
      setDwcBalance(null);
      return;
    }
    try {
      if (type === 'DeFi') {
        setDwcBalance('125.4');
      } else {
        setDwcBalance('300.7');
      }
    } catch (e) {
      console.error('Failed to fetch DWC balance', e);
      setDwcBalance(null);
    }
  };

  useEffect(() => {
    const loadWalletFromStorage = async () => {
      const mnemonic = await AsyncStorage.getItem(STORAGE_KEY);
      if (mnemonic) {
        try {
          await importWallet(mnemonic);
        } catch {
          await clearWallet();
        }
      }
    };
    loadWalletFromStorage();
  }, []);

  useEffect(() => {
    fetchDwcBalance(walletAddress, walletType);
  }, [walletAddress, walletType]);

  return (
    <WalletContext.Provider
      value={{
        signer,
        walletAddress,
        balance,
        transactionHistory,
        createWallet,
        importWallet,
        clearWallet,
        refreshBalance,
        addTransaction,

        // New props
        walletType,
        switchWalletType,
        dwcBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
