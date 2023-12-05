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
      <View className='mt-8 max-w-xs flex items-center'>
        <Typography level='title'>Sign a message</Typography>
        <Input
          value={inputMessage}
          innerClassName='text-center border border-line mt-8 w-64'
          onChangeText={(text) => setInputMessage(text)}
          placeholder='Enter a message to sign'
        />
            <Button
            className='mt-8'
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
