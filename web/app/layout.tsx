import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';

export const metadata = {
  title: 'my-journal-dapp',
  description: 'Generated by create-solana-dapp',
};

const links: { label: string; path: string }[] = [
  { label: 'Account', path: '/account' },
  { label: 'Clusters', path: '/clusters' },
  { label: 'Counter Program', path: '/counter' },
  { label: 'Testing', path: '/test' },
  { label: 'Journal Entry', path: '/journal' },
];

//Inside the RootLayout, the children prop is populated with the content of the current page, which in this case is the DashboardFeature component from page.tsx.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
            {/* The page.tsx (DashboardFeature) file is integrated into the layout defined in layout.tsx through the {children} prop, but it's not explicitly visible. */}
            {/* if the page is some other route - such as /account, it would be rendering app/account/page.tsx */}
              <UiLayout links={links}>{children}</UiLayout> 
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
