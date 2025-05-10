import { Suspense } from 'react';

type Props = {
  children: React.ReactNode;
};

export default function ChatLayout({ children }: Props) {
  return <Suspense>{children}</Suspense>;
}
