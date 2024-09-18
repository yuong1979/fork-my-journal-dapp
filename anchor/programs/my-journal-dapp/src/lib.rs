
#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("6nuW8uB6ske99BLDXZms5Z41xvR3oaUkkkLA3mdQjc6E");
// 9SmYx4XJoJLxmm2Hr6mvX6tDoxcwwozc7KHGiYXmfmk8
// J6bmS32sscViMMHZcRBMmbqAgfh6WX6jYeYz5ZTiEbGq

#[program]
mod my_journal_dapp {
    use super::*;
 
    pub fn create_journal_entry(
        ctx: Context<CreateEntry>,
        title: String,
        message: String,
    ) -> Result<()> {
        msg!("Journal Entry Created");
        msg!("Title: {}", title);
        msg!("Message: {}", message);
 
        let journal_entry = &mut ctx.accounts.journal_entry;
        journal_entry.owner = ctx.accounts.owner.key();
        journal_entry.title = title;
        journal_entry.message = message;
        Ok(())
    }


    pub fn update_journal_entry(
      ctx: Context<UpdateEntry>,
      title: String,
      message: String,
  ) -> Result<()> {
      msg!("Journal Entry Updated");
      msg!("Title: {}", title);
      msg!("Message: {}", message);

      let journal_entry = &mut ctx.accounts.journal_entry;
      journal_entry.message = message;

      Ok(())
  }

    pub fn delete_journal_entry(_ctx: Context<DeleteEntry>, title: String) -> Result<()> {
        msg!("Journal entry titled {} deleted", title);
        Ok(())
    }

}



#[account]
#[derive(InitSpace)]
pub struct JournalEntryState {
    pub owner: Pubkey,
    #[max_len(50)]
    pub title: String,
     #[max_len(1000)]
    pub message: String,
}


impl JournalEntryState {
    pub const INIT_SPACE: usize = 8 + 32 + 1 + 4 + 50 + 4 + 1000; // Adjusted space calculation
}


#[derive(Accounts)]
#[instruction(title: String, message: String)]
pub struct CreateEntry<'info> {
    #[account(
        init_if_needed,
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + JournalEntryState::INIT_SPACE
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(title: String, message: String)]
pub struct UpdateEntry<'info> {
    #[account(
        mut,
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump,
        // realloc = 8 + 32 + 1 + 4 + title.len() + 4 + message.len(),
        realloc = 8 + 32 + 1 + 4 + 50 + 4 + 1000, // Updated space calculation
        realloc::payer = owner,
        realloc::zero = true,
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}




#[derive(Accounts)]
#[instruction(title: String)]
pub struct DeleteEntry<'info> {
    #[account(
        mut,
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump,
        close = owner,
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}































// #![allow(clippy::result_large_err)]

// use anchor_lang::prelude::*;

// declare_id!("9SmYx4XJoJLxmm2Hr6mvX6tDoxcwwozc7KHGiYXmfmk8");

// #[program]
// pub mod my_journal_dapp {
//     use super::*;

//   pub fn close(_ctx: Context<CloseMyJournalDapp>) -> Result<()> {
//     Ok(())
//   }

//   pub fn decrement(ctx: Context<Update>) -> Result<()> {
//     ctx.accounts.my_journal_dapp.count = ctx.accounts.my_journal_dapp.count.checked_sub(1).unwrap();
//     Ok(())
//   }

//   pub fn increment(ctx: Context<Update>) -> Result<()> {
//     ctx.accounts.my_journal_dapp.count = ctx.accounts.my_journal_dapp.count.checked_add(1).unwrap();
//     Ok(())
//   }

//   pub fn initialize(_ctx: Context<InitializeMyJournalDapp>) -> Result<()> {
//     Ok(())
//   }

//   pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
//     ctx.accounts.my_journal_dapp.count = value.clone();
//     Ok(())
//   }
// }

// #[derive(Accounts)]
// pub struct InitializeMyJournalDapp<'info> {
//   #[account(mut)]
//   pub payer: Signer<'info>,

//   #[account(
//   init,
//   space = 8 + MyJournalDapp::INIT_SPACE,
//   payer = payer
//   )]
//   pub my_journal_dapp: Account<'info, MyJournalDapp>,
//   pub system_program: Program<'info, System>,
// }
// #[derive(Accounts)]
// pub struct CloseMyJournalDapp<'info> {
//   #[account(mut)]
//   pub payer: Signer<'info>,

//   #[account(
//   mut,
//   close = payer, // close account and return lamports to payer
//   )]
//   pub my_journal_dapp: Account<'info, MyJournalDapp>,
// }

// #[derive(Accounts)]
// pub struct Update<'info> {
//   #[account(mut)]
//   pub my_journal_dapp: Account<'info, MyJournalDapp>,
// }

// #[account]
// #[derive(InitSpace)]
// pub struct MyJournalDapp {
//   count: u8,
// }
