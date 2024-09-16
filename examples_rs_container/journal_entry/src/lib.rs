use anchor_lang::prelude::*;
 
// This is your program's public key and it will update automatically when you build the project.
declare_id!("A9E4NUnNmqWheUKL7mTANUaNWP4hajpbodve5YtFubSi");
 
#[program]
pub mod journal {
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
        journal_entry.owner = ctx.accounts.owner.key(); // this does not need dereferencing because it is a method, outputs from functions are not referenced - pub owner: Pubkey,
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
#[derive(InitSpace)] //works with the #[max_len(50)] and #[max_len(1000)] and space = 8 + JournalEntryState::INIT_SPACE 
pub struct JournalEntryState {
    pub owner: Pubkey, // Owner: 32 bytes
    #[max_len(50)] // the #[max_len(...)] attributes work in conjunction with the #[derive(InitSpace)] macro to ensure that the total space required for the account is accurately calculated
    pub title: String, // Title: 50 bytes + 8 bytes (overhead) = 58 bytes
     #[max_len(1000)] // the #[max_len(...)] attributes work in conjunction with the #[derive(InitSpace)] macro to ensure that the total space required for the account is accurately calculated
    pub message: String, // Message: 1000 bytes + 8 bytes (overhead) = 1008 bytes
}


#[derive(Accounts)]
#[instruction(title: String, message: String)] //The #[instruction(...)] attribute is used to declare the parameters that will be passed to the account macro below.
pub struct CreateEntry<'info> {
    #[account(
        init_if_needed, // init_if_needed when you want to allow for the possibility of the account already existing and handle both creation and usage in a single instruction, but be mindful of the potential for re-initialization attacks and ensure proper checks are in place. init if needed is much more dangerous so it has to be imported separately but using it enables better UI, confirm only once on the wallet at the tradeoff of reinit attacks
        seeds = [title.as_bytes(), owner.key().as_ref()],
        bump, // The base address for an account is derived from a combination of seeds (like title and owner.key()), and the bump parameter can be added to increase uniqueness further.
        payer = owner,
        space = 8 + JournalEntryState::INIT_SPACE // The space required for the fields in JournalEntryState, which is calculated by the InitSpace derive macro.
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
        bump, // The base address for an account is derived from a combination of seeds (like title and owner.key()), and the bump parameter can be added to increase uniqueness further.
        realloc = 8 + 32 + 1 + 4 + title.len() + 4 + message.len(), // When you want to update an account's data structure and the new data requires more space than what was originally allocated, you can use the realloc feature to resize the account. This is particularly useful when the size of the data structure can change, such as when a new message is added to the journal entry.
        realloc::payer = owner, //defining the person who pays for the resizing of the account
        realloc::zero = true, // This is important for security and data integrity, as it ensures that any new memory does not contain leftover data from previous allocations, which could lead to unintended behavior or vulnerabilities.
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
        seeds = [title.as_bytes(), owner.key().as_ref()], //By using a combination of seeds (title.as_bytes() and owner.key().as_ref()) , you can ensure that each account has a unique address without collisions.
        bump, 
        close = owner, //By allowing the owner to receive any remaining funds, you give users control over their assets and ensure they are not lost when an account is deleted.
    )]
    pub journal_entry: Account<'info, JournalEntryState>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

