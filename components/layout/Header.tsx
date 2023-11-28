import ConnectButton from '@/components/ConnectButton';
import Icon from '@/components/shared/Icon';
import colors from '@/colors';
import { DrawerNavigationHelpers, DrawerNavigationProp } from '@react-navigation/drawer/lib/typescript/src/types';
import { ParamListBase } from '@react-navigation/native';
import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';

export function Header({
  leftNavigation,
  rightNavigation,
}: {
  leftNavigation: DrawerNavigationProp<ParamListBase>;
  rightNavigation: DrawerNavigationHelpers;
}) {
  return (
      <View className="px-4 bg-neutral border-b border-line flex flex-row justify-between items-center">
        <View className="flex flex-row justify-between items-center">
          <TouchableOpacity
            onPress={() => leftNavigation.openDrawer()}
            className="flex justify-center mr-6">
            <Icon name="menu" size={30} color={colors.primary} />
          </TouchableOpacity>
          <Image
            className="w-40"
            source={require('@/assets/logotype.png')}
            resizeMode='contain'
          />
        </View>
        <ConnectButton navigation={rightNavigation} />
      </View>
  );
}
