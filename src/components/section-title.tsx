interface Props {
  text: string;
  className?: React.HTMLAttributes<HTMLElement>['className'];
}

export default function SectionTitle({ text }: Props) {
  return (
    <span className='mb-4 text-lg font-bold tracking-tight capitalize md:text-xl'>
      {text}
    </span>
  );
}
