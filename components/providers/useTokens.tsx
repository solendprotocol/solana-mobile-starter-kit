import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useConnection } from '@/components/providers/useConnection';
import { useWallet } from '@/components/providers/useWallet';
import { NATIVE_MINT, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { DECIMALS_PER_SOL, fromUnits } from '@/shared/utils';
import { TokenAccountType, TokenInfoType } from '@/shared/types';
import { CHAIN_ID, CLUSTER, DEVNET_SOL_TOKEN_INFO } from '@/shared/configs';

export type PreferredTokenListMode = 'all' | 'strict';

export type TokenData = TokenAccountType & TokenInfoType;

interface TokensContext {
  tokenAccounts: Record<string, TokenData>;
  loading: boolean;
  refresh: () => void;
}

interface ParsedTokenData {
  account: {
    data: {
      parsed: {
        info: {
          isNative: boolean;
          mint: string;
          owner: string;
          state: string;
          tokenAmount: {
            amount: string;
            decimals: number;
            uiAmount: number;
            uiAmountString: string;
          };
        };
        type: string;
      };
      program: string;
      space: number;
    };
    executable: boolean;
    lamports: number;
    owner: PublicKey;
    rentEpoch?: number;
  };
  pubkey: PublicKey;
}

const AccountContext = React.createContext<TokensContext>({
  tokenAccounts: {},
  loading: true,
  refresh: () => {},
});

const TokensProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const [loading, setLoading] = useState(false);
  const [tokenAccounts, setTokenAccounts] = useState<Record<string, TokenData>>({});

  const fetchNative = async () => {
    if (!publicKey ) return null;

    const response = await connection.getAccountInfo(publicKey);
    if (response) {
      return {
        balance: fromUnits(response?.lamports || 0, DECIMALS_PER_SOL),
        balanceLamports: new BN(response?.lamports || 0),
        hasBalance: response?.lamports ? response?.lamports > 0 : false,
        decimals: 9,
      };
    }
  };


const fetchAllTokenInfos = async (preferredTokenListMode: PreferredTokenListMode) => {
  const tokens: Array<TokenInfoType> = await (preferredTokenListMode === 'strict'
    ? await fetch('https://token.jup.ag/strict')
    : await fetch('https://token.jup.ag/all')
  ).json();

  if (CLUSTER === 'devnet') {
    tokens.push(DEVNET_SOL_TOKEN_INFO);
  }

  const list = tokens.filter(token => token.chainId === CHAIN_ID);

  const tokenMap = list.reduce((acc, item) => {
    acc.set(item.address, item);
    return acc;
  }, new Map());

  return tokenMap
};

  const fetchAllTokens = async () => {
    if (!publicKey) return {};

    const response = await connection.getParsedTokenAccountsByOwner(
      publicKey,
      { programId: TOKEN_PROGRAM_ID },
      'confirmed',
    );

    const reducedResult = response.value.reduce((acc, item: ParsedTokenData) => {
      acc[item.account.data.parsed.info.mint] = {
        balance: item.account.data.parsed.info.tokenAmount.uiAmount,
        balanceLamports: new BN(0),
        hasBalance: item.account.data.parsed.info.tokenAmount.uiAmount > 0,
        decimals: item.account.data.parsed.info.tokenAmount.decimals,
      };
      return acc;
    }, {} as Record<string, TokenAccountType>);

    return reducedResult;
  };

  const refresh = async () => {
    if (!publicKey) {
      setTokenAccounts({});
      return;
    }

    // Fetch all tokens balance
    const [nativeAccount, accounts, tokenInfos] = await Promise.all([fetchNative(), fetchAllTokens(), fetchAllTokenInfos('strict')]);

    setTokenAccounts({
      ...Object.fromEntries(Object.entries(accounts).map(([mintAddress, account]) => ({
        ...account,
        ...tokenInfos.get(mintAddress)
      }))),
      ...(nativeAccount ? {
        [NATIVE_MINT.toString()]: {...nativeAccount, ...tokenInfos.get(NATIVE_MINT.toBase58())}
      } : {})
    });
    setLoading(false);
  };

  // Fetch all accounts for the current wallet
  useEffect(() => {
    refresh();
  }, [publicKey]);

  return <AccountContext.Provider value={{ tokenAccounts, loading, refresh }}>{children}</AccountContext.Provider>;
};

const useTokens = () => {
  return useContext(AccountContext);
};

export { TokensProvider, useTokens };