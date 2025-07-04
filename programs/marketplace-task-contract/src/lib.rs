use anchor_lang::prelude::*;

declare_id!("DdCdyqtVBk29asgRLHJAFwnMjh1r5hMvBXsENyTNAgt3");

pub mod state;
pub mod contexts;
pub mod errors;

pub use contexts::*;
pub use errors::*;

#[program]
pub mod marketplace_task_contract {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, name: String, fee: u16) -> Result<()> {
        ctx.accounts.init(name, fee, &ctx.bumps)
    }

    pub fn list(ctx: Context<List>, price: u64) -> Result<()> {
        ctx.accounts.create_listing(price, &ctx.bumps)?;
        ctx.accounts.deposit_nft()
    }

    pub fn delist(ctx: Context<Delist>) -> Result<()> {
        ctx.accounts.withdraw_nft()
    }

    pub fn purchase(ctx: Context<Purchase>) -> Result<()> {
        ctx.accounts.send_sol()?;
        ctx.accounts.send_nft()?;
        ctx.accounts.close_mint_vault()

    }
}
