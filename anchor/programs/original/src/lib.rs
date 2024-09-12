use anchor_lang::prelude::*;

declare_id!("CdD79ktXrzQCTmWRH2UVBy6TjjQsSoMgpAzYTr5f575B");

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


