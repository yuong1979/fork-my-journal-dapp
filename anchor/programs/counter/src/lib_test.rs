use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct VoteData {
    pub vote_type: VoteType,
    pub voter: Pubkey,
}

#[derive(AnchorSerialize, AnchorDeserialize)]
pub enum VoteType {
    GM,
    GN,
}

#[program]
pub mod voting {
    use super::*;

    pub fn cast_vote(ctx: Context<CastVote>, vote_data: VoteData) -> Result<()> {
        match vote_data.vote_type {
            VoteType::GM => msg!("Voted for GM!"),
            VoteType::GN => msg!("Voted for GN!"),
        }
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CastVote<'info> {
    #[account(mut)]
    pub vote_account: Account<'info, VoteBank>,
    pub signer: Signer<'info>,
}

#[account]
#[derive(Default)]
pub struct VoteBank {
    pub gm: u64,
    pub gn: u64,
}