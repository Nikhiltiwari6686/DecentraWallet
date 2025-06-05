import { useContext, useEffect, useState } from 'react';
import { ethers, Contract } from 'ethers';
import { WalletContext } from '../context/WalletContext';
import todoListJson from '../abis/TodoList.json';

type TodoListAbiType = {
  abi: any[];
  address: string;
};

const contractData = todoListJson as unknown as TodoListAbiType;

export const useTodoContract = () => {
  const { signer } = useContext(WalletContext);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    if (!signer) {
      setContract(null);
      return;
    }
    const contractInstance = new Contract(contractData.address, contractData.abi, signer);
    setContract(contractInstance);
  }, [signer]);

  return contract;
};
