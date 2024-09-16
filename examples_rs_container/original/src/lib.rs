use anchor_lang::prelude::*;

declare_id!("CUu2jSioNxW5HEj5WjUpVwoiiUhGH1kZNEKJ4nBKkL8");

#[program]
pub mod original {
    use super::*;

    pub fn initializego(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn hello_world(_ctx: Context<Initialize>) -> Result<()> {
        msg!("Hello world, from solana smart contract");
        Ok(())
    }




}

#[derive(Accounts)]
pub struct Initialize {}


