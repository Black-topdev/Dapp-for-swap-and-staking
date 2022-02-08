import { useState } from 'react';

import { SubHeader } from 'elements/layoutHeader/Subheader';
import { AverageInfo } from 'elements/staking/averageInfo';
import { StakeInfo, WithdrawInfo } from 'elements/staking/statusInfo';
import { CardLink } from 'components/card/cardLink';
import { CellTitle, CellContent, CellField } from 'elements/staking/Cell';
import category_data from 'fake_data/staking/category_data.json';

export const Staking = () => {
  const [tabState, setTabState] = useState(true);

  return (
    <>
      <div className="flex flex-col">
        <SubHeader title="Staking" />
        <AverageInfo />

        <section>
          <div className="flex sm:hidden mb-30">
            <div
              className={`w-2/4 text-base text-dark-1 py-1 hover:text-[#F6BA3F] hover:border-b-[#F6BA3F] border-b-2 text-center transition-all duration-300 ease-in-out cursor-pointer ${
                tabState ? 'border-b-[#F6BA3F] text-[#F6BA3F]' : ''
              }`}
              onClick={() => setTabState(true)}
            >
              Stake
            </div>
            <div
              className={`w-2/4 text-base text-dark-1 py-1 hover:text-[#F6BA3F] hover:border-b-[#F6BA3F] border-b-2 text-center transition-all duration-300 ease-in-out cursor-pointer ${
                tabState ? '' : 'border-b-[#F6BA3F] text-[#F6BA3F]'
              }`}
              onClick={() => setTabState(false)}
            >
              Withdraw
            </div>
          </div>
          <div className="flex justify-between">
            <StakeInfo
              customClass={`sm:w-[48%] w-full sm:block ${
                tabState ? 'block' : 'hidden'
              }`}
            />
            <WithdrawInfo
              customClass={`sm:w-[48%] w-full sm:block ${
                tabState ? 'hidden' : 'block'
              }`}
            />
          </div>
        </section>
        <section className="w-full mt-50">
          <div className="flex justify-between w-full flex-wrap xmd:flex-nowrap">
            {category_data.map((value, index) => (
              <CardLink
                customClass="lg:flex h-full  group xmd:w-[24%] sm:w-[46%] w-[100%] xl:h-[208px] h-[250px] xmd:mb-0 mb-20"
                key={index}
              >
                <div className="lg:w-[33%] h-[17%] lg:h-full  w-full flex justify-center items-center lg:text-20 text-base text-bold group-hover:text-white ">
                  {value.id}
                </div>
                <div className="lg:w-[67%] h-[83%] lg:h-full w-full bg-white dark:bg-dark-0  rounded-bl-20 lg:rounded-bl-none rounded-br-20 lg:rounded-tr-20 rounded-br-20 2xl:px-36 lg:py-30 lg:px-10 pt-24 px-24 group-hover:text-black dark:group-hover:text-white  dark:group-hover:bg-black xmd:text-left text-center">
                  <CellField>
                    <CellTitle customClass="mb-0">Tokens</CellTitle>
                    <CellContent>
                      <span>{value.coins} THA</span>
                    </CellContent>
                  </CellField>
                  <CellField>
                    <CellTitle customClass="mb-0 mt-8">Amount</CellTitle>
                    <CellContent>
                      <span>{value.amount} USD</span>
                    </CellContent>
                  </CellField>
                  <CellField>
                    <CellTitle customClass="mb-0 mt-8">Fee</CellTitle>
                    <CellContent>
                      <span>{value.fee} %</span>
                    </CellContent>
                  </CellField>
                </div>
              </CardLink>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
