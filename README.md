
# my-journal-dapp

This project is generated with the [create-solana-dapp](https://github.com/solana-developers/create-solana-dapp) generator.

## Getting Started

### Prerequisites

- Node v18.18.0 or higher

- Rust v1.77.2 or higher
- Anchor CLI 0.30.0 or higher
- Solana CLI 1.18.9 or higher

### Installation

#### Clone the repo

```shell
git clone <repo-url>
cd <repo-name>
```

#### Install Dependencies

```shell
npm install
```

#### Start the web app

```
npm run dev
```

## Apps

### anchor

This is a Solana program written in Rust using the Anchor framework.

#### Commands

You can use any normal anchor commands. Either move to the `anchor` directory and run the `anchor` command or prefix the command with `npm run`, eg: `npm run anchor`.

#### Sync the program id:

Running this command will create a new keypair in the `anchor/target/deploy` directory and save the address to the Anchor config file and update the `declare_id!` macro in the `./src/lib.rs` file of the program.

You will manually need to update the constant in `anchor/lib/counter-exports.ts` to match the new program id.

```shell
npm run anchor keys sync
```

#### Build the program:

```shell
npm run anchor-build
```

#### Start the test validator with the program deployed:

```shell
npm run anchor-localnet
```

#### Run the tests

```shell
npm run anchor-test
```

#### Deploy to Devnet

```shell
npm run anchor deploy --provider.cluster devnet
```

### web

This is a React app that uses the Anchor generated client to interact with the Solana program.

#### Commands

Start the web app

```shell
npm run dev
```

Build the web app

```shell
npm run build
```


#####################################
#### reset keypair ####
#####################################
### generate a new keypair
solana-keygen new --outfile target/deploy/your_program-keypair.json
### get the keypair public key
solana address -k target/deploy/your_program-keypair.json
### replace declare id in lib.rs with new keypair
change the declare id in lib.rs


#####################################
#### install and deploy frontend ####
#####################################

``` install the neccessary packages
npm install
```

``` run the frontend
npm run dev
```

#####################################
#### deploy / test on devnet or localnet ####
#####################################

``` run test (run inside anchor directory)
anchor build
```

``` sync all keys (run inside anchor directory)
anchor keys sync
anchor keys list (to confirm that every program has a key)
```

``` run test either on localhost or devnet, change anchor.toml cluster to either reflect localnet or devnet before deployment
anchor test
```

``` deploy to localhost or devnet, change anchor.toml cluster to either reflect localnet or devnet before deployment
solana config set --url http://localhost:8899       (Ensure that solana-test-validator is running)
solana config set --url devnet
anchor deploy 
```




### send sol tokens to a wallet
solana transfer AfqgStkQV7wkBdiLbPL5T6w2GJjFqGzGWWXCmMeNApTt 2 --allow-unfunded-recipient


#### to generate new keypair for declare id
solana-keygen new --outfile target/deploy/calculator-keypair.json
solana address -k target/deploy/calculator-keypair.json


####  Clears stale state or corrupted cache, nx reset helps resolve them by starting fresh
npx nx reset


#### deploy programs separately
solana program deploy <PROGRAM_FILE_PATH>
i.e go to anchor directory and do - solana program deploy target/deploy/cpipda.so


#### show programs
solana program show <ACCOUNT_ADDRESS>
i.e - solana program show 8cxaTXpBqsYzQDmWq9d8MnB49vo6AqRJKZb2d43QHB7r


#### test solana libraries using these two files
web/components/reference/ref-all.tsx
web/components/ui-layout.tsx


#### deploy specific programs - in this case counter
solana program deploy target/deploy/counter.so

#### upgrade specific programs - in this case counter
anchor upgrade target/deploy/counter.so --program-id FKDvA41GviyF298NbfSZCMMk5WM7TLrCu1oFcyZFN3sr

<!-- solana program deploy --upgrade-authority <UPGRADE_AUTHORITY_SIGNER> target/deploy/your_program.so -->


<!-- intro -->
<!-- https://solana.com/developers/guides/games/nfts-in-games -->
<!-- https://solana.com/developers/guides/getstarted/local-rust-hello-world -->
<!-- https://solana.com/developers/guides/getstarted/scaffold-nextjs-anchor -->


<!-- beginner -->