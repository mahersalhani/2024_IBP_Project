import { AuthGuard } from '@/guards';

export default function SubLayout({ children }: { children: React.ReactNode }) {
  return <AuthGuard mostBeVerified={false}>{children}</AuthGuard>;
}
