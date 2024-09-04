'use client';

import { clusterApiUrl, Connection } from '@solana/web3.js';
import { atom, useAtomValue, useSetAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { createContext, ReactNode, useContext } from 'react';
import toast from 'react-hot-toast';

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
// Stores the currently active cluster, initialized with the first cluster from defaultClusters
const clusterAtom = atomWithStorage<Cluster>(
  'solana-cluster',
  defaultClusters[0]
);
// Stores the list of available clusters, initialized with defaultClusters.
const clustersAtom = atomWithStorage<Cluster[]>(
  'solana-clusters',
  defaultClusters
);
// This derived atom maps over the clustersAtom and sets the active property for each cluster based on the currently active cluster.
const activeClustersAtom = atom<Cluster[]>((get) => {
  const clusters = get(clustersAtom);
  const cluster = get(clusterAtom);
  return clusters.map((item) => ({
    ...item,
    active: item.name === cluster.name,
  }));
});
// This derived atom returns the currently active cluster from activeClustersAtom.
const activeClusterAtom = atom<Cluster>((get) => {
  const clusters = get(activeClustersAtom);

  return clusters.find((item) => item.active) || clusters[0];
});
// ClusterProviderContext: This interface defines the context that will be provided to the application, including the current cluster, list of clusters, and functions to add, delete, and set clusters.
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

//  This interface defines the context that will be provided to the application, including the current cluster, list of clusters, and functions to add, delete, and set clusters.
export function ClusterProvider({ children }: { children: ReactNode }) {
  const cluster = useAtomValue(activeClusterAtom);
  const clusters = useAtomValue(activeClustersAtom);
  const setCluster = useSetAtom(clusterAtom);
  const setClusters = useSetAtom(clustersAtom);

  const value: ClusterProviderContext = {
    //Retrieves the current cluster and list of clusters from the atoms.
    cluster,
    clusters: clusters.sort((a, b) => (a.name > b.name ? 1 : -1)),
    // Provides functions to add, delete, and set clusters.
    addCluster: (cluster: Cluster) => {
      try {
        new Connection(cluster.endpoint);
        setClusters([...clusters, cluster]);
      } catch (err) {
        toast.error(`${err}`);
      }
    },
    deleteCluster: (cluster: Cluster) => {
      setClusters(clusters.filter((item) => item.name !== cluster.name));
    },
    setCluster: (cluster: Cluster) => setCluster(cluster),
    //Generates Solana Explorer URLs based on the current cluster.
    getExplorerUrl: (path: string) =>
      `https://explorer.solana.com/${path}${getClusterUrlParam(cluster)}`,
  };
  // Renders the Context.Provider with the created context value and the children components.
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// This custom hook allows components to access the Solana cluster context using useContext.
export function useCluster() {
  return useContext(Context);
}

// This helper function generates the appropriate URL parameter for the Solana Explorer based on the current cluster's network.
function getClusterUrlParam(cluster: Cluster): string {
  let suffix = '';
  switch (cluster.network) {
    case ClusterNetwork.Devnet:
      suffix = 'devnet';
      break;
    case ClusterNetwork.Mainnet:
      suffix = '';
      break;
    case ClusterNetwork.Testnet:
      suffix = 'testnet';
      break;
    default:
      suffix = `custom&customUrl=${encodeURIComponent(cluster.endpoint)}`;
      break;
  }

  return suffix.length ? `?cluster=${suffix}` : '';
}
