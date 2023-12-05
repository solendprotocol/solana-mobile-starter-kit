import React, {useState} from 'react';
import {Image, View} from 'react-native';
import Typography from '@/components/shared/Typography';
import {alertAndLog} from '@/shared/alertAndLog';
import Button from '@/components/shared/Button';
import {useWallet} from '@/components/providers/useWallet';
import Input from '@/components/shared/Input';
import {
  PublicKey,
  Transaction,
  LAMPORTS_PER_SOL,
  SystemProgram,
} from '@solana/web3.js';

function validateSolAddress(address: string) {
  try {
    let pubkey = new PublicKey(address);
    let isSolana = PublicKey.isOnCurve(pubkey.toBuffer());
    return isSolana;
  } catch (error) {
    return false;
  }
}

export default function SendTransactionScreen() {
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const {sendTransaction, authorizationInProgress, publicKey} = useWallet();

  const validRecipient = validateSolAddress(recipientAddress);
  const parsedAmount = Number(amount);
  const validAmount = !isNaN(parsedAmount);
  return (
    <View className="h-full bg-neutral">
      <View className="flex items-center justify-center pt-24">
        <Image
          className="h-24"
          source={require('@/assets/vertical_logotype.png')}
          resizeMode="contain"
        />
        <View className="max-w-xs flex mt-8 items-center">
          <Typography level="title">Transfer SOL to address</Typography>
          <Input
            value={recipientAddress}
            onChangeText={text => setRecipientAddress(text)}
            innerClassName="text-center border border-line mt-8 w-64"
            placeholder="Enter recipient address"
          />
          {recipientAddress && !validRecipient && (
            <Typography level="caption" color="brand">
              Not a valid address
            </Typography>
          )}
          <Input
            value={amount.toString()}
            onChangeText={text => setAmount(text)}
            innerClassName="text-center border border-line mt-8 w-64"
            placeholder="Enter amount to send"
          />
          {amount && !validAmount && (
            <Typography level="caption" color="brand">
              Not a valid amount
            </Typography>
          )}
          <Button
            className="mt-8"
            full
            disabled={
              authorizationInProgress || !validRecipient || !validAmount
            }
            onPress={async () => {
              if (!publicKey || !validAmount || !validRecipient) {
                return;
              }
              const ix = SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: new PublicKey(recipientAddress),
                lamports: Math.floor(parsedAmount * LAMPORTS_PER_SOL),
              });

              if (authorizationInProgress) {
                return;
              }

              try {
                const signature = await sendTransaction(
                  new Transaction().add(ix),
                );
                alertAndLog(
                  'Transaction successful:',
                  signature?.signature,
                  signature?.signature,
                );
              } catch (err: any) {
                alertAndLog(
                  'Failed to sign message:',
                  err instanceof Error ? err.message : err,
                );
              }
            }}>
            <Typography color="neutral" level="caption">
              Send {amount} SOL
            </Typography>
          </Button>
        </View>
      </View>
    </View>
  );
}
