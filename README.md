# Solana Mobile Starter Kit

Welcome to the Solana Mobile Starter Kit.
This template is designed to be friendly to web-first teams and have the scaffolding and examples necessary to quickly jump into building dApps for the Solana Mobile ecosystem.

This React Native dApp is only fully functional on Android. This template is based on the work used to build [Solend Mobile](https://twitter.com/solendprotocol/status/1727355528232464535).

For help getting started with this template, checkout the the #dev-support channel in the [Solend Discord](https://discord.gg/aGXvPNGXDT).

## Features
- Basic routing and navigation via [React Navigation](https://reactnavigation.org/) with a Wallet drawer
- Tailwind support out of the box (via Native Wind)
- Quick configs to incorporate branding
- A familiar useWallet interface wrapping the [Mobile Wallet Adapter](https://github.com/solana-mobile/mobile-wallet-adapter/tree/main/js/packages/mobile-wallet-adapter-protocol) for connecting to wallets and signing transactions/messages
- [web3.js](https://solana-labs.github.io/solana-web3.js/) for constructing transactions and an RPC `connection` client.
- [Anchor TS SDK]([https://solana-labs.github.io/solana-web3.js/](https://github.com/coral-xyz/anchor/tree/master/ts/packages/anchor)) preinstalled
- Examples for:
  - Airdropping Devnet SOL
  - Signing a messaage
  - Transfering SOL via manual creation of instructions
  - Interacting with a sample Counter program via [Anchor]([https://solana-labs.github.io/solana-web3.js/](https://github.com/coral-xyz/anchor/tree/master/ts/packages/anchor))

<table>
  <tr>
    <td align="center">
      <img src="https://github.com/solendprotocol/solana-mobile-starter-kit/assets/89805726/ad33b851-1773-43cf-b857-d6722490b329" alt="Scaffold dApp Screenshot 1" width=300 />
    </td>
    <td align="center">
      <img src="https://github.com/solendprotocol/solana-mobile-starter-kit/assets/89805726/5e317dfe-b459-4645-9965-729b6611fa94" alt="Scaffold dApp Screenshot 3" width=300 />
    </td>
    <td align="center">
      <img src="https://github.com/solendprotocol/solana-mobile-starter-kit/assets/89805726/08ab0cd0-9d3f-43fb-bf17-bb8bb8fe63ee" alt="Scaffold dApp Screenshot 2" width=300 />
    </td>
  </tr>
</table>

## Prerequisites

If you haven't setup a React Native development environment for Android, you'll need to do that first. Follow the [Prerequisite Setup Guide](https://docs.solanamobile.com/getting-started/development-setup).

Follow the guide to make sure you:
- setup your Android and React Native development environment.
- have an Android device or emulator.
- install an MWA compliant wallet app on your device/emulator.
   
## Usage
1. Initialize project template
```
npx react-native init MySolanaDapp --template @solendprotocol/solana-mobile-starter-kit --npm
```
note: The `--npm` flag is only needed if you're using Yarn 3 as a package manager. Once the template is initialized, you can delete the `package-lock.json` and run `yarn install` to continue using Yarn 3.

2. Install dependencies
- `yarn install` or `npm install`
3. Launch the app on your Android device/emulator
- `npx react-native run-android`

## Configuring
- Logo and Splash screen
  - [Generate image sets](https://www.appicon.co/#image-sets) and replace `android/app/src/main/res/drawable-*/splash.png` files
- Colors and Typography
  - Configure `components/shared/Typography.tsx` and `colors.js`
- configure relative metadata in `shared/configs.tsx`

## Troubleshooting
  
- `flex-gap is behaving weirdly in child components` 
  - This is a known issue in Nativewind. Attempt the workarounds [here](https://github.com/styled-components/styled-components/issues/3628).

<br>

- `TypeError: cli.init is not a function` 
  - This during template initialization means you have an old version of React Native CLI. 
This template only works with the new CLI. You can uninstall and reinstall it as directed [here](https://stackoverflow.com/questions/72768245/typeerror-cli-init-is-not-a-function-for-react-native).

<br>

- `error Failed to load configuration of your project.`
  - Same as above, but for `yarn`. [Uninstall and reinstall](https://github.com/react-native-community/cli#updating-the-cli) the CLI through yarn.

<br>

- `Looks like your iOS environment is not properly set`:
  -  You can ignore this during template initialization and build the Android app as normal. This template is only compatible with Android.

<br>

- `Usage Error: It seems you are trying to add a package using a https:... url; we now require package names to be explicitly specified.`
  - This error happens on certain versions of `yarn`, and occurs if you try to initialize the template through the Github repo URL, rather than the npm package. To avoid this, use the `@solana-mobile/solana-mobile-dapp-scaffold` package as specified, or downgrade your `yarn` version to classic (1.22.x).

<br>

- `error Couldn't find the ".../@solana-mobile/solana-mobile-dapp-scaffold/template.config.js file inside "@solana-mobile/solana-mobile-dapp-scaffold" template.`
  - This is a [known error](https://github.com/react-native-community/cli/issues/1924) that occurs with certain versions of `yarn` (>= 3.5.0). It is fixed by running the cli command with the `--npm` flag or downgrading your version of `yarn`.

