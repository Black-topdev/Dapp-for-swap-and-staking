import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as IconAvatar } from 'assets/logos/progressAvatar.svg';
import { ReactComponent as IconLogo } from 'assets/logos/Logo.svg';
import { InputField } from 'components/inputField/InputField';

export const Maintenance = () => {
  const [email, setEmail] = useState('');
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black text-center pr-16 pl-16">
      <div className="absolute sm:ml-64 mt-40 sm:left-0 sm:translate-x-0 left-1/2 translate-x-[-50%]">
        <Link to="/">
          <IconLogo />
        </Link>
      </div>
      <div className="sm:max-w-[593px] m-auto max-w-[450px]">
        <div className="inline-block mt-[100px]">
          <IconAvatar className="w-[200px] sm:w-auto ml-[25px]" />
        </div>
        <h1 className=" sm:mt-24 sm:text-5xl text-white font-bold mt-0 lsm:text-4xl text-3xl">
          The Service is under development
        </h1>
        <p className="mt-24 font-normal text-[#84878D] text-base text-sm">
          Unfortunately we are under development, but you can leave your mail
          and we will contact you as soon as the work is completed.
        </p>
        <form
          className="relative mt-24"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <InputField
            input={email}
            setInput={setEmail}
            placeholder="ENTER YOUR EMAIL"
            customClass="sm:pr-[270px] sm:text-[1rem] sm:h-[52px] lsm:pr-[180px]  pr-[140px] text-black h-40 text-[0.75rem] pt-12 pb-12"
          />
          <button
            type="submit"
            className="rounded absolute top-0 sm:text-[1rem] sm:h-[52px] sm:w-[180px] bg-[#F6BA3F] right-0 font-medium  text-white uppercase cursor-pointer  w-[130px] text-[0.75rem]  h-40 lsm:text-sm "
          >
            request a demo
          </button>
        </form>
      </div>
    </div>
  );
};
