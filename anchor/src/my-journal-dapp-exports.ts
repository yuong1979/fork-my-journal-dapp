// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import MyJournalDappIDL from '../target/idl/my_journal_dapp.json';
import type { MyJournalDapp } from '../target/types/my_journal_dapp';

// Re-export the generated IDL and type
export { MyJournalDapp, MyJournalDappIDL };

// The programId is imported from the program IDL.
export const MY_JOURNAL_DAPP_PROGRAM_ID = new PublicKey(
  MyJournalDappIDL.address
);

// This is a helper function to get the MyJournalDapp Anchor program.
export function getJournalProgram(provider: AnchorProvider) {
  return new Program(MyJournalDappIDL as MyJournalDapp, provider);
}

// This is a helper function to get the program ID for the MyJournalDapp program depending on the cluster.
export function getJournalProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return MY_JOURNAL_DAPP_PROGRAM_ID;
  }
}
