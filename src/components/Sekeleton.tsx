import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

type SkeletonProps = {
  times: number;
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({ times, className }) => {
  const outerClassNames = twMerge(
    classNames(
      className,
      'relative',
      'overflow-hidden',
      'bg-gray-300',
      'rounded',
      'mb-2.5'
    )
  );

  const innerClassNames = twMerge(
    classNames(
      'animate-shimmer',
      'absolute',
      'inset-0',
      '-translate-x-full',
      'bg-gradient-to-r',
      'from-gray-300',
      'via-white',
      'to-gray-300'
    )
  );
  const boxes = Array(times)
    .fill(0)
    .map((_, i) => {
      return (
        <div key={i} className={outerClassNames}>
          <div className={innerClassNames} />
        </div>
      );
    });
  return boxes;
};

export default Skeleton;
