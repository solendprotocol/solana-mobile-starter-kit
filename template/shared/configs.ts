import app from '../app.json';

import {Cluster} from '@solana/web3.js';

export type ENV = 'mainnet-beta' | 'testnet' | 'devnet' | 'localnet';

export const CLUSTER_TO_CHAIN_ID: Record<ENV, number> = {
  'mainnet-beta': 101,
  testnet: 102,
  devnet: 103,
  localnet: 103,
};

export const CLUSTER: Cluster = 'devnet';
export const CHAIN_ID = CLUSTER_TO_CHAIN_ID[CLUSTER];

export const DEVNET_SOL_TOKEN_INFO = {
  address: 'So11111111111111111111111111111111111111112',
  chainId: 103,
  decimals: 9,
  name: 'Wrapped SOL',
  symbol: 'SOL',
  logoURI:
    'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  tags: ['old-registry'],
  extensions: {},
};

// Configure metadata shown during signature in wallet
export const APP_IDENTITY = {
  name: app.displayName,
  uri: 'https://solana.com',
  icon: 'favicon.ico',
};

export const LOGO_TYPE = '@/assets/logotype.png';
