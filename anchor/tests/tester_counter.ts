import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Tester } from "../target/types/tester";
import { expect } from "chai";
 
describe("tester", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env(); // for wallet
  const program = anchor.workspace.Tester as Program<Tester>;
  const counter = anchor.web3.Keypair.generate(); // automatically generated keypair


  // it("Is initialized!", async () => {
  //   // Add your test here.
  //   const tx = await program.methods //this generates the transaction
  //     .initialize() // the function name
  //     .accounts({ mycounter: counter.publicKey }) //specifying that the account associated with the counter keypair should be used as the mycounter account when calling the initialize function in your smart contract.
  //     .signers([counter]) //The Solana blockchain requires that the account being initialized is owned by the signer of the transaction. This ensures that the account creator has the necessary permissions to perform actions on the account.
  //     .rpc();
  //   const account = await program.account.counter.fetch(counter.publicKey);
  //   expect(account.count.toNumber()).to.equal(0);
  // });
  
 
  // it("Incremented the count", async () => {
  //   const tx = await program.methods //this generates the transaction
  //     .increment() // the function name
  //     .accounts({ mycounter: counter.publicKey, user: provider.wallet.publicKey })
  //     // .accounts({ mycounter: counter.publicKey, }) //it looks like both including or excluding the user works so its optional
  //     .rpc();   
  //   const account = await program.account.counter.fetch(counter.publicKey);
  //   expect(account.count.toNumber()).to.equal(1);
  // });



});



// what does rpc do in this scenario? and what is an rpc?


// what does this command do ? - 

// "
//     const tx = await program.methods
//       .initialize() // is this the function name? - just to confirm?
//       .accounts({ counter: counter.publicKey })
//       .signers([counter])
//       .rpc(); // 

// "




// in this context - can the provider.wallet.publickey be replaced by the counter.publickey? - 

// it("Incremented the count", async () => {
//   const tx = await program.methods
//     .increment() // is this the function name? - just to confirm?
//     .accounts({ counter: counter.publicKey, user: provider.wallet.publicKey }) 
//     .rpc();
 
//   const account = await program.account.counter.fetch(counter.publicKey);
//   expect(account.count.toNumber()).to.equal(1);
// });





// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { AnchorCounter } from "../target/types/anchor_counter";

// describe("anchor-counter", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.AnchorCounter as Program<AnchorCounter>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });


