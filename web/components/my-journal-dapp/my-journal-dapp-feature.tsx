'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletButton } from '../solana/solana-provider';
import { AppHero, ellipsify } from '../ui/ui-layout';
import { ExplorerLink } from '../cluster/cluster-ui';
import { useJournalProgram } from './my-journal-dapp-data-access';
import { JournalCreate, JournalList } from './my-journal-dapp-ui';

export default function JournalFeature() {
  const { publicKey } = useWallet();
  const { programId } = useJournalProgram();

  return publicKey ? (
    <div>
      <AppHero
        title="My Solana Journal"
        subtitle={
          'Create your journal here!'
        }
      >
        <p className="mb-6">
          <ExplorerLink
            path={`account/${programId}`}
            label={ellipsify(programId.toString())}
          />
        </p>
        <JournalCreate />
      </AppHero>
      <JournalList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  );
}






























// 'use client';

// import { useWallet } from '@solana/wallet-adapter-react';
// import { WalletButton } from '../solana/solana-provider';
// import { AppHero, ellipsify } from '../ui/ui-layout';
// import { ExplorerLink } from '../cluster/cluster-ui';
// import { useMyJournalDappProgram } from './my-journal-dapp-data-access';
// import { MyJournalDappCreate, MyJournalDappList } from './my-journal-dapp-ui';

// export default function MyJournalDappFeature() {
//   const { publicKey } = useWallet();
//   const { programId } = useMyJournalDappProgram();

//   return publicKey ? (
//     <div>
//       <AppHero
//         title="MyJournalDapp"
//         subtitle={
//           'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
//         }
//       >
//         <p className="mb-6">
//           <ExplorerLink
//             path={`account/${programId}`}
//             label={ellipsify(programId.toString())}
//           />
//         </p>
//         <MyJournalDappCreate />
//       </AppHero>
//       <MyJournalDappList />
//     </div>
//   ) : (
//     <div className="max-w-4xl mx-auto">
//       <div className="hero py-[64px]">
//         <div className="hero-content text-center">
//           <WalletButton />
//         </div>
//       </div>
//     </div>
//   );
// }
