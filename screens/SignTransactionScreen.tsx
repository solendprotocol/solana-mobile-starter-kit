import React, { useState } from 'react';
import {Image, View} from 'react-native';
import Typography from '@/components/shared/Typography';
import { alertAndLog } from '@/shared/alertAndLog';
import Button from '@/components/shared/Button';
import { useWallet } from '@/components/providers/useWallet';
import Input from '@/components/shared/Input';

export default function SignTransactionScreen() {
  const [inputMessage, setInputMessage] = useState<string>('');
  const { signMessage, authorizationInProgress } = useWallet();

  return (
    <View className='h-full bg-neutral'>
      <View className='flex items-center justify-center pt-24'>
      <Image
        className="h-24"
        source={require('@/assets/vertical_logotype.png')}
        resizeMode='contain'
      />
      <View className='max-w-xs flex mt-4 items-center'>
        <Typography level='title'>Send deposit some SOL to devnet Solend</Typography>
        <Input
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
          className='text-center'
          placeholder='Enter message to sign'
        />
            <Button
            full
          disabled={authorizationInProgress}
          onPress={async () => {
            if (authorizationInProgress) {
              return;
            }
            try {
              const signedMessage = await signMessage(inputMessage);
              alertAndLog(
                'Message signed successful:',
                signedMessage
              );
            } catch (err: any) {
              alertAndLog(
                'Failed to sign message:',
                err instanceof Error ? err.message : err,
              );
            }
          }}
        ><Typography color="neutral" level='caption'>Sign Message</Typography></Button>
      </View>
      </View>
    </View>
  );
}
