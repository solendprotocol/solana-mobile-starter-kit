import React from 'react';
import Typography from '@/components/shared/Typography';
import {FlatList, Pressable, View} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useTokens } from '@/components/providers/useTokens';
import { formatAddress } from '@/shared/utils';
import { useWallet } from '@/components/providers/useWallet';
import Button from '@/components/shared/Button';
import Clipboard from '@react-native-community/clipboard';
import { alertAndLog } from '@/shared/alertAndLog';
import Icon from '@/components/shared/Icon';
import ConnectButton from '@/components/ConnectButton';

export default function MenuDrawer({navigation}: DrawerContentComponentProps) {
  const { tokenAccounts} = useTokens();
  const { publicKey, disconnect } = useWallet();

  if (!publicKey) {
    return (
      <View className="w-full h-full justify-center items-center">
        <ConnectButton />
      </View>
    );
  }

  return (
    <><View className='flex w-full p-2 mb-2 justify-center'><Typography level="headline">
    Account ({formatAddress(publicKey?.toBase58() ?? '')})
  </Typography>
  <View className="flex w-full flex-row mt-2 justify-between">
    <Button
      buttonStyle="tag"
      onPress={() => {
        if (publicKey) {
          Clipboard.setString(publicKey.toBase58());
          alertAndLog('Address copied!', publicKey);
        }
      }}>
      <Typography level="caption">
        <Icon name="content-copy" size={8} /> Copy address
      </Typography>
    </Button>
    <Button
      buttonStyle="tag"
      onPress={() => {
        disconnect();
        navigation.closeDrawer();
      }}>
      <Typography level="caption">
        <Icon name="logout" size={8} /> Disconnect
      </Typography>
    </Button>
  </View>
  </View>
  <FlatList
        className="w-full border-t border-line"
        data={Object.entries(tokenAccounts).map(([address, data]) => ({
            mintAddress: address,
            ...data
        }))}
        renderItem={tokenAccount => (
          <Pressable
            key={tokenAccount.item.mintAddress}
            className="flex border-b border-line p-4 w-full">
            <Typography level='title'>
              {tokenAccount.item.symbol}: {tokenAccount.item.balance.toFixed(4)}
            </Typography>
          </Pressable>
        )}
      /></>
     
  );
}
