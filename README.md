
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
#### install and deploy frontend ####
#####################################

``` install the neccessary packages
npm install
```

``` run the frontend
npm run dev
```

#### test solana libraries using these two files
web/components/reference/ref-all.tsx
web/components/ui-layout.tsx



#####################################
#### deploy / test anchor backend on devnet or localnet ####
#####################################

``` make sure that you have deleted the target folder if you are starting a new project

``` make sure that you have your lib.rs and anchor.toml created with the id as "11111111111111111111111111111111" in both files

``` sync all keys (run inside anchor directory) to generate new keypairs / and replace those keypair with your own if you want
anchor keys sync
anchor keys list (to confirm that every program has a key)
```

``` run test (run inside anchor directory)
anchor build
```

``` run test either on localhost or devnet, change anchor.toml cluster to either reflect localnet or devnet before deployment
anchor test
```

``` deploy to localhost or devnet, change anchor.toml cluster to either reflect localnet or devnet before deployment
solana config set --url http://localhost:8899       (Ensure that solana-test-validator is running)
solana config set --url devnet
anchor deploy 
```

``` remove the idl and types inside the target folder so that when you run anchor build, it could be rebuild from scratch, leaves original keypair unchanged inside the deploy folder
anchor clean
```



#####################################
#### Running single .ts files on localnet ####
#####################################
////////////////////////////////////////////////////////////
/////////// Running on Local net ///////////////////////////
////////////////////////////////////////////////////////////
// change anchor.toml file to run on local
// change the script from https://api.devnet.solana.com to http://127.0.0.1:8899
// run solana config set --url http://127.0.0.1:8899
// run "solana-test-validator" on another window
// run "anchor build"
// run "anchor deploy"
// run "npx ts-node scripts/tiny_adventure.ts" (example)



#####################################
#### Running single .ts files on devnet ####
#####################################
// change anchor.toml file to run on devnet
// change the script from http://127.0.0.1:8899 to https://api.devnet.solana.com
// run "solana config set --url devnet"
// run "anchor build"
// run "anchor deploy"
// run "npx ts-node scripts/tiny_adventure.ts" (example)





#####################################
#### NPM/NPX related bash commands
#####################################

#### issues with corrupted npm
rm -rf node_modules
rm package-lock.json
npm install
anchor test

## creating a new scaffold nextjs + anchor
npx create-solana-dapp@latest

### run .ts script inside of anchor
npx ts-node scripts/<PROGRAM_NAME>.ts
npx ts-node scripts/tiny_adventure.ts (example)

####  Clears stale state or corrupted cache, nx reset helps resolve them by starting fresh
npx nx reset






#####################################
#### Solana / Anchor related bash commands
#####################################

#### to generate or reset keypair in the target deploy folder or user can run anchor keys sync to get a new key
solana-keygen new --outfile target/deploy/<FILE_NAME>.json
solana-keygen new --outfile target/deploy/calculator-keypair.json (example)
#### retrieve the public address of the keypair that has been generated
solana address -k target/deploy/<FILE_NAME>.json
solana address -k target/deploy/calculator-keypair.json (example)

#### generating a new keypair in the current directory
solana-keygen new --outfile ./new-keypair.json
#### viewing the generated new keypair
solana-keygen pubkey ./new-keypair.json

#### send sol tokens to a wallet
solana transfer AfqgStkQV7wkBdiLbPL5T6w2GJjFqGzGWWXCmMeNApTt 2 --allow-unfunded-recipient

#### deploy single program
solana program deploy <PROGRAM_FILE_PATH>
solana program deploy target/deploy/counter.so (example)
#### Or this
anchor deploy --program-name <PROGRAM_NAME>
anchor deploy --program-name tiny_adventure (example)

#### Check program details - and whether or not it is upgradable
solana program show <ACCOUNT_ADDRESS>
solana program show 8cxaTXpBqsYzQDmWq9d8MnB49vo6AqRJKZb2d43QHB7r (example)

#### upgrade specific programs - in this case counter
anchor upgrade target/deploy/counter.so --program-id <ACCOUNT_ADDRESS>
anchor upgrade target/deploy/counter.so --program-id 4kxSGyHvsmW7cG5bKUUeVBYXMy53uaY2gw2UVJDLW9un (example)

#### closing the program (include the program id)
solana program close <PROGRAM_ADDRESS> --bypass-warning
solana program close DsRFFDhjJ2a1edTB1NZnDmYHJZxqGGTbod3261HPj59t --bypass-warning (example)

#### Continue the deployment of the program if deployment is halted (be inside anchor folder running this)
solana-keygen recover -o recovered_keypair.json --force
solana program deploy target/deploy/<PROGRAM_NAME>.so --buffer recovered_keypair.json
solana program deploy target/deploy/tiny_adventure.so --buffer recovered_keypair.json (example)

#### increase the size of the program deployed on devnet or mainnet etc
solana program extend <PROGRAM_NAME> 20000 -u d -k ~/.config/solana/id.json
solana program extend 5N6KPnhjSLNahLytmL2NhTZy95Hk4CujAe6xLP2xmtwy 20000 -u d -k ~/.config/solana/id.json (example)

#### For production - to deploy selected program with a designated upgrade authority user hardware wallet / multisig
solana program deploy --upgrade-authority <UPGRADE_AUTHORITY_SIGNER> target/deploy/<PROGRAM_NAME>.so









#####################################
#### Tutorials ####
#####################################

## Intro
Create a token on Solana - Done
https://solana.com/developers/guides/getstarted/how-to-create-a-token

## Beginner
How to CPI with a PDA Signer in a Solana program - Done
https://solana.com/developers/guides/getstarted/how-to-cpi-with-signer


Hello World for Solana Game Development
https://solana.com/developers/guides/games/hello-world
Saving game state
https://solana.com/developers/guides/games/saving-game-state
How to use the Default Account State extension
https://solana.com/developers/guides/token-extensions/default-account-state
Getting Started with Token Extensions
https://solana.com/developers/guides/token-extensions/getting-started
How to use the Interest-Bearing extension
https://solana.com/developers/guides/token-extensions/interest-bearing-tokens
How to use the Immutable Owner extension
https://solana.com/developers/guides/token-extensions/immutable-owner
How to use the Mint Close Authority extension
https://solana.com/developers/guides/token-extensions/mint-close-authority
How to use the Non-transferable extension
https://solana.com/developers/guides/token-extensions/non-transferable 
How to use the Permanent Delegate extension
https://solana.com/developers/guides/token-extensions/permanent-delegate
How to use the Reallocate instruction
https://solana.com/developers/guides/token-extensions/reallocate
How to use the Reallocate instruction
https://solana.com/developers/guides/token-extensions/reallocate
How to use the Required Memo token extension
https://solana.com/developers/guides/token-extensions/required-memo
How to use the Transfer Fee extension
https://solana.com/developers/guides/token-extensions/transfer-fee




## intermediate

Storing SOL in a PDA
https://solana.com/developers/guides/games/store-sol-in-pda
How to interact with tokens in programs
https://solana.com/developers/guides/games/interact-with-tokens
cash app on solana
https://solana.com/developers/guides/dapps/cash-app#solana-mobile-app-template-set-up
How to interact with tokens in programs
https://solana.com/developers/guides/games/interact-with-tokens
Storing SOL in a PDA
https://solana.com/developers/guides/games/store-sol-in-pda
Get All Program Accounts using TypeScript
https://solana.com/developers/guides/javascript/get-program-accounts
How to use the Transfer Hook extension
https://solana.com/developers/guides/token-extensions/transfer-hook


