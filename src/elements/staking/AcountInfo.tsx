import { useState } from 'react';

import { CellContent, CellTitle, CellField } from './Cell';
import { ReactComponent as IconLogo } from 'assets/logos/Logo.svg';
import { InputField } from 'components/inputField/InputField';

export const AccountInfo = ({
  remain = '0.00',
  amount = '0',
}: {
  remain?: string | number;
  amount?: string | number;
}) => {
  const [amountState, setAmountState] = useState(amount);

  return (
    <div className="w-full">
      <div className="flex text-black dark:text-white justify-between">
        <CellField>
          <CellTitle customClass="mb-8">Currency</CellTitle>
          <CellContent>
            <div className="flex p-8 rounded-full py-8 pl-8 pr-30 border-2 border-black dark:border-white">
              <div className="bg-black rounded-full h-32 w-32 flex items-center justify-center cursor-pointer">
                <IconLogo className="w-15 y-15" />
              </div>
              <span className="ml-8 self-center text-black dark:text-white">
                THA
              </span>
            </div>
          </CellContent>
        </CellField>
        <CellField>
          <CellTitle customClass="text-right mb-8">Remaining</CellTitle>
          <CellContent customClass="text-center border-2 border-black dark:border-white rounded-full  px-30 py-12">
            <span className="self-center text-black dark:text-white">
              {remain}
            </span>
          </CellContent>
        </CellField>
      </div>
      <CellField customClass="mt-24 w-full">
        <CellTitle customClass="mb-8">Amount</CellTitle>
        <CellContent>
          <InputField
            input={amountState}
            type="number"
            setInput={setAmountState}
            placeholder="Enter..."
            customClass="h-50 text-lg pt-12 pb-12 border-2 border-black dark:border-white"
          />
        </CellContent>
      </CellField>
    </div>
  );
};
