use anchor_lang::prelude::*;

declare_id!("6yBS55zXwFP7f2XeqbUazdBTaU3Ym6VDigi7VM3HwCLN");

#[program]
pub mod tester {
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


