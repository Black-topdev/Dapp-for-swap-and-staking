import { DepositMethods, FiatBox, Operations } from 'elements/fiat/FiatBox';
import { ReactComponent as rampLogo } from 'assets/logos/ramp.svg';
import { ReactComponent as mercuryoLogo } from 'assets/logos/mercuryo.svg';
import { ReactComponent as IconInfo } from 'assets/icons/info.svg';

const fiats = [
  {
    name: 'Mercuryo',
    text: 'Mercuryo is a cross-boarder payment network providing global access to fast and cheap money transfers. Working together with industry leaders, Mercuryo offers a multi-currency widget that allows purchasing and selling crypto securely with the lowest fees.',
    logo: mercuryoLogo,
    operations: [Operations.fiatIn, Operations.fiatOut],
    depositMethods: [
      DepositMethods.creditCard,
      DepositMethods.debitCard,
      DepositMethods.applePay,
      DepositMethods.googlePay,
    ],
    buyUrl:
      'https://exchange.mercuryo.io/?widget_id=d7702dc1-c8ee-4726-a5be-5f18e31849b6&currency=ETH&type=buy',
    sellUrl:
      'https://exchange.mercuryo.io/?widget_id=d7702dc1-c8ee-4726-a5be-5f18e31849b6&currency=ETH&type=sell',
  },
  {
    name: 'Ramp',
    text: 'Ramp provides the ultimate crypto on-boarding flow. This globally accessible product focuses on excellent UX, supports multiple payment options and ensures lowest slippage and fees. Ramp offers a multi-currency widget that allows purchasing crypto securely with low fees.',
    logo: rampLogo,
    operations: [Operations.fiatIn],
    depositMethods: [
      DepositMethods.openBanking,
      DepositMethods.sepaInstant,
      DepositMethods.fasterPayments,
      DepositMethods.debitCard,
      DepositMethods.creditCard,
      DepositMethods.applePay,
    ],
    smallGap: true,
    buyUrl:
      'https://buy.ramp.network/?hostApiKey=qg4s4spwnm7nahqdxfsjyzsjvtxbbzg8dxnxxrum&userAddress=0x5f7a009664b771e889751f4fd721adc439033ecd',
  },
];

export const Fiat = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 gap-40 text-blue-4 dark:text-grey-0 text-14 max-w-[1140px] mx-10 sm:mx-auto mb-20 sm:mt-20">
      <div className="mt-20 mx-16 sm:ml-5">
        <div className="font-medium text-2xl sm:font-semibold sm:text-3xl mb-20">
          Fiat Gateway Providers
        </div>
        <div>
          <div>Below is a list of popular fiat gateways.</div>
          It can be used to buy or sell crypto with a credit card, bank transfer
          & more.
        </div>
      </div>
      <div className="bg-white shadow dark:shadow-none hover:shadow-lg dark:bg-dark-2 px-20 py-16 rounded-20 text-12 lg:mt-0 mt-30">
        <div className="flex items-center pb-8 text-16">
          <IconInfo className="w-15 h-15 mr-10" />
          Fiat Services
        </div>
        <div className="dark:text-grey-3">
          Fiat services on EquitySwap are provided by third-parties. EquitySwap
          is not associated with, responsible or liable for the performance of
          these third-party services. Any claims & questions should be addressed
          with the selected provider directly.
        </div>
      </div>
      <div className="bg-white shadow dark:shadow-none hover:shadow-lg dark:bg-dark-2 rounded-20 text-12 lg:mt-0 mt-30">
        <iframe
          title="Transak On/Off Ramp Widget (Website)"
          scrolling="no"
          src="https://thalesia.com/transak"
          className="shadow hover:shadow-lg rounded-20 "
          style={{
            display: 'block',
            width: '100%',
            maxWidth: '100%',
            height: '735px',
            maxHeight: '1000px',
          }}
        ></iframe>
      </div>
      {fiats.map((fiat, index) => (
        <FiatBox
          key={fiat.name}
          fiat={fiat}
          customClass={`${index === fiats.length - 1 ? 'col-start-2' : ''}`}
        />
      ))}
    </div>
  );
};
