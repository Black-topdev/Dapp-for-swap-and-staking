export const CellField = ({
  children,
  customClass = '',
}: {
  children: JSX.Element | JSX.Element[] | string;
  customClass?: string;
}) => {
  return <div className={`${customClass}`}>{children}</div>;
};

export const CellTitle = ({
  children,
  customClass = '',
}: {
  children: JSX.Element | JSX.Element[] | string;
  customClass?: string;
}) => {
  return <div className={`font-medium ${customClass}`}>{children}</div>;
};

export const CellContent = ({
  children,
  customClass = '',
}: {
  children: JSX.Element | JSX.Element[];
  customClass?: string;
}) => {
  return (
    <div className={`font-semibold text-base ${customClass}`}>{children}</div>
  );
};
