'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';

import { redirect } from 'next/navigation';

export default function TestAccountListFeature() {
  const { publicKey } = useWallet();

  // if there is not publicKey detected than just show wallet if public key detected redirect to this function TestAccountDetailFeature or 
  // the page.tsx that is inside of [addresstest] folder

  if (publicKey) {
    return redirect(`/test/${publicKey.toString()}`);
  }

  return (

    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <WalletButton />
      </div>
    </div>

  );
}
