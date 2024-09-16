import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Voting } from "../target/types/voting";

describe("voting", () => {

  const program = anchor.workspace.Voting as Program<Voting>;

  const provider = anchor.AnchorProvider.env(); // for wallet
  
  let voteBank = anchor.web3.Keypair.generate();

  it(
    "Creating vote bank for public to vote",
    async () => {
      const tx = await program.methods
        .initVoteBank()
        .accounts({ voteAccount: voteBank.publicKey })
        .signers([voteBank])
        .rpc();
      console.log("TxHash ::", tx);
    },
    15000 // Increase timeout to 15 seconds
  );
  
  it(
    "Vote for GM",
    async () => {
      const tx = await program.methods
        .gibVote({ gm: {} })
        // .accounts({voteAccount: voteBank.publicKey,}) // if I leave signer it also works - I think its optional
        .accounts({ voteAccount: voteBank.publicKey, signer: provider.wallet.publicKey })
        .rpc();
      console.log("TxHash ::", tx);
  
      let voteBankData = await program.account.voteBank.fetch(voteBank.publicKey);
      console.log(`Total GMs :: ${voteBankData.gm}`);
      console.log(`Total GNs :: ${voteBankData.gn}`);
    },
    15000 // Increase timeout to 15 seconds
  );
  
  it(
    "Vote for GN",
    async () => {
      const tx = await program.methods
        .gibVote({ gn: {} })
        // .accounts({voteAccount: voteBank.publicKey,}) // if I leave signer it also works - I think its optional
        .accounts({ voteAccount: voteBank.publicKey, signer: provider.wallet.publicKey })
        .rpc();
      console.log("TxHash ::", tx);
  
      let voteBankData = await program.account.voteBank.fetch(voteBank.publicKey);
      console.log(`Total GMs :: ${voteBankData.gm}`);
      console.log(`Total GNs :: ${voteBankData.gn}`);
    },
    15000 // Increase timeout to 15 seconds
  );
  
});


