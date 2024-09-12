import { PublicKey } from "@solana/web3.js";
 
const programId = new PublicKey("G1DCNUQTSGHehwdLCAmRyAG8hf51eCHrLNUqkgGKYASj");
 
let [pda, bump] = PublicKey.findProgramAddressSync(
  [Buffer.from("test")],
  programId,
);
console.log(`bump: ${bump}, pubkey: ${pda.toBase58()}`);
// you will find the result is different from `createProgramAddress`.
// It is expected because the real seed we used to calculate is ["test" + bump]



// https://solana.com/developers/cookbook/accounts/create-pda-account