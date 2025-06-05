import { Wallet, HDNodeWallet, getAddress, isAddress } from 'ethers';

export function createWalletFromMnemonic(mnemonic: string): HDNodeWallet {
  if (!mnemonic || mnemonic.trim() === '') {
    throw new Error('Mnemonic phrase is required');
  }
  return HDNodeWallet.fromPhrase(mnemonic);
}

export function createRandomWallet() {
  const wallet = Wallet.createRandom();
  if (!wallet.mnemonic) {
    throw new Error('Mnemonic not available for this wallet');
  }
  return {
    mnemonic: wallet.mnemonic.phrase,
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}


export function isValidAddress(address: string): boolean {
  try {
    return isAddress(address);
  } catch {
    return false;
  }
}

export function getWalletFromPrivateKey(privateKey: string): Wallet {
  if (!privateKey || privateKey.trim() === '') {
    throw new Error('Private key is required');
  }
  return new Wallet(privateKey);
}

export function toChecksumAddress(address: string): string {
  if (!isValidAddress(address)) {
    throw new Error('Invalid Ethereum address');
  }
  return getAddress(address);
}
