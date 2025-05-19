'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useStore } from 'zustand';

import Loading from '@/components/loading';
import { useAuthStore } from '@/stores/auth';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { me, isLoading } = useStore(useAuthStore, (state) => state);

  useEffect(() => {
    if (!me && !isLoading) {
      router.push('/sign-in');
      toast.error('You need to sign in to access this page');
    }
  }, [me, isLoading]);

  if (!me) return <Loading />;
  return children;
}
