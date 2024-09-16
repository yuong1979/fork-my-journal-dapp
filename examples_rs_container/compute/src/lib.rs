
#![allow(clippy::result_large_err)]
use anchor_lang::prelude::*;

use bytemuck::{Pod, Zeroable};
use std::str::FromStr; // Import FromStr for Pubkey conversion


declare_id!("Dez3NYhjPos4yRXPonkxhv9dbqjQadLGZvdtB3wDD6Da");

#[macro_export] // attribute indicates that this macro should be made available to other modules or crates that include your crate. Without this attribute, the macro would only be accessible within the module where it is defined.
#[cfg(not(feature = "trace-compute"))]
macro_rules! compute { //macro_rules! is a type of declarative macro
    ($msg:expr=> $($tt:tt)*) => { $($tt)* };
}

/// Total extra compute units used per compute_fn! call 409 CU
/// https://github.com/anza-xyz/agave/blob/d88050cda335f87e872eddbdf8506bc063f039d3/programs/bpf_loader/src/syscalls/logging.rs#L70
/// https://github.com/anza-xyz/agave/blob/d88050cda335f87e872eddbdf8506bc063f039d3/program-runtime/src/compute_budget.rs#L150


// => { ... }: This is the macro transcriber or expansion. It specifies the code that will replace the macro invocation when a match is found. The curly braces {} are used to enclose the expansion.
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
pub mod compute {
    use super::*;

    /// Initializes the program and logs a greeting message with the program ID.
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }

    /// Logs a "Hello World" message to the Solana logs.
    pub fn hello_world(_ctx: Context<Initialize>) -> Result<()> {
        compute_fn!("Hello World" => {
            msg!("Hello world, from Solana smart contract");
        });
        Ok(())
    }

    /// Logs the public key of the `counter` account to the Solana logs.
    pub fn log_pubkey(ctx: Context<InitializeCounter>) -> Result<()> {
        compute_fn!("Log a pubkey to account info" => {
            msg!("A string {}", ctx.accounts.counter.to_account_info().key());
        });
        Ok(())
    }

    /// Logs a hardcoded public key string to the Solana logs.
    pub fn log_pubkey_simple(ctx: Context<Initialize>) -> Result<()> {
        compute_fn!("Log a pubkey simple concat" => {
            msg!("A string {}", "5w6z5PWvtkCd4PaAV7avxE6Fy5brhZsFdbRLMt8UefRQ");
        });
        Ok(())
    }

    /// Logs the public key of the `counter` account efficiently by directly calling the log method.
    pub fn log_pubkey_efficient(ctx: Context<InitializeCounter>) -> Result<()> {
        compute_fn!("Log a pubkey" => {
            ctx.accounts.counter.to_account_info().key().log();
        });
        Ok(())
    }

    /// Pushes six `u64` values into a vector and logs the operation.
    pub fn push_vector_u64(ctx: Context<Initialize>) -> Result<()> {
        compute_fn!("Push Vector u64" => {
            let mut a: Vec<u64> = Vec::new();
            for _ in 0..6 {
                a.push(1);
            }
        });
        Ok(())
    }

    /// Pushes six `u8` values into a vector and logs the operation.
    pub fn push_vector_u8(ctx: Context<Initialize>) -> Result<()> {
        compute_fn!("Vector u8" => {
            let mut a: Vec<u8> = Vec::new();
            for _ in 0..6 {
                a.push(1);
            }
        });
        Ok(())
    }

    /// Initializes the `counter` account and increments its count by 1.
    pub fn initialize_counter(ctx: Context<InitializeCounter>) -> Result<()> {
        compute_fn!("Borsh Serialize" => {
            let counter = &mut ctx.accounts.counter;
            counter.count = counter.count.checked_add(1).unwrap();
        });
        Ok(())
    }

    /// Finds and creates a Program Derived Address (PDA) for the counter.
    pub fn find_pda(ctx: Context<PdaAccounts>) -> Result<()> {
        let program_id = Pubkey::from_str("5w6z5PWvtkCd4PaAV7avxE6Fy5brhZsFdbRLMt8UefRQ").unwrap();

        compute_fn!("Find PDA" => {
            Pubkey::find_program_address(&[b"counter"], ctx.program_id);
        });

        compute_fn!("Create PDA" => {
            Pubkey::create_program_address(&[b"counter", &[248_u8]], &program_id).unwrap();
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}

#[derive(Accounts)]
pub struct InitializeCounter<'info> {
    #[account(mut)]
    pub counter: Account<'info, CounterData>,
}

#[derive(Accounts)]
pub struct InitializeCounterZeroCopy<'info> {
    #[account(mut)]
    pub counter_zero_copy: Account<'info, CounterData>,
}

#[derive(Accounts)]
pub struct PdaAccounts<'info> {
    #[account(mut)]
    pub counter: Account<'info, CounterData>,
    #[account(
        seeds = [b"counter"],
        bump
    )]
    pub counter_checked: Account<'info, CounterData>,
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

