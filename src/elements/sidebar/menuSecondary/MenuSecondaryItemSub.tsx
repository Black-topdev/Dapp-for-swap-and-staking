import { SecondarySubMenuItem } from 'elements/sidebar/menuSecondary/MenuSecondary';

export const MenuSecondaryItemSub = ({
  label,
  icon,
  to,
}: SecondarySubMenuItem) => {
  return (
    <a
      className="flex text-white items-center text-14 hover:text-third-light transition duration-300"
      href={to}
      target="_blank"
      rel="noreferrer"
    >
      <div className="w-20 mr-20">{icon}</div>
      {label}
    </a>
  );
};
