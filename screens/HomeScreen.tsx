import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Typography from '@/components/shared/Typography';

export default function HomeScreen() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View className='h-full bg-neutral'>
      <View className='flex items-center justify-center pt-36'>
      <Image
        className="h-24"
        source={require('@/assets/vertical_logotype.png')}
        resizeMode='contain'
      />
      <View className='max-w-xs mt-8'>
        <Typography level='display'>Welcome!</Typography>
      </View>
      <View className='mt-8'>
        <Typography level='headline'>To get started, theme the app to your brand:</Typography>
          <Typography level='headline'>· Click the Menu Icon to explore demos</Typography>
          <Typography level='headline'>· Theme your app in config.ts</Typography>
          <Typography level='headline'>· Make transactions</Typography>
      </View>
      </View>
    </View>
  );
}