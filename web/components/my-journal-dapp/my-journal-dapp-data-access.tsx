"use client";

import { getJournalProgram, getJournalProgramId } from "@my-journal-dapp/anchor";
import { useConnection } from "@solana/wallet-adapter-react";
import { Cluster, PublicKey } from "@solana/web3.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCluster } from "../cluster/cluster-data-access";
import { useAnchorProvider } from "../solana/solana-provider";
import { useTransactionToast } from "../ui/ui-layout";
import { useMemo } from "react";

interface CreateEntryArgs {
  title: string;
  message: string;
  owner: PublicKey;
}

export function useJournalProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getJournalProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getJournalProgram(provider);

  const accounts = useQuery({
    queryKey: ["journal", "all", { cluster }],
    queryFn: () => program.account.journalEntryState.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ["get-program-account", { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const createEntry = useMutation<string, Error, CreateEntryArgs>({
    mutationKey: ["journalEntry", "create", { cluster }],
    mutationFn: async ({ title, message }) => {
      return program.methods.createJournalEntry(title, message).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to create journal entry: ${error.message}`);
    },
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    createEntry,
  };
}

export function useJournalProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = useJournalProgram();

  const accountQuery = useQuery({
    queryKey: ["journal", "fetch", { cluster, account }],
    queryFn: () => program.account.journalEntryState.fetch(account),
  });

  const updateEntry = useMutation<string, Error, CreateEntryArgs>({
    mutationKey: ["journalEntry", "update", { cluster }],
    mutationFn: async ({ title, message, owner }) => {
      return program.methods.updateJournalEntry(title, message).rpc();
    },
    onSuccess: (signature) => {
      transactionToast(signature);
      accounts.refetch();
    },
    onError: (error) => {
      toast.error(`Failed to update journal entry: ${error.message}`);
    },
  });

  const deleteEntry = useMutation({
    mutationKey: ["journal", "deleteEntry", { cluster, account }],
    mutationFn: (title: string) =>
      program.methods.deleteJournalEntry(title).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  return {
    accountQuery,
    updateEntry,
    deleteEntry,
  };
}








// 'use client';

// import {
//   getMyJournalDappProgram,
//   getMyJournalDappProgramId,
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

// export function useMyJournalDappProgram() {
//   const { connection } = useConnection();
//   const { cluster } = useCluster();
//   const transactionToast = useTransactionToast();
//   const provider = useAnchorProvider();
//   const programId = useMemo(
//     () => getMyJournalDappProgramId(cluster.network as Cluster),
//     [cluster]
//   );
//   const program = getMyJournalDappProgram(provider);

//   const accounts = useQuery({
//     queryKey: ['my-journal-dapp', 'all', { cluster }],
//     queryFn: () => program.account.myJournalDapp.all(),
//   });

//   const getProgramAccount = useQuery({
//     queryKey: ['get-program-account', { cluster }],
//     queryFn: () => connection.getParsedAccountInfo(programId),
//   });

//   const initialize = useMutation({
//     mutationKey: ['my-journal-dapp', 'initialize', { cluster }],
//     mutationFn: (keypair: Keypair) =>
//       program.methods
//         .initialize()
//         .accounts({ myJournalDapp: keypair.publicKey })
//         .signers([keypair])
//         .rpc(),
//     onSuccess: (signature) => {
//       transactionToast(signature);
//       return accounts.refetch();
//     },
//     onError: () => toast.error('Failed to initialize account'),
//   });

//   return {
//     program,
//     programId,
//     accounts,
//     getProgramAccount,
//     initialize,
//   };
// }

// export function useMyJournalDappProgramAccount({
//   account,
// }: {
//   account: PublicKey;
// }) {
//   const { cluster } = useCluster();
//   const transactionToast = useTransactionToast();
//   const { program, accounts } = useMyJournalDappProgram();

//   const accountQuery = useQuery({
//     queryKey: ['my-journal-dapp', 'fetch', { cluster, account }],
//     queryFn: () => program.account.myJournalDapp.fetch(account),
//   });

//   const closeMutation = useMutation({
//     mutationKey: ['my-journal-dapp', 'close', { cluster, account }],
//     mutationFn: () =>
//       program.methods.close().accounts({ myJournalDapp: account }).rpc(),
//     onSuccess: (tx) => {
//       transactionToast(tx);
//       return accounts.refetch();
//     },
//   });

//   const decrementMutation = useMutation({
//     mutationKey: ['my-journal-dapp', 'decrement', { cluster, account }],
//     mutationFn: () =>
//       program.methods.decrement().accounts({ myJournalDapp: account }).rpc(),
//     onSuccess: (tx) => {
//       transactionToast(tx);
//       return accountQuery.refetch();
//     },
//   });

//   const incrementMutation = useMutation({
//     mutationKey: ['my-journal-dapp', 'increment', { cluster, account }],
//     mutationFn: () =>
//       program.methods.increment().accounts({ myJournalDapp: account }).rpc(),
//     onSuccess: (tx) => {
//       transactionToast(tx);
//       return accountQuery.refetch();
//     },
//   });

//   const setMutation = useMutation({
//     mutationKey: ['my-journal-dapp', 'set', { cluster, account }],
//     mutationFn: (value: number) =>
//       program.methods.set(value).accounts({ myJournalDapp: account }).rpc(),
//     onSuccess: (tx) => {
//       transactionToast(tx);
//       return accountQuery.refetch();
//     },
//   });

//   return {
//     accountQuery,
//     closeMutation,
//     decrementMutation,
//     incrementMutation,
//     setMutation,
//   };
// }
