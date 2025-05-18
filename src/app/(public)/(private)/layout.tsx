'use client';

import { useEffect } from 'react';
import { useStore } from 'zustand';

import { useAuthStore } from '@/stores/auth';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { me, isLoading } = useStore(useAuthStore, (state) => state);

  useEffect(() => {
    if (!me && !isLoading) {
      window.location.href = '/sign-in';
    }
  }, [me, isLoading]);

  return children;
}
