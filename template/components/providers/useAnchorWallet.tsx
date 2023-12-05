import {useMemo} from 'react';
import * as anchor from '@coral-xyz/anchor';
import {Transaction} from '@solana/web3.js';
import {useWallet} from '@/components/providers/useWallet';

export function useAnchorWallet() {
  const {signAllTransactions, publicKey} = useWallet();
  return useMemo(() => {
    if (!publicKey) {
      return null;
    }

    return {
      signTransaction: async (transaction: Transaction) =>
        (await signAllTransactions([transaction]))[0],
      signAllTransactions,
      get publicKey() {
        return publicKey;
      },
    } as anchor.Wallet;
  }, [signAllTransactions, publicKey]);
}
