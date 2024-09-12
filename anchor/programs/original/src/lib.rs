use anchor_lang::prelude::*;

declare_id!("7wjZqkQDx961U1JPN7QGerPPo9WABKe9fT8RF3FFv3U9");

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


