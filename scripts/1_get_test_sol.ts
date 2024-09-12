import { Connection, Keypair, LAMPORTS_PER_SOL } from "@solana/web3.js";

(async () => {
  const keypair = Keypair.generate();
  const connection = new Connection("http://127.0.0.1:8899", "confirmed");

  const signature = await connection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL,
  );
  
  const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash,
    lastValidBlockHeight,
    signature,
  });

  console.log(`Airdrop successful! Signature: ${signature}`);
})();


// https://solana.com/developers/cookbook/development/test-sol

// npm run 1_get_test_sol