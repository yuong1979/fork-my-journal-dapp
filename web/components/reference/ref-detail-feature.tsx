'use client';

import { PublicKey } from '@solana/web3.js';
import { useMemo } from 'react';

import { useParams } from 'next/navigation';
// import { useCluster } from '../cluster/cluster-data-access';
import { ExplorerLink } from '../cluster/cluster-ui';
import { AppHero, ellipsify } from '../ui/ui-layout';
import {
  AccountBalance,
  AccountButtons,
  AccountTokens,
  AccountTransactions,
} from './ref-ui';


// the function TestAccountDetailFeature is representated in the page.tsx inside [addresstest] and is only accessible if a public key is available.
// if there is no public key (or connected wallet) the user is directed to page.tsx is outside of [addresstest] or the function TestAccountListFeature
// the route of this page will be represented with the test/address

export default function TestAccountDetailFeature() {

  const params = useParams();

  // If you use useMemo, the address will only change when the dependencies change (in this case, params). If params does not change, the memoized value will be used, and you won't need to refresh the page to see a change in address.
  const address = useMemo(() => {
    if (!params.addresstest) {
      return;
    }
    try {
      return new PublicKey(params.addresstest);

    } catch (e) {
      console.log(`Invalid public key`, e);
    }

  }, [params]);

  // Without useMemo: If you do not use useMemo, the address will be recalculated on every render. If params.addresstest remains the same, the value of address will not change until the component re-renders due to some other state or prop change.
  // // Directly create the PublicKey without useMemo
  // let address;
  // if (params.address) {
  //   try {
  //     address = new PublicKey(params.address);
  //   } catch (e) {
  //     console.log(`Invalid public key`, e);
  //   }
  // }

  if (!address) {
    return <div>Error loading account</div>;
  }

  return (
    <div>
      <AppHero
        // title={<AccountBalance address={address} />}

        title={
          <div style={{ border: '2px solid red', padding: '10px' }}>
            <AccountBalance address={address} />
          </div>
        }

        subtitle={
          <div className="my-4">
            <ExplorerLink
              path={`account/${address}`}
              label={ellipsify(address.toString())}
            />
          </div>
        }
      >
        <div className="my-4">
          <AccountButtons address={address} />
        </div>
      </AppHero>
      <div className="space-y-8">
        {/* <h2>Account Tokens</h2> */}
        <AccountTokens address={address} />
        {/* <h2>Account Transactions</h2> */}
        <AccountTransactions address={address} />
      </div>
    </div>
  );
}




