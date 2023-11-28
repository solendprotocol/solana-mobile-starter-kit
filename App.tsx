import {clusterApiUrl} from '@solana/web3.js';
import {WalletProvider} from '@/components/providers/useWallet';
import {TokensProvider} from '@/components/providers/useTokens';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '@/screens/HomeScreen';
import { Header } from '@/components/layout/Header';
import {
  ConnectionProvider,
  RPC_ENDPOINT,
} from '@/components/providers/useConnection';
import MenuDrawer from '@/components/layout/MenuDrawer';
import { NavigationContainer } from '@react-navigation/native';
import Loading from '@/components/shared/Loading';
import { Suspense, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerHeaderProps, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { colors } from '@/colors';
import WalletDrawer from '@/components/layout/WalletDrawer';
import AirdropScreen from '@/screens/AirdropScreen';


const DemoApp = createDrawerNavigator();

const MainAppContainer = ({navigation}: {navigation: DrawerNavigationHelpers}) => {
  const CustomHeader = useCallback((props: DrawerHeaderProps) => (
    <Header
      leftNavigation={props.navigation}
      rightNavigation={navigation}
    />
  ), [navigation])

  return (
    <>
    <DemoApp.Navigator
      screenOptions={{
        drawerPosition: 'left',
        swipeEdgeWidth: 100,
        header: CustomHeader,
        drawerActiveBackgroundColor: colors.neutral,
        drawerStyle: {
          backgroundColor: colors.neutral
        }
      }}
      drawerContent={MenuDrawer}
    >
      <DemoApp.Screen name="Home" component={HomeScreen}/>
      <DemoApp.Screen name="Request Airdrop" component={AirdropScreen}/>
    </DemoApp.Navigator>
    </>
  );
};

const WalletDrawerContainer = createDrawerNavigator();
const WalletContainer = () => {
  return (
    <WalletDrawerContainer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        swipeEdgeWidth: 100,
        drawerActiveBackgroundColor: colors.neutral,
        drawerStyle: {
          backgroundColor: colors.neutral
        }
      }}
      backBehavior="none"
      drawerContent={WalletDrawer}
    >
      <WalletDrawerContainer.Screen name="MainApp" component={MainAppContainer} />
    </WalletDrawerContainer.Navigator>
  );
};


export default function App() {
  return (
    <Suspense fallback={<Loading full />}>
      <ConnectionProvider
        config={{commitment: 'processed'}}
        endpoint={clusterApiUrl(RPC_ENDPOINT)}>
        <WalletProvider>
            <TokensProvider>
          <NavigationContainer>
            <SafeAreaView className='h-full'>
              <WalletContainer  />
            </SafeAreaView>
          </NavigationContainer>
            </TokensProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Suspense>
  );
}
