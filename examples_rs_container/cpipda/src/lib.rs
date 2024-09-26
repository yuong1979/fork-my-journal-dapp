/// PDA - PDAs as Unique Program Accounts: PDAs allow Solana programs to create unique accounts that can store data or state related to individual users or activities without requiring users to manage their own keypairs. This means that the program can handle user-specific interactions securely and efficiently. 
/// User Interaction: When users interact with a Solana program, the program can use PDAs to manage user-specific data or states, enabling tailored responses based on individual user activities.
//////////////////////////////////////////////////
//////////   3   ///////////////////////////////// https://solana.com/developers/guides/getstarted/how-to-cpi-with-signer
//////////////////////////////////////////////////

use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
 
declare_id!("HyQso9nsNcEGSY8mAiDWjSWKrXazCp9mRv8tgKxVLt1R");


#[program]
pub mod cpipda {
    use super::*;
 
    pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
        let from_pubkey = ctx.accounts.pda_account.to_account_info();
        let to_pubkey = ctx.accounts.recipient.to_account_info();
        let program_id = ctx.accounts.system_program.to_account_info();
 
        // to create signer seeds
        let seed = to_pubkey.key();
        let bump_seed = ctx.bumps.pda_account;
        let signer_seeds: &[&[&[u8]]] = &[&[b"pda", seed.as_ref(), &[bump_seed]]];
 
        // CpiContext is part of anchor_lang::prelude so does not need to be explicitly imported
        let cpi_context = CpiContext::new(
            program_id,
            Transfer {
                from: from_pubkey,
                to: to_pubkey,
            },
        )
        .with_signer(signer_seeds); // required to interact with the struct Soltransfer because it has the account - pda_account: SystemAccount<'info>,
 
        transfer(cpi_context, amount)?;
        Ok(())
    }
}
 
#[derive(Accounts)]
pub struct SolTransfer<'info> {
    #[account(
        mut,
        seeds = [b"pda", recipient.key().as_ref()],
        bump,
    )]
    //SystemAccount<'info> is a type that represents accounts managed by the Solana System Program. This type is used to denote accounts that are involved in basic operations such as transferring SOL, creating new accounts, or managing account balances.
    pda_account: SystemAccount<'info>,
    #[account(mut)]
    recipient: SystemAccount<'info>,
    system_program: Program<'info, System>,
}



// Also, why does the seed need to include the recipient.key? what does the recipient.key mean?
// why is the recipient also the signer?





// ///// this method achieves the same output as the above
// use anchor_lang::solana_program::{program::invoke_signed, system_instruction};

// pub fn sol_transfer(ctx: Context<SolTransfer>, amount: u64) -> Result<()> {
//     let from_pubkey = ctx.accounts.pda_account.to_account_info();
//     let to_pubkey = ctx.accounts.recipient.to_account_info();
//     let program_id = ctx.accounts.system_program.to_account_info();
 
//     let seed = to_pubkey.key();
//     let bump_seed = ctx.bumps.pda_account;
//     let signer_seeds: &[&[&[u8]]] = &[&[b"pda", seed.as_ref(), &[bump_seed]]];
 
//     let instruction =
//         &system_instruction::transfer(&from_pubkey.key(), &to_pubkey.key(), amount);
 
//     invoke_signed(instruction, &[from_pubkey, to_pubkey, program_id], signer_seeds)?;
//     Ok(())
// }