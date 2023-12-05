import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import Typography from '@/components/shared/Typography';
import Button from '@/components/shared/Button';
import {useCounterProgram} from '@/components/providers/useCounterProgram';
import {useAnchorWallet} from '@/components/providers/useAnchorWallet';

export default function SendAnchorTransactionScreen() {
  const anchorWallet = useAnchorWallet();
  const {counterValue, fetchAndUpdateCounter, incrementCounter} =
    useCounterProgram(anchorWallet);

  useEffect(() => {
    fetchAndUpdateCounter();
  }, [fetchAndUpdateCounter]);

  return (
    <View className="h-full bg-neutral">
      <View className="flex items-center justify-center pt-24">
        <Image
          className="h-24"
          source={require('@/assets/vertical_logotype.png')}
          resizeMode="contain"
        />
        <View className="mt-8 max-w-xs flex items-center">
          <Typography level="title">Counter: {counterValue}</Typography>
        </View>
        <Button className="mt-8" onPress={() => incrementCounter()}>
          <Typography level="caption" color="neutral">
            Increment counter
          </Typography>
        </Button>
      </View>
    </View>
  );
}
