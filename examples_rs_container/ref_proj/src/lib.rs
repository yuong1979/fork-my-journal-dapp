#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("9br5tgvUxRJvAVkuUcnua2Ermps1AwdjhPWnig6n1kDU");

// 7AGmMcgd1SjoMsCcXAAYwRgB9ihCyM8cZqjsUqriNRQt - new
// 6cgM7fMwhdSzA8KSMXXj8TeiK2xRmatCyMdZB4xXcvJE - backup 



#[program]
pub mod program_name {
    use super::*;

  // pub fn close(_ctx: Context<CloseCounter>) -> Result<()> {
  //   Ok(())
  // }

  // pub fn decrement(ctx: Context<Update>) -> Result<()> {
  //   ctx.accounts.counterfield.count = ctx.accounts.counterfield.count.checked_sub(1).unwrap();
  //   Ok(())
  // }

  // pub fn increment(ctx: Context<Update>) -> Result<()> {
  //   ctx.accounts.counterfield.count = ctx.accounts.counterfield.count.checked_add(1).unwrap();
  //   Ok(())
  // }

  pub fn initialize(_ctx: Context<InitializeCounter>) -> Result<()> {
    Ok(())
  }

  // pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
  //   ctx.accounts.counterfield.count = value.clone();
  //   Ok(())
  // }
}

#[derive(Accounts)]
pub struct InitializeCounter<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
    init,
    space = 8 + CounterStruct::INIT_SPACE,
    payer = payer
  )]
  pub counterfield: Account<'info, CounterStruct>,
  pub system_program: Program<'info, System>,
}

// #[derive(Accounts)]
// pub struct CloseCounter<'info> {
//   #[account(mut)]
//   pub payer: Signer<'info>,

//   #[account(
//   mut,
//   close = payer, // close account and return lamports to payer
//   )]
//   pub counterfield: Account<'info, CounterStruct>,
// }

// #[derive(Accounts)]
// pub struct Update<'info> {
  
//   #[account(mut)]
//   pub counterfield: Account<'info, CounterStruct>,
// }

#[account]
#[derive(InitSpace)]
pub struct CounterStruct {
  count: u8,
}
