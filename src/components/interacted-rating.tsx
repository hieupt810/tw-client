'use client';

import clsx from 'clsx';
import { Circle } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  stars?: number;
  value?: number;
  setValue?: (value: number) => void | Dispatch<SetStateAction<number>>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  interactive?: boolean;
};

const defaultFunction = () => {};

export const InteractedRating = ({
  stars = 5,
  value = 3,
  setValue,
  size = 'md',
  className,
  interactive = true,
}: Props) => {
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  const handleMouseEnter = (index: number) => {
    setCurrent(index);
  };
  const handleMouseLeave = () => {
    setCurrent(value);
  };
  const handleChange = () => {
    if (setValue) {
      setValue(current);
    }
  };

  return (
    <div className={className}>
      <div className='flex items-center gap-1'>
        {Array.from({ length: stars }).map((_, index) => (
          <button
            key={index}
            type='button'
            onClick={interactive ? handleChange : defaultFunction}
            onMouseEnter={
              interactive ? () => handleMouseEnter(index + 1) : defaultFunction
            }
            onMouseLeave={interactive ? handleMouseLeave : defaultFunction}
          >
            <Circle
              className={clsx(
                'transition-all',
                interactive
                  ? 'cursor-pointer hover:scale-125'
                  : 'cursor-default',
                index + 1 <= current
                  ? 'fill-primary text-primary'
                  : 'fill-gray-200 text-gray-200',
                size === 'xs'
                  ? 'size-4'
                  : size === 'sm'
                    ? 'size-8'
                    : size === 'md'
                      ? 'size-10'
                      : size === 'lg'
                        ? 'size-12'
                        : size === 'xs'
                          ? 'size-8'
                          : size === 'tiny'
                            ? 'size-5'
                            : '',
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
