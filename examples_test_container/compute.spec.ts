import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Compute } from "../target/types/compute";


describe("compute", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Compute as Program<Compute>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });

  it("Mic testing - Hello world", async () => {
    const tx = await program.methods.helloWorld().rpc();
    console.log("Your transaction signature", tx);
  });

  const connection = anchor.getProvider().connection;
  
  it("Mic testing - Hello world", async () => {
    // Call the helloWorld method
    const tx = await program.methods.helloWorld().rpc();
    console.log("Your transaction signature", tx);
  
    // Delay for 2 seconds (2000 milliseconds) - to wait for the data is logged onchain first
    await new Promise(resolve => setTimeout(resolve, 2000));

    /// method 1 ///////
    // Fetch the transaction details using the new method
    const transactionDetails = await connection.getTransaction(tx, {
      commitment: "confirmed", // Set the commitment level to confirmed
    }); // Cast to GetVersionedTransactionConfig

    ///// method 2 /////// 
    // // Fetch the transaction details using the new method
    // const transactionDetails = await connection.getTransaction(tx, {
    //   maxSupportedTransactionVersion: 0, // Set the maximum supported transaction version
    //   commitment: "confirmed", // Set the commitment level to confirmed
    // } as GetVersionedTransactionConfig); // Cast to GetVersionedTransactionConfig
  
    // Log the transaction details to see the message
    if (transactionDetails?.meta?.logMessages) {
      console.log("Log Messages:");
      transactionDetails.meta.logMessages.forEach((log) => console.log(log));
    } else {
      console.log("No log messages found.");
    }


  });

});



// import * as anchor from "@coral-xyz/anchor";
// import { Program } from "@coral-xyz/anchor";
// import { Compute } from "../target/types/compute";
// import { assert } from "chai";

// describe("compute", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Compute as Program<Compute>;

//   it("Initializes the program", async () => {
//     // Call the initialize function
//     await program.methods.initialize().rpc();

//     // Add assertions to check the state of the program
//     // For example:
//     // const account = await program.account.counterData.fetch(
//     //   "727kkm5UWRKb7qfUXcyS35EFEcdnNMdGQxHcHQ4sNG8Z"
//     // );
//     // assert.equal(account.count, 0);
//   });

//   it("Logs 'Hello World'", async () => {
//     // Call the hello_world function
//     const tx = await program.methods.helloWorld().rpc();
//     console.log("Transaction signature:", tx);

//     // Add assertions to check the logs or other expected behavior
//     // For example:
//     // const logs = await program.provider.getLogs();
//     // assert.include(logs, "Hello world, from Solana smart contract");
//   });
// });