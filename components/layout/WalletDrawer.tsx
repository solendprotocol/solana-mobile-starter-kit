import React from 'react';
import Typography from '@/components/shared/Typography';
import {FlatList, Image, Pressable, View} from 'react-native';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {useTokens} from '@/components/providers/useTokens';
import {formatAddress} from '@/shared/utils';
import {useWallet} from '@/components/providers/useWallet';
import Button from '@/components/shared/Button';
import Clipboard from '@react-native-community/clipboard';
import {alertAndLog} from '@/shared/alertAndLog';
import Icon from '@/components/shared/Icon';
import ConnectButton from '@/components/ConnectButton';

export default function MenuDrawer({navigation}: DrawerContentComponentProps) {
  const {tokenAccounts} = useTokens();
  const {publicKey, disconnect} = useWallet();

  if (!publicKey) {
    return (
      <View className="w-full h-full justify-center items-center">
        <ConnectButton />
      </View>
    );
  }

  return (
    <>
      <View className="bg-neutralAlt flex w-full p-2 justify-center">
        <Typography textClassName="text-center mb-2" level="headline">
          Account ({formatAddress(publicKey?.toBase58() ?? '')})
        </Typography>
        <View className="flex w-full flex-row justify-between">
          <Button
            variant="tag"
            onPress={() => {
              if (publicKey) {
                Clipboard.setString(publicKey.toBase58());
                alertAndLog('Address copied!', publicKey.toBase58());
              }
            }}>
            <Typography level="caption">
              <Icon name="content-copy" size={8} /> Copy address
            </Typography>
          </Button>
          <Button
            variant="tag"
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
          ...data,
        }))}
        renderItem={tokenAccount => (
          <Pressable
            key={tokenAccount.item.mintAddress}
            className="flex justify-between border-b border-line p-4 w-full flex-row items-center">
            <View className="flex items-center">
              {tokenAccount.item.logoURI && (
                <Image
                  className="overflow-hidden rounded-full w-8 h-8"
                  source={{height: 12, uri: tokenAccount.item.logoURI}}
                  resizeMode="contain"
                />
              )}
              <Typography level="headline">
                {tokenAccount.item.symbol}
              </Typography>
            </View>
            <Typography level="headline">
              {tokenAccount.item.balance.toFixed(4)} {tokenAccount.item.symbol}
            </Typography>
          </Pressable>
        )}
      />
    </>
  );
}
