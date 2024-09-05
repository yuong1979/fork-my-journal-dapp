use anchor_lang::prelude::*;
 
declare_id!("6yBS55zXwFP7f2XeqbUazdBTaU3Ym6VDigi7VM3HwCLN");
 
#[program]
pub mod tester {
    use super::*;
 
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.mycounter;
        counter.count = 0;
        msg!("Counter Account Created");
        msg!("Current Count: { }", counter.count);
        Ok(())
    }


    pub fn increment(ctx: Context<Update>) -> Result<()> { // the Context type is a way to encapsulate all the accounts and additional information needed for a specific instruction. It serves as a structured way to pass around the necessary data for executing a function.
        let counter = &mut ctx.accounts.mycounter;
        msg!("Previous counter: {}", counter.count);
        counter.count = counter.count.checked_add(1).unwrap(); 
        msg!("Counter incremented. Current count: {}", counter.count);
        Ok(())
    }


}


#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8)] // attribute is applied to the counter field to specify that this account will be initialized when the instruction is executed.
    pub mycounter: Account<'info, Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>, // his field represents the System Program account, which is responsible for creating and managing accounts on the Solana blockchain.
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub mycounter: Account<'info, Counter>,
    pub user: Signer<'info>, // In the Update context, the user account does not need to be mutable because it is not being modified; it is only being used to authorize the update operation.
}


#[account]
pub struct Counter {
    pub count: u64,
}


// anchor init anchor-counter - only necessary when setting up the project
// anchor keys sync
// anchor build
// anchor test




// use anchor_lang::prelude::*;

// declare_id!("CTfdesfLSPMXznTXXXaGM4Vsk5W8crZqZ6buXwjUNhDU");

// #[program]
// pub mod anchor_counter {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         msg!("Greetings from: {:?}", ctx.program_id);
//         Ok(())
//     }
// }

// #[derive(Accounts)]
// pub struct Initialize {}
