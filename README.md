
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





solana config get

solana config set --url http://localhost:8899

solana config set --url devnet


Things to do
- consolidate the files into my-journal-dapp and make sure they can be run
- complete the tutorial for https://solana.com/developers/guides/dapps/journal 
- configure so that this can be deployed on to local as well
- document how to deploy this on local



``` synchronise all the keys in your project 
anchor/src/file.ts
anchor/programs/counter/src/lib.rs - change the declareid
anchor/Anchor.toml
anchor/programs/counter/target/idl/file.json
anchor/programs/counter/target/types/file.ts

``` 



#### install and deploy frontend ####

``` install the neccessary packages
npm install
```

``` run the frontend
npm run dev
```

#### deploy on devnet ####

``` change all script to devnet on - ?
```

``` run test (run inside anchor directory)
anchor build
```

``` run test (run inside anchor directory)
anchor test
```

``` deploy to devnet (run inside anchor directory)
anchor deploy --provider.cluster devnet
```

``` send sol tokens to a wallet
solana transfer AfqgStkQV7wkBdiLbPL5T6w2GJjFqGzGWWXCmMeNApTt 2 --allow-unfunded-recipient
``` 


``` test new typescript api - make changes on these two scripts
web/components/reference/ref-all.tsx
web/components/ui-layout.tsx
``` 


