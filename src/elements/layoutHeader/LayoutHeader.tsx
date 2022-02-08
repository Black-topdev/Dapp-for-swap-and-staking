import { useWeb3React } from '@web3-react/core';
import { EthNetworks } from 'services/web3/types';
import { NotificationsMenu } from 'elements/notifications/NotificationsMenu';
import { SettingsMenu } from 'elements/settings/SettingsMenu';
import { LayoutHeaderMobile } from 'elements/layoutHeader/LayoutHeaderMobile';
import { ReactComponent as IconHamburger } from 'assets/icons/hamburger.svg';
import { ReactComponent as IconLogo } from 'assets/logos/Logo.svg';
import 'elements/layoutHeader/LayoutHeader.css';
import { getNetworkName } from 'utils/helperFunctions';
import { useWalletConnect } from '../walletConnect/useWalletConnect';
import { WalletConnectModal } from '../walletConnect/WalletConnectModal';
import { WalletConnectButton } from '../walletConnect/WalletConnectButton';
import { MarketingBannerMobile } from '../marketingBanner/MarketingBannerMobile';
import { useAppSelector } from 'redux/index';

interface LayoutHeaderProps {
  isMinimized: boolean;
  setIsSidebarOpen: Function;
}

export const LayoutHeader = ({
  isMinimized,
  setIsSidebarOpen,
}: LayoutHeaderProps) => {
  const { chainId } = useWeb3React();
  const wallet = useWalletConnect();
  const showBanner = useAppSelector<boolean>((state) => state.user.showBanner);

  return (
    <>
      <header className="layout-header">
        <div
          className={`transition-all duration-500 ${
            isMinimized ? 'ml-[96px]' : 'ml-[230px]'
          } mr-30 w-full`}
        >
          <div className="layout-header-content">
            <div className="flex items-center">
              <button className="btn-secondary dark:bg-dark-2 btn-sm">
                <div
                  className={`${
                    !chainId || chainId === EthNetworks.Mainnet
                      ? 'bg-success'
                      : chainId === EthNetworks.Ropsten
                      ? 'bg-error'
                      : 'bg-warning'
                  } w-6 h-6 rounded-full mr-10`}
                />
                {getNetworkName(chainId ? chainId : EthNetworks.Mainnet)}
              </button>
            </div>

            <div className="flex items-center">
              <WalletConnectButton {...wallet} />
              <NotificationsMenu />
              <span className="text-grey-3 text-20 mx-16">|</span>
              <SettingsMenu />
            </div>
          </div>
        </div>
      </header>
      <LayoutHeaderMobile>
        <button onClick={() => setIsSidebarOpen(true)}>
          <IconHamburger className="w-[27px]" />
        </button>
        <div className="flex justify-center">
          <a href="/swap">
            <IconLogo className="w-[25px]" />
          </a>
        </div>
        <div className="flex items-center justify-end">
          <NotificationsMenu />
          <div className="bg-grey-4 w-[1px] h-30 mx-10" />
          <WalletConnectButton {...wallet} />
        </div>
      </LayoutHeaderMobile>
      {showBanner && <MarketingBannerMobile />}
      <WalletConnectModal {...wallet} />
    </>
  );
};
