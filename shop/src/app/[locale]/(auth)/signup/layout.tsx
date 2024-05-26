'use client';

import { GuestGuard } from '@/guards';

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
