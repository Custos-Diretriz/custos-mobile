import {Platform} from "react-native";

export const getCustomWallets = () => {
  const wallets = [
    // {
    //   id: 'rn-wallet',
    //   name: 'Wallet(RN)',
    //   image_url:
    //     'https://github.com/reown-com/reown-docs/blob/main/static/assets/home/walletkitLogo.png?raw=true',
    //   mobile_link: 'rn-web3wallet://',
    //   link_mode: 'https://appkit-lab.reown.com/rn_walletkit',
    // },
    // {
    //   id: 'flutter-wallet',
    //   name: 'Wallet(Flutter)',
    //   image_url:
    //     'https://github.com/reown-com/reown-docs/blob/main/static/assets/home/walletkitLogo.png?raw=true',
    //   mobile_link: 'wcflutterwallet://',
    //   link_mode: 'https://appkit-lab.reown.com/flutter_walletkit',
    // },
    // Bravoos Wallet
    {
      id: 'bravoos-wallet',
      name: 'Bravoos',
      image_url:
        'https://bravoos-wallet.io/logo.png', // Update this with the actual image URL
      mobile_link: 'bravoos://',
      link_mode: 'https://bravoos-wallet.io/download',
    },
    // Argent Wallet
    {
      id: 'argent-wallet',
      name: 'Argent',
      image_url:
        'https://cdn.prod.website-files.com/6602a0963a1822665f363ebf/660d47f2fac9c4d8c283dd75_argent%20logo.svg', // Update this with the actual image URL
      mobile_link: 'argent://',
      link_mode: 'https://argent.xyz/download',
    },
  ];

  if (Platform.OS === 'android') {
    wallets.push({
      id: 'android-wallet',
      name: 'Wallet(Android)',
      image_url:
        'https://github.com/reown-com/reown-docs/blob/main/static/assets/home/walletkitLogo.png?raw=true',
      mobile_link: 'kotlin-web3wallet://',
      link_mode: 'https://appkit-lab.reown.com/wallet_release',
    });
  } else if (Platform.OS === 'ios') {
    wallets.push({
      id: 'ios-wallet',
      name: 'Wallet(iOS)',
      image_url:
        'https://github.com/reown-com/reown-docs/blob/main/static/assets/home/walletkitLogo.png?raw=true',
      mobile_link: 'walletapp://',
      link_mode: 'https://appkit-lab.reown.com/wallet',
    });
  }

  return wallets;
};
