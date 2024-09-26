import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { ProgramName } from '../target/types/program_name';

describe('counter', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();

  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.program_name as Program<ProgramName>;

  const counterKeypair = Keypair.generate();

  // console.log(program);

  it('Initialize Counter', async () => {
    await program.methods
      .initialize()
      .accounts({
        counterfield: counterKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([counterKeypair])
      .rpc();

    const currentCount = await program.account.counterStruct.fetch(
      counterKeypair.publicKey
    );

    // console.log('currentCount',currentCount)
    // console.log('counterKeypair.publicKey',counterKeypair.publicKey)

    expect(currentCount.count).toEqual(0);
  });

  // it('Increment Counter', async () => {
  //   await program.methods
  //     .increment()
  //     .accounts({ counterfield: counterKeypair.publicKey })
  //     .rpc();

  //   const currentCount = await program.account.counterStruct.fetch(
  //     counterKeypair.publicKey
  //   );

  //   expect(currentCount.count).toEqual(1);
  // });

  // it('Increment Counter Again', async () => {
  //   await program.methods
  //     .increment()
  //     .accounts({ counterfield: counterKeypair.publicKey })
  //     .rpc();

  //   const currentCount = await program.account.counterStruct.fetch(
  //     counterKeypair.publicKey
  //   );

  //   expect(currentCount.count).toEqual(2);
  // });

  // it('Decrement Counter', async () => {
  //   await program.methods
  //     .decrement()
  //     .accounts({ counterfield: counterKeypair.publicKey })
  //     .rpc();

  //   const currentCount = await program.account.counterStruct.fetch(
  //     counterKeypair.publicKey
  //   );

  //   expect(currentCount.count).toEqual(1);
  // });

  // it('Set counter value', async () => {
  //   await program.methods
  //     .set(42)
  //     .accounts({ counterfield: counterKeypair.publicKey })
  //     .rpc();

  //   const currentCount = await program.account.counterStruct.fetch(
  //     counterKeypair.publicKey
  //   );

  //   expect(currentCount.count).toEqual(42);
  // });


  // it(
  //   'Set close the counter account',
  //   async () => {
  //     await program.methods
  //       .close()
  //       .accounts({
  //         payer: payer.publicKey,
  //         counterfield: counterKeypair.publicKey,
  //       })
  //       .rpc();
  
  //     // The account should no longer exist, returning null.
  //     const userAccount = await program.account.counterStruct.fetchNullable(
  //       counterKeypair.publicKey
  //     );
  //     expect(userAccount).toBeNull();
  //   },
  //   10000 // Increase the timeout to 10 seconds - I have to add this because I will get a timeout when doing this on devnet
  // );

});





