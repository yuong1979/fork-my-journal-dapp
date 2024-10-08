import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Original } from "../target/types/original";


describe("original", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Original as Program<Original>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initializego().rpc();
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

    ///// method 1 ///////
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
