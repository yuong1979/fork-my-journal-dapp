'use client';

import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  TransactionMessage,
  TransactionSignature,
  VersionedTransaction,
  AccountInfo,
  ParsedAccountData
} from '@solana/web3.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTransactionToast } from '../ui/ui-layout';
import React, { useEffect, useState } from 'react';









////////////////////////////////////////////////////////////////////////////////////
///////////////// Demonstration of useMutation /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

interface Todo {
    title: string;
    _id?: string; // Optional _id field for MongoDB
  }
  
  // Function to fetch todos from the database
  const fetchTodos = async (): Promise<Todo[]> => {
    const response = await fetch('/api/todos');
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return data.todos; // Assuming the server returns the todos in this format
  };
  
  // Function to create a new todo
  const createTodo = async (newTodo: Todo): Promise<Todo> => {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to create todo: ${errorData.error || 'Unknown error'}`);
    }
  
    const data = await response.json();
    return data.todo; // Assuming the server returns the created todo in the response
  };
  
  export const TodoApp: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const queryClient = useQueryClient();

    const { data: todos, error, isLoading } = useQuery<Todo[]>({
        queryKey: ['todos'], // Use an array for the query key
        queryFn: fetchTodos,
      });
  
    const mutation = useMutation({
      mutationFn: createTodo,
      onSuccess: (data) => {
        console.log('Todo created successfully!');
        setTitle('');
        // Refetch the todos to update the list
        queryClient.invalidateQueries({ queryKey: ['todos'] }); // Pass an object with queryKey
      },
      onError: (error: Error) => {
        console.error('Error creating todo:', error.message);
      },
    });
  
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      mutation.mutate({ title });
    };
  
    if (isLoading) return <p>Loading todos...</p>;
    if (error) return <p>Error: {error.message}</p>;
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
          />
          <button type="submit" disabled={mutation.status === 'pending'}>
            {mutation.status === 'pending' ? 'Adding...' : 'Add Todo'}
          </button>
          {mutation.isError && <p>Error: {mutation.error.message}</p>}
        </form>
  
        <ul>
          {todos && todos.map((todo) => (
            <li key={todo._id}>{todo.title}</li> // Display each todo item
          ))}
        </ul>
      </div>
    );
  };























//////////////////////////////////////////////////////////////////////////////////
/////////////// console logging unknown syntaxes /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

const address = new PublicKey('AfqgStkQV7wkBdiLbPL5T6w2GJjFqGzGWWXCmMeNApTt');

// Define an interface for the token account
interface TokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}

async function fetchAllTokenAccounts({ address }: { address: PublicKey }, connection: Connection) {
  const [tokenAccounts, token2022Accounts] = await Promise.all([
    connection.getParsedTokenAccountsByOwner(address, {
      programId: TOKEN_PROGRAM_ID,
    }),
    connection.getParsedTokenAccountsByOwner(address, {
      programId: TOKEN_2022_PROGRAM_ID,
    }),
  ]);
  return [...tokenAccounts.value, ...token2022Accounts.value];
}

export const TokenAccountsComponent = () => {
  const { connection } = useConnection();
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>([]);

  useEffect(() => {
    const fetchTokenAccounts = async () => {
      const accounts = await fetchAllTokenAccounts({ address }, connection);
      setTokenAccounts(accounts);
    };
    fetchTokenAccounts();
  }, [connection]);

  return (
    <div>
      <h2>Token Accounts</h2>
      <ul>
        {tokenAccounts.map((account) => (
          <li key={account.pubkey.toString()}>{account.pubkey.toString()}</li>
        ))}
      </ul>
    </div>
  );
};










  
  
  
  
  
  
  
  
  
  
  //////////////////////////////////////////////////////////////////////////////////
  /////////////// Demonstration of useQuery /////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  
  ///// unhide this in ui-layout.tsx to see it in action -  {/* <CountryList />  */}
  
  // Define the Country type based on the expected structure from the API
  interface Country {
      name: {
        common: string; // Common name of the country
      };
    }
    export const CountryList = () => {
    const { data, isLoading, isError, error } = useQuery<Country[]>({ // is data, isLoading, isError keywords
      queryKey: ['countries_list'],
      queryFn: fetchCountries,
    });
  
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error: {error.message}</div>;
    }
    console.log(data)
  
    return (
      <div>
        <h2>Countries</h2>
        <ul>
          {data?.map((country) => (
            <li key={country.name.common}>{country.name.common}</li> // Use common name
          ))}
        </ul>
      </div>
    );
  
  };
  
  async function fetchCountries() {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const data = await response.json(); // Parse the JSON response
      console.log(data); // Log the data to the console
      return data; // Return the parsed data
    }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  


    