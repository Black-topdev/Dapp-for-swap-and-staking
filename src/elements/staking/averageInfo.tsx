import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const AverageInfo = () => {
  return (
    <section className="flex justify-around pt-36 pb-24">
      <div className="font-bold text-20 text-center self-center">
        <span>Available</span>
        <br />
        <span className="font-semibold">30.02</span>
      </div>
      <div className="font-bold text-20 text-center w-[90px] self-center">
        <CircularProgressbarWithChildren
          value={100}
          strokeWidth={4}
          styles={{ path: { stroke: '#F6BA3F' } }}
        >
          <span>Fee</span>
          <span className="font-semibold ml-8 mt-[-2px]">{2.00}%</span>
        </CircularProgressbarWithChildren>
      </div>
      <div className="font-bold text-20 text-center w-[90px] self-center">
        <div className="font-bold text-20 text-center self-center">
          <span>Staked</span>
          <br />
          <span className="font-semibold">00.00</span>
        </div>
      </div>
    </section>
  );
};
