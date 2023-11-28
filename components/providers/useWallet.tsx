import {PublicKey, Transaction, TransactionConfirmationStrategy} from '@solana/web3.js';
import {
  AuthorizeAPI,
  Base64EncodedAddress,
  DeauthorizeAPI,
  ReauthorizeAPI,
} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {Web3MobileWallet, transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {toUint8Array} from 'js-base64';
import React, {useState, useCallback, useMemo, ReactNode, useEffect} from 'react';
import { alertAndLog } from '@/shared/alertAndLog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RPC_ENDPOINT, useConnection} from './useConnection';
import { APP_IDENTITY } from '@/shared/configs';

function getPublicKeyFromAddress(address: Base64EncodedAddress): PublicKey {
  const publicKeyByteArray = toUint8Array(address);
  return new PublicKey(publicKeyByteArray);
}

export interface WalletContext {
  publicKey: PublicKey | null;
  connect: () => void;
  disconnect: () => void
  authorizationInProgress: boolean;
  sendTransaction: (txn: Transaction) => Promise<TransactionConfirmationStrategy | undefined>;
}

const WalletContext = React.createContext<WalletContext>({
  connect: () => {
    throw new Error('useWallet not initialized');
  },
  disconnect: () => {
    throw new Error('useWallet not initialized');
  },
  sendTransaction: () => {
    throw new Error('useWallet not initialized');
  },
  publicKey: null,
  authorizationInProgress: false
});

function WalletProvider({autoconnect = true, children}: {children: ReactNode, autoconnect?: boolean}) {
  const [
    authorizationInProgress,
    setAuthorizationInProgress
  ] = useState(false);
  const [
    signingInProgress,
    setSigningInProgress
  ] = useState(false);
  const { connection } = useConnection();
  const [authorization, setAuthorization] = useState<{
    publicKey: PublicKey;
    authToken: string;
  } | null>(null);

  async function autoConnect() {
    const [cachedAuthToken, cachedBase64Address] = await Promise.all([
      AsyncStorage.getItem('authToken'),
      AsyncStorage.getItem('base64Address'),
    ]);
    if (cachedBase64Address && cachedAuthToken) {
      const pubkeyAsByteArray = getPublicKeyFromAddress(cachedBase64Address);
      setAuthorization({
        publicKey: pubkeyAsByteArray,
        authToken: cachedAuthToken,
      });
    }
  }

  useEffect(() => {
    if (autoconnect) {
      autoConnect();
    }
  }, []);

  const authorizeSession = useCallback(
    async (wallet: AuthorizeAPI & ReauthorizeAPI) => {
      const authorizationResult = await (authorization
        ? wallet.reauthorize({
            auth_token: authorization.authToken,
            identity: APP_IDENTITY,
          })
        : wallet.authorize({
            cluster: RPC_ENDPOINT,
            identity: APP_IDENTITY,
          }));

      const firstAccount = authorizationResult.accounts[0];
      AsyncStorage.setItem('authToken', authorizationResult.auth_token);
      AsyncStorage.setItem('base64Address', firstAccount.address);
      setAuthorization({
        authToken: authorizationResult.auth_token,
        publicKey: getPublicKeyFromAddress(firstAccount.address),
      });
      return;
    },
    [authorization],
  );

  const sendTransaction = useCallback(
    async (txn: Transaction): Promise<TransactionConfirmationStrategy | undefined> => {
      const signedTransaction = await transact(
        async (walletArg: Web3MobileWallet) => {
          await Promise.all([
            authorizeSession(walletArg),
            connection.getLatestBlockhash(),
          ]);

          const signedTransactions = await walletArg.signTransactions({
            transactions: [txn],
          });

          return signedTransactions[0];
        },
      );

      if (signingInProgress) {
        return undefined;
      }

      setSigningInProgress(true);
      try {
        const latestBlockhash = await connection.getLatestBlockhash();
        const signature = await connection.sendRawTransaction(
          signedTransaction!.serialize(),
        );
        return {
          signature,
          ...latestBlockhash
        };
      } catch (err: any) {
        alertAndLog(
          'Error during signing',
          err instanceof Error ? err.message : err,
        );
      } finally {
        setSigningInProgress(false);
      }
    },
    [authorizeSession, connection, signingInProgress],
  );  

  const connect = useCallback(async () => {
    try {
      if (authorizationInProgress) {
        return;
      }
      setAuthorizationInProgress(true);
      await transact(async wallet => {
        await authorizeSession(wallet);
      });
    } catch (err: any) {
      alertAndLog(
        'Error during connect',
        err instanceof Error ? err.message : err,
      );
    } finally {
      setAuthorizationInProgress(false);
    }
  }, [authorizationInProgress, authorizeSession]);

  const disconnect = useCallback(async () => {
    transact(async wallet => {
      await deauthorizeSession(wallet);
    });
  }, [authorizationInProgress, authorizeSession]);

  const deauthorizeSession = useCallback(
    async (wallet: DeauthorizeAPI) => {
      if (authorization?.authToken == null) {
        return;
      }
      await wallet.deauthorize({auth_token: authorization.authToken});
      AsyncStorage.clear();
      setAuthorization(null);
    },
    [authorization, setAuthorization],
  );

  const value = useMemo(
    () => ({
      connect,
      disconnect,
      publicKey: authorization?.publicKey ?? null,
      authorizationInProgress,
      sendTransaction
    }),
    [
      connect,
      disconnect,
      authorization?.publicKey,
      authorizationInProgress,
      sendTransaction
    ],
  );

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

const useWallet = () => React.useContext(WalletContext);

export {WalletProvider, useWallet};
