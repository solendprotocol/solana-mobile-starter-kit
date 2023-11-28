import React, { ComponentProps } from 'react';
import {View} from 'react-native';
import colors from '@/colors';
import { formatAddress } from '@/shared/utils';
import Icon from '@/components/shared/Icon';
import Button from '@/components/shared/Button';
import Typography from '@/components/shared/Typography';
import { useWallet } from '@/components/providers/useWallet';
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';

type Props = Readonly<ComponentProps<typeof Button>>;

export default function ConnectButton(props: Props & {navigation?: DrawerNavigationHelpers}) {
  const {connect, publicKey, authorizationInProgress} = useWallet();

  return (
      <Button
        {...props}
        className='border border-line'
        onPress={publicKey ? () => (props.navigation && props.navigation.openDrawer()) : connect}
        disabled={authorizationInProgress}>
        <View className="flex flex-row justify-center items-center">
          <Icon
            name="account-balance-wallet"
            color={colors.neutral}
            size={16}
          />
          <Typography color="neutral" level='caption'>
            {publicKey ? ` ${formatAddress(publicKey.toBase58())}` : "Connect wallet"}
          </Typography>
        </View>
      </Button>
  );
}
