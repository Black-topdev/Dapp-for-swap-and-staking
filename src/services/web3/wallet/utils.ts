import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import {
  injected,
  walletconnect,
  walletlink,
  fortmatic,
  portis,
  torus,
} from 'services/web3/wallet/connectors';

import metamaskLogo from 'assets/logos/metamask.png';
import fortmaticLogo from 'assets/logos/fortmatic.svg';
import portisLogo from 'assets/logos/portis.png';
import walletConnectLogo from 'assets/logos/walletConnect.svg';
import coinbaseWalletLogo from 'assets/logos/coinbaseWallet.svg';
import ledgerLogo from 'assets/logos/ledger.svg';
import trezorLogo from 'assets/logos/trezor.svg';
import torusLogo from 'assets/logos/torus.svg';

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(
    provider,
    typeof provider.chainId === 'string'
      ? parseInt(provider.chainId)
      : typeof provider.chainId === 'number'
      ? provider.chainId
      : 'any'
  );
  library.pollingInterval = 15000;
  return library;
};

export interface WalletInfo {
  connector?: AbstractConnector;
  name: string;
  icon: string;
  mobile?: boolean;
  url?: string;
}

export const SUPPORTED_WALLETS: WalletInfo[] = [
  {
    connector: injected,
    name: 'MetaMask',
    icon: metamaskLogo,
    mobile: true,
  },
  {
    connector: walletconnect,
    name: 'WalletConnect',
    icon: walletConnectLogo,
    mobile: true,
  },
  {
    connector: walletlink,
    name: 'Coinbase Wallet',
    icon: coinbaseWalletLogo,
    mobile: true,
  },
  {
    name: 'Ledger',
    icon: ledgerLogo,
    url: 'https://www.ledger.com/academy/security/the-safest-way-to-use-metamask',
  },
  {
    name: 'Trezor',
    icon: trezorLogo,
    url: 'https://wiki.trezor.io/Apps:MetaMask',
  },
  {
    connector: fortmatic,
    name: 'Fortmatic',
    icon: fortmaticLogo,
    mobile: true,
  },
  {
    connector: portis,
    name: 'Portis',
    icon: portisLogo,
  },
  {
    connector: torus,
    name: 'Torus',
    icon: torusLogo,
  },
];
