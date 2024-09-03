'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';

import { redirect } from 'next/navigation';

export default function TestAccountListFeature() {
  const { publicKey } = useWallet();

  // if there is not publicKey detected than just show wallet if public key detected redirect to wallet details

  if (publicKey) {
    return redirect(`/test/${publicKey.toString()}`);
  }

  return (


    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <WalletButton />
      </div>
    </div>


    // <div className="hero py-[64px]">
    // <div className="hero-content text-center">
    //   {/* Distinctive marker added here */}
    //   <div style={{ border: '2px solid blue', padding: '20px', borderRadius: '10px', backgroundColor: '#f0f8ff' }}>
    //     <h2 style={{ marginBottom: '10px' }}>Connect Your Wallet</h2>
    //     <WalletButton />
    //   </div>
    // </div>
    // </div>

  );
}
