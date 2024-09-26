

import * as anchor from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js'; // Import Keypair



const main = async () => {


// Client
// Hardcode the provider URL for the Solana cluster (e.g., devnet)
// const connection = new anchor.web3.Connection("https://api.devnet.solana.com", "confirmed");
const connection = new anchor.web3.Connection("http://127.0.0.1:8899", "confirmed");

const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

// Get the anchor wallet path from the environment variable
const anchorWalletPath = process.env.ANCHOR_WALLET;

// ensure that any paths using the tilde notation are correctly expanded to their full absolute path representation based on the user's home directory. 
const expandedPath = anchorWalletPath.replace('~', process.env.HOME);

// Read the secret key from the specified wallet file
const rawData = fs.readFileSync(expandedPath, 'utf8');
const secretKey = JSON.parse(rawData); // Assuming it's just an array

// Create the wallet keypair from the secret key
const walletKeypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

// Create an anchor wallet from the keypair
const wallet = new anchor.Wallet(walletKeypair); 

// Create the provider
const provider = new anchor.AnchorProvider(connection, wallet, {});

// Set this provider as the default for Anchor
anchor.setProvider(provider);

// get a reference to the Anchor program you are working with, specifically the TinyAdventure program.
const program = anchor.workspace.TinyAdventure; 

// The PDA is tied to your program's ID and is expected to be owned by that program. This means that any interactions with that account must be done through the program that created it.
const payer = provider.wallet
// type assertion - (payer as anchor.Wallet).payer
const keypair = (payer as anchor.Wallet).payer


// The PDA adress everyone will be able to control the character if the interact with your program
const [globalLevel1GameDataAccount] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("level1", "utf8")],
    //[pg.wallet.publicKey.toBuffer()], <- You could also add the player wallet as a seed, then you would have one instance per player. Need to also change the seed in the rust part
    program.programId
  );


let txHash;
let gda_obj;

try {

  gda_obj = await program.account.gameDataAccount.fetch(
    globalLevel1GameDataAccount
  );

} catch {

  // Check if the account is already initialized, other wise initilalize it
  txHash = await program.methods
    .initialize()
    .accounts({
      newGameDataAccount: globalLevel1GameDataAccount,
      signer: payer.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([keypair])
    .rpc();
  await logTransaction(txHash);
  console.log("A journey begins...");
  console.log("o........");


  // Fetch the account data again after initialization
  gda_obj = await program.account.gameDataAccount.fetch(globalLevel1GameDataAccount);

  console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);
  await provider.connection.confirmTransaction(txHash);

  console.log("A journey begins...");
  console.log("o........");

}



// Here you can play around now, move left and right
txHash = await program.methods
  // .moveLeft()
  .moveRight()
  .accounts({
    gameDataAccount: globalLevel1GameDataAccount,
  })
  .signers([keypair])
  .rpc();

await logTransaction(txHash);

gda_obj = await program.account.gameDataAccount.fetch(
  globalLevel1GameDataAccount
);

console.log("Player position is:", gda_obj.playerPosition.toString());


switch (gda_obj.playerPosition) {
  case 0:
    console.log("A journey begins...");
    console.log("o........");
    break;
  case 1:
    console.log("....o....");
    break;
  case 2:
    console.log("......o..");
    break;
  case 3:
    console.log(".........\\o/");
    break;
}

async function logTransaction(txHash) {
  const { blockhash, lastValidBlockHeight } =
    await provider.connection.getLatestBlockhash();

  await provider.connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature: txHash,
  });

  console.log(
    `Solana Explorer: https://explorer.solana.com/tx/${txHash}?cluster=devnet`
  );
}










};






main().catch(err => {
  console.error(err);
});












