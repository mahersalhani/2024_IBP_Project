import { AuthGuard } from '@/guards';

import Header from './_components/header';
import HeaderMobile from './_components/header-mobile';
import MarginWidthWrapper from './_components/MarginWidthWrapper';
import PageWrapper from './_components/page-wrapper';
import SideNav from './_components/side-nav';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard isSeller>
      <div className="flex">
        <SideNav />

        <main className="flex-1">
          <MarginWidthWrapper>
            <Header />
            <HeaderMobile />
            <PageWrapper>{children}</PageWrapper>
          </MarginWidthWrapper>
        </main>
      </div>
    </AuthGuard>
  );
}
