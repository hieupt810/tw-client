import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function InformationCard({ title, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors'>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {children}
        {/* <p className='leading-7 [&:not(:first-child)]:mt-6'>
          {description ? description : 'No description yet.'}
        </p> */}
      </CardContent>
    </Card>
  );
}
