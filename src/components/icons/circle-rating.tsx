import { SVGProps } from 'react';

export default function CircleRating({
  fillPercent,
  ...props
}: {
  fillPercent: number;
} & SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' {...props}>
      <circle cx={50} cy={50} r={50} className='fill-violet-200' />
      <clipPath id='a'>
        <circle cx={50} cy={50} r={50} />
      </clipPath>
      <path
        d={`M0 0h${fillPercent}v100H0z`}
        clipPath='url(#a)'
        className='fill-primary'
      />
    </svg>
  );
}
