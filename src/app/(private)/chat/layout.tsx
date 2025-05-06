import { Suspense } from 'react';

const ChatLayout = ({ children }: { children: React.ReactNode }) => (
  <Suspense>{children}</Suspense>
);

export default ChatLayout;
