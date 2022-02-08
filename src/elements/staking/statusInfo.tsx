import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';

import { CardLink } from 'components/card/cardLink';
import { AccountInfo } from './AcountInfo';

export const StakeInfo = ({ customClass = '' }: { customClass?: string }) => {
  return (
    <div
      className={`pt-32 px-24 pb-24 bg-white dark:bg-dark-0 dark:border-black border-2 rounded-20 ${customClass}`}
    >
      <div className="sm:text-2xl text-18 font-bold mb-24 sm:text-left text-center">
        Stake
      </div>
      <div className="flex flex-wrap xl:flex-nowrap w-full">
        <AccountInfo amount="0" remain="30.02" />
        <CardLink customClass="w-full h-[50px] xl:h-[150px] xl:ml-32  flex justify-center items-center  mt-30 text-base font-medium hover:text-white">
          <span>SEND</span>
          <RiArrowRightSLine size={25} />
        </CardLink>
      </div>
    </div>
  );
};

export const WithdrawInfo = ({
  customClass = '',
}: {
  customClass?: string;
}) => {
  return (
    <div
      className={`pt-32 px-24 pb-24 bg-white  dark:border-black dark:bg-dark-0 border-2 rounded-20  ${customClass}`}
    >
      <div className="sm:text-2xl text-18 font-bold mb-24 sm:text-left text-center">
        Withdraw
      </div>
      <div className="flex flex-wrap xl:flex-nowrap w-full">
        <CardLink customClass="w-full xl:mr-32 h-[50px] xl:h-[150px] flex justify-center items-center mt-30 text-base font-medium text-white order-last xl:order-first hover:text-white">
          <RiArrowLeftSLine size={25} />
          <span>WITHDRAW</span>
        </CardLink>
        <AccountInfo amount="0" remain="0.00" />
      </div>
    </div>
  );
};
