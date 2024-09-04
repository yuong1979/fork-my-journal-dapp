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
  clusterApiUrl,
  ParsedAccountData
} from '@solana/web3.js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useTransactionToast } from '../ui/ui-layout';
import React, { createContext, useContext, useEffect, useState } from 'react';






























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
  
  export const TodoUseMutationApp: React.FC = () => {
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


















  export interface Cluster {
    name: string;
    endpoint: string;
    network?: ClusterNetwork;
    active?: boolean;
  }
  
  export enum ClusterNetwork {
    Mainnet = 'mainnet-beta',
    Testnet = 'testnet',
    Devnet = 'devnet',
    Custom = 'custom',
  }
  
  // By default, we don't configure the mainnet-beta cluster
  // The endpoint provided by clusterApiUrl('mainnet-beta') does not allow access from the browser due to CORS restrictions
  // To use the mainnet-beta cluster, provide a custom endpoint
  export const defaultClusters: Cluster[] = [
    {
      name: 'devnet',
      endpoint: clusterApiUrl('devnet'),
      network: ClusterNetwork.Devnet,
    },
    { name: 'local', endpoint: 'http://localhost:8899' },
    {
      name: 'testnet',
      endpoint: clusterApiUrl('testnet'),
      network: ClusterNetwork.Testnet,
    },
  ];
  
  const clusterAtom = atomWithStorage<Cluster>(
    'solana-cluster',
    defaultClusters[0]
  );
  const clustersAtom = atomWithStorage<Cluster[]>(
    'solana-clusters',
    defaultClusters
  );
  
  const activeClustersAtom = atom<Cluster[]>((get) => {
    const clusters = get(clustersAtom);
    const cluster = get(clusterAtom);
    return clusters.map((item) => ({
      ...item,
      active: item.name === cluster.name,
    }));
  });
  
  const activeClusterAtom = atom<Cluster>((get) => {
    const clusters = get(activeClustersAtom);
  
    return clusters.find((item) => item.active) || clusters[0];
  });
  
  export interface ClusterProviderContext {
    cluster: Cluster;
    clusters: Cluster[];
    addCluster: (cluster: Cluster) => void;
    deleteCluster: (cluster: Cluster) => void;
    setCluster: (cluster: Cluster) => void;
    getExplorerUrl(path: string): string;
  }
  
  const Context = createContext<ClusterProviderContext>(
    {} as ClusterProviderContext
  );

  export const TestClusterComponent = () => {
    const { connection } = useConnection();
    const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>([]);
    const [walletBalance, setWalletBalance] = useState<number | null>(null); // State for wallet balance
    
    // console.log('context',Context)
    console.log('testing123')
    console.log('defaultClusters', defaultClusters)
    

    // useEffect(() => {
    //   const fetchTokenAccounts = async () => {
    //     const tokenAccountsResponse = await connection.getParsedTokenAccountsByOwner(address, {
    //       programId: TOKEN_PROGRAM_ID,
    //     });
    //     setTokenAccounts(tokenAccountsResponse.value); // Set the fetched token accounts directly
    //   };
    //   fetchTokenAccounts();
  
    //   const fetchWalletBalance = async () => {
    //       const balance = await connection.getBalance(address); // Await the balance
    //       setWalletBalance(balance); // Set the balance state
    //       console.log("Wallet Balance:", balance); // Log the balance
    //     };
    //     fetchWalletBalance()
    // }, [connection]);
  
    return (
      <div>
        <h2>Token Accounts</h2>

      </div>
    );
  };
  














//////////////////////////////////////////////////////////////////////////////////
/////////////// Testing different solana apis /////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////

// phantom wallet address AfqgStkQV7wkBdiLbPL5T6w2GJjFqGzGWWXCmMeNApTt

// const { publicKey } = useWallet();
// console.log("publicKey", publicKey?.toString())

const address = new PublicKey('AfqgStkQV7wkBdiLbPL5T6w2GJjFqGzGWWXCmMeNApTt');

// Define an interface for the token account
interface TokenAccount {
  pubkey: PublicKey;
  account: AccountInfo<ParsedAccountData>;
}

export const TestComponent = () => {
  const { connection } = useConnection();
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>([]);
  const [walletBalance, setWalletBalance] = useState<number | null>(null); // State for wallet balance
  
  useEffect(() => {
    const fetchTokenAccounts = async () => {
      const tokenAccountsResponse = await connection.getParsedTokenAccountsByOwner(address, {
        programId: TOKEN_PROGRAM_ID,
      });
      setTokenAccounts(tokenAccountsResponse.value); // Set the fetched token accounts directly
    };
    fetchTokenAccounts();

    const fetchWalletBalance = async () => {
        const balance = await connection.getBalance(address); // Await the balance
        setWalletBalance(balance); // Set the balance state
        console.log("Wallet Balance:", balance); // Log the balance
      };
      fetchWalletBalance()
  }, [connection]);

  return (
    <div>
      <h2>Token Accounts</h2>
      <ul>
        {tokenAccounts.map((account) => (
          <li key={account.pubkey.toString()}>{account.pubkey.toString()}</li>
        ))}
      </ul>

      {walletBalance !== null && <p>Wallet Balance: {walletBalance} lamports</p>} {/* Display the balance */}

    </div>
  );
};









  
  
  
  
  
  
  
  

  
  //////////////////////////////////////////////////////////////////////////////////
  /////////////// Demonstration of useQuery /////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////
  
  // Define the Country type based on the expected structure from the API
  interface Country {
      name: {
        common: string; // Common name of the country
      };
    }
    export const CountryUseQueryApp = () => {
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
    // console.log(data)
  
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
    //   console.log(data); // Log the data to the console
      return data; // Return the parsed data
    }
  
  
  
  

  //////////////////////////////////////////////////////////////////////////////////
  /////////////// Demonstration of jotai  - this is serving the same purpose as react context but more simple 
  //////////////////////////////////////////////////////////////////////////////////


    import { atom, useAtomValue, useSetAtom, useAtom } from 'jotai';
    import { atomWithStorage } from 'jotai/utils';
    
    // 1. Creating a simple atom with a number
    const countAtom = atom(0);

    // 2. Creating an atom that doubles the count
    const doubledCountAtom = atom((get) => get(countAtom) * 2);

    // 3. Creating an atom that persists its value in local storage
    const darkModeAtom = atomWithStorage('darkMode', false);

    // 4. Creating a component that uses the count atom
    const Counter = () => {
      //// use this two lines or use the below one line
      // const count = useAtomValue(countAtom); // Read the current count
      // const setCount = useSetAtom(countAtom); // Get the setter function
      const [count, setCount] = useAtom(countAtom);

      return (
        <div>
          <h2>Counter</h2>
          <p>Count: {count}</p>
          <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
          <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
        </div>
      );
    };

    // 5. Creating a component that uses the doubled count atom
    const DoubledCounter = () => {
      const doubledCount = useAtomValue(doubledCountAtom);

      return (
        <div>
          <h2>Doubled Counter</h2>
          <p>Doubled Count: {doubledCount}</p>
        </div>
      );
    };

    // 6. Creating a component that uses the dark mode atom
    const DarkModeToggle = () => {
      const [darkMode, setDarkMode] = useAtom(darkModeAtom);

      return (
        <div>
          <h2>Dark Mode</h2>
          <p>Current mode: {darkMode ? 'Dark' : 'Light'}</p>
          <button onClick={() => setDarkMode((prev) => !prev)}>Toggle Dark Mode</button>
        </div>
      );
    };

    // 7. Creating the main app component
    export const JotaiApp = () => {
      return (
        <div>
          <h1>Jotai Example</h1>
          <Counter />
          <DoubledCounter />
          <DarkModeToggle />
        </div>
      );
    };



  

  
  //////////////////////////////////////////////////////////////////////////////////
  /////////////// Demonstration of createContext and useContext  - this is serving the same purpose as jotai but more complex 
  //////////////////////////////////////////////////////////////////////////////////

    // Define the shape of the context value
    interface CounterContextType {
      count: number;
      increment: () => void;
      decrement: () => void;
    }
    
    // Create the context with a default value - which is undefined
    const CounterContext = createContext<CounterContextType | undefined>(undefined);
    
    // Create a provider component - The CounterProvider component manages the state of the counter.
    const CounterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [count, setCount] = useState<number>(0);
    
      const increment = () => setCount((prev) => prev + 1);
      const decrement = () => setCount((prev) => prev - 1);
    
      // The CounterContext.Provider wraps its children and provides the context value (which includes count, increment, and decrement) to any descendant components that consume this context.
      return (
        <CounterContext.Provider value={{ count, increment, decrement }}>
          {children}
        </CounterContext.Provider>
      );
    };
    
    // Create a custom hook to use the CounterContext - hook simplifies the process of accessing the context.
    const useCounter = () => {
      // to get the current context value.
      const context = useContext(CounterContext);
      if (context === undefined) {
        throw new Error('useCounter must be used within a CounterProvider');
      }
      return context;
    };
    
    // Create a component that uses the CounterContext
    export const CounterComponent: React.FC = () => {
      const { count, increment, decrement } = useCounter();
      return (
        <div>
          <h1>Counter: {count}</h1>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
      );
    };
    
    // Main App component
    export const ContextApp: React.FC = () => {
      return (
        <CounterProvider>
          <CounterComponent />
        </CounterProvider>
      );
    };
    

  
  



