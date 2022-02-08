import { ReactComponent as Illustration } from 'assets/logos/Illustration.svg';
import { SubHeaderCarousel } from './SubheaderCarousel';

export const SubHeader = ({ title = '' }: { title: string }) => {
  return (
    <section className="bg-black rounded-20 justify-between p-8 hidden sm:flex capitalize">
      <h2 className="font-extrabold 2xl:text-4xl lg:text-3xl text-white xl:text-left xl:ml-24 mx-auto self-center hidden lg:block">
        {title}
      </h2>
      <div className="2xl:w-[813px] lg:w-[640px] w-full rounded-20 bg-white 2xl:px-56 xmd:pl-20 xmd:pr-40 pr-16 flex">
        <div className="w-2/4">
          <Illustration className="xmd:ml-20 ml-16" />
        </div>
        <div className="w-2/4 self-center ">
          <SubHeaderCarousel />
        </div>
      </div>
    </section>
  );
};
