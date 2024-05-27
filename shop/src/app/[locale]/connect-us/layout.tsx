import { AuthGuard } from '@/guards';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <AuthGuard isCustomer>{children}</AuthGuard>;
}
