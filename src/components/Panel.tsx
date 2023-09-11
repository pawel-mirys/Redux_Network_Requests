import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const Panel: React.FC<PanelProps> = ({ children, ...rest }) => {
  const classes = twMerge(
    classNames(rest.className, 'border rounded p-3 shadow bg-white w-full')
  );

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};
