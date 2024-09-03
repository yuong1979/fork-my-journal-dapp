
// app/api/test/route.ts
import { NextResponse } from 'next/server';
import { MongoClient, ServerApiVersion } from 'mongodb';

// Use the connection string from the environment variable
const uri = process.env.MONGODB_URI || ""; // Fallback to an empty string if not set
// const uri = "mongodb+srv://username:password@cluster0.pnf9r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function GET() {
  try {
    // Connect the client to the server
    await client.connect();
    
    // Access the database (replace 'sample_mflix' with your actual database name)
    const db = client.db('todo-app'); 

    // Perform a simple operation, such as fetching a collection
    const collections = await db.collections();
    const collectionNames = collections.map((collection) => collection.collectionName);

    return NextResponse.json({ success: true, collections: collectionNames });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    return NextResponse.json({ success: false, error: 'Failed to connect to MongoDB' }, { status: 500 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


//access this page with -  http://localhost:3000/api/test


// todo-app.todos

