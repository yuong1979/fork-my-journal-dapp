// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import CounterIDL from '../target/idl/counter.json';
import type { Counter } from '../target/types/counter';

// // Extend the Cluster type to include 'localnet'
// type CustomCluster = Cluster | 'localnet';

// Re-export the generated IDL and type
export { Counter, CounterIDL };

// The programId is imported from the program IDL.
export const COUNTER_PROGRAM_ID = new PublicKey(CounterIDL.address);

// This is a helper function to get the Counter Anchor program.
export function getCounterProgram(provider: AnchorProvider) {
  return new Program(CounterIDL as Counter, provider);
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
// export function getCounterProgramId(cluster: CustomCluster) {
export function getCounterProgramId(cluster: Cluster) {
  switch (cluster) {
    
    case 'devnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('6cgM7fMwhdSzA8KSMXXj8TeiK2xRmatCyMdZB4xXcvJE');

    case 'testnet':
      // // This is the program ID for the Counter program on devnet and testnet.
      // return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg');

    // case 'localnet':
    //   // This is the program ID for the Counter program on localnet.
    //   // Replace with the actual program ID you generated for your local network.
    //   return new PublicKey('6cgM7fMwhdSzA8KSMXXj8TeiK2xRmatCyMdZB4xXcvJE');
      
    case 'mainnet-beta':
    default:
      return COUNTER_PROGRAM_ID;
  }
}
