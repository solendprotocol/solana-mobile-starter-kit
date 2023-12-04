import React, {useCallback, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Typography from '@/components/shared/Typography';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { alertAndLog } from '@/shared/alertAndLog';
import Button from '@/components/shared/Button';
import { useConnection } from '@/components/providers/useConnection';
import { useWallet } from '@/components/providers/useWallet';
import { useTokens } from '@/components/providers/useTokens';
import { NATIVE_MINT } from '@solana/spl-token';

export default function AirdropScreen() {
  const {connection} = useConnection();
  const {publicKey} = useWallet();
  const [airdropInProgress, setAirdropInProgress] = useState(false);
  const { tokenAccounts} = useTokens();
  const requestAirdrop = useCallback(async () => {
    if (!publicKey) {
      return;
    }
    const latestBlockhash = await connection.getLatestBlockhash();
    const signature = await connection.requestAirdrop(
      publicKey,
      LAMPORTS_PER_SOL,
    );

    return await connection.confirmTransaction({
      signature,
      ...latestBlockhash
    });
  }, [connection, publicKey]);

  const solAccount = tokenAccounts[NATIVE_MINT.toBase58()];

  return (
    <View className='h-full bg-neutral'>
      <View className='flex items-center justify-center pt-24'>
      <Image
        className="h-24"
        source={require('@/assets/vertical_logotype.png')}
        resizeMode='contain'
      />
      <View className='max-w-xs flex mt-4 items-center'>
        <Typography level='title'>Request an airdrop from Devnet</Typography>
            <Button
            className='my-4'
            full
          disabled={airdropInProgress}
          onPress={async () => {
            if (airdropInProgress) {
              return;
            }
            setAirdropInProgress(true);
            try {
              await requestAirdrop();
              alertAndLog(
                'Funding successful:',
                String(convertLamportsToSOL(LAMPORTS_PER_SOL)) +
                  ' SOL added to ' +
                  publicKey,
              );
            } catch (err: any) {
              alertAndLog(
                'Failed to fund account:',
                err instanceof Error ? err.message : err,
              );
            } finally {
              setAirdropInProgress(false);
            }
          }}
        ><Typography color="neutral" level='caption'>Request Airdrop</Typography></Button>
        <Typography>Current balance: {solAccount?.balance?.toFixed(4) ?? '0'} SOL</Typography>
      </View>
      </View>
    </View>
  );
}

function convertLamportsToSOL(lamports: number) {
  return new Intl.NumberFormat(undefined, {maximumFractionDigits: 1}).format(
    (lamports || 0) / LAMPORTS_PER_SOL,
  );
}
