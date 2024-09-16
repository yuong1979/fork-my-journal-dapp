
#![allow(clippy::result_large_err)]
use anchor_lang::prelude::*;

use bytemuck::{Pod, Zeroable};
use std::str::FromStr; // Import FromStr for Pubkey conversion


declare_id!("6FBApucPnAU4nQi6vcWJcj6CMXWYerNS9nRTseZ6j2ZX");

#[macro_export]
#[cfg(not(feature = "trace-compute"))]
macro_rules! compute {
    ($msg:expr=> $($tt:tt)*) => { $($tt)* };
}

/// Total extra compute units used per compute_fn! call 409 CU
/// https://github.com/anza-xyz/agave/blob/d88050cda335f87e872eddbdf8506bc063f039d3/programs/bpf_loader/src/syscalls/logging.rs#L70
/// https://github.com/anza-xyz/agave/blob/d88050cda335f87e872eddbdf8506bc063f039d3/program-runtime/src/compute_budget.rs#L150
#[macro_export]
macro_rules! compute_fn {
    ($msg:expr=> $($tt:tt)*) => {
        ::solana_program::msg!(concat!($msg, " {"));
        ::solana_program::log::sol_log_compute_units();
        let res = { $($tt)* };
        ::solana_program::log::sol_log_compute_units();
        ::solana_program::msg!(concat!(" } // ", $msg));
        res
    };
}

#[program]
pub mod newtest {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    pub fn hello_world(_ctx: Context<Initialize>) -> Result<()> {
        compute_fn!("Hello World" => {
            msg!("Hello world, from Solana smart contract");
        });
        Ok(())
    }



    // pub fn initialize_zero_copy(ctx: Context<InitializeCounterZeroCopy>) -> Result<()> {
    //     compute_fn!("Zero Copy Serialize" => {
    //         // Ensure the account is mutable and load mutable reference
    //         let counter = &mut ctx.accounts.counter_zero_copy.load_mut();
    //         counter.count = counter.count.checked_add(1).unwrap();
    //     });
    //     Ok(())
    // }


}




#[derive(Accounts)]
pub struct Initialize {}


#[derive(Accounts)]
pub struct InitializeCounterZeroCopy<'info> {
    #[account(mut)]
    pub counter_zero_copy: Account<'info, CounterData>,
}


#[account]
pub struct CounterData {
    pub count: u64,
}





// use anchor_lang::prelude::*;

// declare_id!("CiopW4REhR9a1spXkkipgFGoWh1cvEugbcShK3FRZg7Z");

// #[program]
// pub mod compute {
//     use super::*;

//     pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
//         msg!("Greetings from: {:?}", ctx.program_id);
//         Ok(())
//     }

//     pub fn hello_world(_ctx: Context<Initialize>) -> Result<()> {
//         msg!("Hello world, from solana smart contract");
//         Ok(())
//     }

// }

// #[derive(Accounts)]
// pub struct Initialize {}

