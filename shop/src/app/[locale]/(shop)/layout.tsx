import Footer from '@/components/Footer/Footer';
import SiteHeader from '@/components/SiteHeader';

export default function RootLayout({ children }: { children: React.ReactNode; params: any }) {
  return (
    <>
      <SiteHeader />
      <main className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">{children}</main>
      <Footer />
    </>
  );
}
