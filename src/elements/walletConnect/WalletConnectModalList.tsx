import { UseWalletConnect } from './useWalletConnect';
import { Image } from 'components/image/Image';

export const WalletConnectModalList = ({
  handleConnect,
  SUPPORTED_WALLETS,
}: UseWalletConnect) => {
  const className =
    'flex items-center w-full px-16 py-10 border-2 border-grey-2 dark:border-grey-4 rounded-20 hover:border-third dark:hover:border-third focus:outline-none focus:border-third dark:focus:border-third';
  return (
    <div className="flex flex-col mb-20 mt-10 space-y-15">
      {SUPPORTED_WALLETS.map((wallet, index) => (
        <button
          key={index}
          onClick={() => handleConnect(wallet)}
          className={`${!wallet.mobile ? 'hidden md:flex' : ''} ${className}`}
        >
          <Image
            src={wallet.icon}
            alt="Wallet Logo"
            className="w-32 h-32 mr-20"
          />
          {wallet.name}
        </button>
      ))}
    </div>
  );
};
