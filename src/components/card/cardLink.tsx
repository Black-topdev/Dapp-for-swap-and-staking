export const CardLink = ({
  children,
  customClass = '',
}: {
  children: JSX.Element[] | JSX.Element;
  customClass?: string;
}) => {
  return (
    <div
      className={`rounded-20 p-2 text-dark-1 dark:text-white  transition-all duration-300 ease-in-out   hover:bg-[#F6BA3F] dark:hover:bg-third bg-[#e4e7e7] dark:bg-dark-2 max-w-full cursor-pointer ${customClass}`}
    >
      {children}
    </div>
  );
};
