import { Cluster } from "@solana/web3.js"
import BN from 'bn.js';
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import BigNumber from "bignumber.js";

const ADDRESS_PREFIX_SUFFIX_LENGTH = 6;

export const formatAddress = (address: string, length?: number) => {
  return `${address.slice(
    0,
    length ?? ADDRESS_PREFIX_SUFFIX_LENGTH
  )}...${address.slice(-(length ?? ADDRESS_PREFIX_SUFFIX_LENGTH))}`;
};

export const DECIMALS_PER_SOL = LAMPORTS_PER_SOL.toString().length - 1;
export function fromUnits(lamportsAmount: BN | number, decimals: number): number {
  const amount = BN.isBN(lamportsAmount) ? lamportsAmount : lamportsAmount;

  const base = 10;
  const precision = new BigNumber(base).pow(decimals);

  return new BigNumber(amount.toString()).div(precision).toNumber();
}

export function toUnits(lamportsAmount: BN | number, decimals: number): number {
    let amount = BN.isBN(lamportsAmount) ? lamportsAmount.toNumber() : Number(lamportsAmount);

    if (Number.isNaN(amount)) {
        amount = 0;
    }
    const precision = Math.pow(10, decimals);

    return Math.floor(amount * precision);
}
