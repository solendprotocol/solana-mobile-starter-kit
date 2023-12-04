import {Alert, AlertButton, Linking} from 'react-native';

export function alertAndLog(title: string, message: any, signature?: string) {
  setTimeout(async () => {
    Alert.alert(title, message, [{text: 'Ok', style: 'cancel'}, signature ? 
    {
        text: 'View on Solscan',
        style: 'default',
        onPress: () => Linking.openURL(`https://solscan.io/tx/${signature}?cluster=devnet`)
    } : null].filter(Boolean) as Array<AlertButton>);
  }, 100);
}
