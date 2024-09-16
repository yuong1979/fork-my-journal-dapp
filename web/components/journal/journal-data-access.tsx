
// 'use client';

// import {
//   getCounterProgram,
//   getCounterProgramId,
// } from '@my-journal-dapp/anchor';
// import { Program } from '@coral-xyz/anchor';
// import { useConnection } from '@solana/wallet-adapter-react';
// import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import { useMemo } from 'react';
// import toast from 'react-hot-toast';
// import { useCluster } from '../cluster/cluster-data-access';
// import { useAnchorProvider } from '../solana/solana-provider';
// import { useTransactionToast } from '../ui/ui-layout';










// const createEntry = useMutation<string, Error, CreateEntryArgs>({
//     mutationKey: ["journalEntry", "create", { cluster }],
//     mutationFn: async ({ title, message, owner }) => {
//       const [journalEntryAddress] = await PublicKey.findProgramAddress(
//         [Buffer.from(title), owner.toBuffer()],
//         programId,
//       );
   
//       return program.methods
//         .createJournalEntry(title, message)
//         .accounts({
//           journalEntry: journalEntryAddress,
//         })
//         .rpc();
//     },
//     onSuccess: signature => {
//       transactionToast(signature);
//       accounts.refetch();
//     },
//     onError: error => {
//       toast.error(`Failed to create journal entry: ${error.message}`);
//     },
//   });



//   const updateEntry = useMutation<string, Error, CreateEntryArgs>({
//     mutationKey: ["journalEntry", "update", { cluster }],
//     mutationFn: async ({ title, message, owner }) => {
//       const [journalEntryAddress] = await PublicKey.findProgramAddress(
//         [Buffer.from(title), owner.toBuffer()],
//         programId,
//       );
   
//       return program.methods
//         .updateJournalEntry(title, message)
//         .accounts({
//           journalEntry: journalEntryAddress,
//         })
//         .rpc();
//     },
//     onSuccess: signature => {
//       transactionToast(signature);
//       accounts.refetch();
//     },
//     onError: error => {
//       toast.error(`Failed to update journal entry: ${error.message}`);
//     },
//   });
   
//   const deleteEntry = useMutation({
//     mutationKey: ["journal", "deleteEntry", { cluster, account }],
//     mutationFn: (title: string) =>
//       program.methods
//         .deleteJournalEntry(title)
//         .accounts({ journalEntry: account })
//         .rpc(),
//     onSuccess: tx => {
//       transactionToast(tx);
//       return accounts.refetch();
//     },
//   });