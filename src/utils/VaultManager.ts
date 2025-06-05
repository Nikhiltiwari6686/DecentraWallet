import EncryptedStorage from 'react-native-encrypted-storage';

export const saveVaultKey = async (privateKey: string) => {
  await EncryptedStorage.setItem('VAULT_KEY', privateKey);
};

export const getVaultKey = async (): Promise<string | null> => {
  return await EncryptedStorage.getItem('VAULT_KEY');
};

export const clearVaultKey = async () => {
  await EncryptedStorage.removeItem('VAULT_KEY');
};
