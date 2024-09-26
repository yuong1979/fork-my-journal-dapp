use anchor_lang::prelude::*;
 
declare_id!("5N6KPnhjSLNahLytmL2NhTZy95Hk4CujAe6xLP2xmtwy");
 
#[program]
mod tiny_adventure {
    use super::*;
 
    // Instruction to initialize GameDataAccount and set position to 0
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // msg!("Initializing game data account...");
        ctx.accounts.new_game_data_account.player_position = 0;
        msg!("A Journey Begins!");
        msg!("o.......");
        Ok(())
    }


    // Instruction to move left
    pub fn move_left(ctx: Context<MoveLeft>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 0 {
            msg!("You are back at the start.");
        } else {
            game_data_account.player_position -= 1;
            print_player(game_data_account.player_position);
        }
        Ok(())
    }

    // Instruction to move right
    pub fn move_right(ctx: Context<MoveRight>) -> Result<()> {
        let game_data_account = &mut ctx.accounts.game_data_account;
        if game_data_account.player_position == 3 {
            msg!("You have reached the end! Super!");
        } else {
            game_data_account.player_position = game_data_account.player_position + 1;
            print_player(game_data_account.player_position);
        }
        Ok(())
    }


}
 
// Define the Game Data Account structure
#[account]
pub struct GameDataAccount {
    player_position: u8,
}
 


// Specify the accounts required by the initialize instruction
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(

        init,
        // init_if_needed,

        // remove this to deactivate pda and run tiny_adventure.spec.ts instead of tiny_adventurepda.spec.ts
        seeds = [b"level1"],
        bump,

        payer = payer,
        space = 8 + std::mem::size_of::<GameDataAccount>()
        // space = 8 + 1
    )]
    pub new_game_data_account: Account<'info, GameDataAccount>,
    pub system_program: Program<'info, System>,
}



// Specify the account required by the move_left instruction
#[derive(Accounts)]
pub struct MoveLeft<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}


// Specify the account required by the move_right instruction
#[derive(Accounts)]
pub struct MoveRight<'info> {
    #[account(mut)]
    pub game_data_account: Account<'info, GameDataAccount>,
}


fn print_player(player_position: u8) {
    if player_position == 0 {
        msg!("A Journey Begins!");
        msg!("o.......");
    } else if player_position == 1 {
        msg!("..o.....");
    } else if player_position == 2 {
        msg!("....o...");
    } else if player_position == 3 {
        msg!("........\\o/");
        msg!("You have reached the end! Super!");
    }
}


//why does struct initialize need pub system_program: Program<'info, System>, and not the rest? And what is it?