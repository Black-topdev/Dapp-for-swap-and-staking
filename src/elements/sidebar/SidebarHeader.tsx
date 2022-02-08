import { ReactComponent as IconLogo } from 'assets/logos/Logo.svg';
import { ReactComponent as IconChevron } from 'assets/icons/chevronRight.svg';
import { ReactComponent as IconTimes } from 'assets/icons/times.svg';
import { NavLink } from 'react-router-dom';
import { classNameGenerator } from 'utils/pureFunctions';
import { pools } from 'services/router';

interface SidebarHeaderProps {
  isMinimized: boolean;
  setIsMinimized: Function;
  setIsSidebarOpen?: Function;
}
export const SidebarHeader = ({
  isMinimized,
  setIsMinimized,
  setIsSidebarOpen,
}: SidebarHeaderProps) => {
  return (
    <>
      <div className={'flex justify-between items-center mb-12'}>
        <div className="m-auto">
          <NavLink to={pools} className="flex items-center mb-5 pl-[25px] ">
            <IconLogo className="w-[25px] mr-24" />
          </NavLink>
        </div>
        {setIsSidebarOpen ? (
          <button onClick={() => setIsSidebarOpen(false)} className="mr-14">
            <IconTimes className="w-15" />
          </button>
        ) : (
          ''
        )}
      </div>

      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className={'hidden md:block'}
      >
        <div
          className={`sidebar-toggle ${classNameGenerator({
            'rotate-180': !isMinimized,
          })}`}
        >
          <IconChevron className={`w-[16px] text-white`} />
        </div>
      </button>
    </>
  );
};
