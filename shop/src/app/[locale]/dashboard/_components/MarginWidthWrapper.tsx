import { ReactNode } from 'react';

export default function MarginWidthWrapper({ children }: { children: ReactNode }) {
  return <div className="flex flex-col md:ltr:ml-60 md:rtl:mr-60 min-h-screen">{children}</div>;
}
