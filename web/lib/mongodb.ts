import { MongoClient, ServerApiVersion } from 'mongodb';
import { NextResponse } from 'next/server';

// Use the connection string from the environment variable
const uri = process.env.MONGODB_URI || ""; // Fallback to an empty string if not set

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Function to connect to the database
export async function connectToDatabase() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Access the database
    const db = client.db('todo-app'); // Replace with your actual database name
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

// Close the MongoDB client connection
export async function closeDatabaseConnection() {
  await client.close();
}



