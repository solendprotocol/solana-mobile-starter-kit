import React, {useCallback, useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Typography from '@/components/shared/Typography';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { alertAndLog } from '@/shared/alertAndLog';
import Button from '@/components/shared/Button';
import { useConnection } from '@/components/providers/useConnection';
import { useWallet } from '@/components/providers/useWallet';

export default function AirdropScreen() {
  const {connection} = useConnection();
  const {publicKey} = useWallet();
  const [airdropInProgress, setAirdropInProgress] = useState(false);
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

  return (
    <View className='h-full bg-neutral'>
      <View className='flex items-center justify-center gap-8 pt-24'>
      <Image
        className="h-24"
        source={require('@/assets/vertical_logotype.png')}
        resizeMode='contain'
      />
      <View className='max-w-xs'>
        <Typography level='display'>Request an airdrop from Devnet</Typography>
            <Button
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
