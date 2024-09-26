////////////////////////////////////////////////////////////
/////////// Run tiny adventure program with PDA 
////////////////////////////////////////////////////////////
// run with "seeds = [b"level1"], and bump", inside of "pub struct Initialize"


import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair, PublicKey, Connection, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { TinyAdventure } from '../target/types/tiny_adventure';

describe('tiny_adventure', () => {
    // Configure the client to use the local cluster.
    const provider = anchor.AnchorProvider.env();

    console.log(provider)

    anchor.setProvider(provider);
    const program = anchor.workspace.tiny_adventure as Program<TinyAdventure>;

    // The PDA is tied to your program's ID and is expected to be owned by that program. This means that any interactions with that account must be done through the program that created it.
    const payer = provider.wallet
    const keypair = payer.payer


//     ////////////////////////////////////////////////////////////////////////////////////////////////////////
//     //////// create airdrop to address and check balance - unncessary in this context but for reference only
//     ////////////////////////////////////////////////////////////////////////////////////////////////////////
//     // Create a connection to the Solana devnet
//     // const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
//     const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

//     beforeAll(async () => {
//       // Request an airdrop of 1 SOL
//       const airdropSignature = await connection.requestAirdrop(payer.publicKey, 1 * LAMPORTS_PER_SOL);
      
//       // Get the latest blockhash and last valid block height
//       const latestBlockhash = await connection.getLatestBlockhash();

//       // Confirm the transaction using the new syntax
//       await connection.confirmTransaction({
//           signature: airdropSignature,
//           blockhash: latestBlockhash.blockhash,
//           lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
//       });

//       // Check balance after airdrop
//       const balance = await connection.getBalance(payer.publicKey);
//       console.log(`Airdropped 1 SOL to ${payer.publicKey.toBase58()}`);
//       console.log(`Balance for ${payer.publicKey.toBase58()}: ${balance / 1e9} SOL`); // Convert lamports to SOL
//   });



    // The PDA adress everyone will be able to control the character if the interact with your program
    const [globalLevel1GameDataAccount] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("level1", "utf8")],
        //[pg.wallet.publicKey.toBuffer()], <- You could also add the player wallet as a seed, then you would have one instance per player. Need to also change the seed in the rust part
        program.programId
    );


    let txHash;
    let gda_obj;
    
    it('Initialize Counter', async () => {

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
      }
      expect(gda_obj.playerPosition).toEqual(0);
    });


    it('Move Right', async () => {
      gda_obj = await program.account.gameDataAccount.fetch(
        globalLevel1GameDataAccount
      );
      await program.methods
        .moveRight()
        .accounts({ gameDataAccount: globalLevel1GameDataAccount })
        .rpc();

        gda_obj = await program.account.gameDataAccount.fetch(globalLevel1GameDataAccount);

      expect(gda_obj.playerPosition).toEqual(1);
    });

    it('Move Right', async () => {
      gda_obj = await program.account.gameDataAccount.fetch(
        globalLevel1GameDataAccount
      );
      await program.methods
        .moveRight()
        .accounts({ gameDataAccount: globalLevel1GameDataAccount })
        .rpc();

        gda_obj = await program.account.gameDataAccount.fetch(globalLevel1GameDataAccount);

      expect(gda_obj.playerPosition).toEqual(2);
    });

    it('Move Left', async () => {
      gda_obj = await program.account.gameDataAccount.fetch(
        globalLevel1GameDataAccount
      );
      await program.methods
        .moveLeft()
        .accounts({ gameDataAccount: globalLevel1GameDataAccount })
        .rpc();

        gda_obj = await program.account.gameDataAccount.fetch(globalLevel1GameDataAccount);

      expect(gda_obj.playerPosition).toEqual(1);
    });



    async function logTransaction(txHash) {
      const { blockhash, lastValidBlockHeight } =
      await program._provider.connection.getLatestBlockhash();
      await program._provider.connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature: txHash,
      });
    
      console.log(
        `Solana Explorer: https://explorer.solana.com/tx/${txHash}?cluster=devnet`
      );
    }

});




















// //////////////////////////////////////////////////////////
// ///////// Run tiny adventure program without PDA 
// //////////////////////////////////////////////////////////
// //// run without "seeds = [b"level1"], and bump", inside of "pub struct Initialize"


// import * as anchor from '@coral-xyz/anchor';
// import { Program } from '@coral-xyz/anchor';
// import { Keypair } from '@solana/web3.js';
// import { TinyAdventure } from '../target/types/tiny_adventure';

// describe('tiny_adventure', () => {

//     // Configure the client to use the local cluster.
//   const provider = anchor.AnchorProvider.env();
//   anchor.setProvider(provider);
//   const payer = provider.wallet as anchor.Wallet;
//   const program = anchor.workspace.tiny_adventure as Program<TinyAdventure>;
//   const counterKeypair = Keypair.generate();

//   it('Initialize Counter', async () => {
//     await program.methods
//       .initialize()
//       .accounts({
//         newGameDataAccount: counterKeypair.publicKey,
//         payer: payer.publicKey,
//         systemProgram: anchor.web3.SystemProgram.programId,        
//       })
//       .signers([counterKeypair])
//       .rpc();

//     const currentCount = await program.account.gameDataAccount.fetch(
//       counterKeypair.publicKey
//     );
//     expect(currentCount.playerPosition).toEqual(0);
//   });

//   console.log("payer.publicKey", payer.publicKey)
//   console.log("counterKeypair.publicKey", counterKeypair.publicKey)


//   it('Move Right', async () => {
//     await program.methods
//       .moveRight()
//       .accounts({ gameDataAccount: counterKeypair.publicKey })
//       .rpc();

//     const currentCount = await program.account.gameDataAccount.fetch(
//       counterKeypair.publicKey
//     );

//     expect(currentCount.playerPosition).toEqual(1);
//   });

//   it('Move Right', async () => {
//     await program.methods
//       .moveRight()
//       .accounts({ gameDataAccount: counterKeypair.publicKey })
//       .rpc();

//     const currentCount = await program.account.gameDataAccount.fetch(
//       counterKeypair.publicKey
//     );

//     expect(currentCount.playerPosition).toEqual(2);
//   });

//   it('Move Left', async () => {
//     await program.methods
//       .moveLeft()
//       .accounts({ gameDataAccount: counterKeypair.publicKey })
//       .rpc();

//     const currentCount = await program.account.gameDataAccount.fetch(
//       counterKeypair.publicKey
//     );

//     expect(currentCount.playerPosition).toEqual(1);
//   });

//   console.log('tiny adventure done!!')

// });




