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



// export async function GET() {
//     try {
//       const db = await connectToDatabase();
      
//       // Access the collection
//       const todosCollection = db.collection('todos'); // Replace with your actual collection name
//       const todos = await todosCollection.find({}).toArray(); // Fetch all todos
  
//       return NextResponse.json({ success: true, todos });
//     } catch (error) {
//       console.error('Error fetching todos:', error);
//       return NextResponse.json({ success: false, error: 'Error fetching todos' }, { status: 500 });
//     } finally {
//       await closeDatabaseConnection(); // Close the connection
//     }
//   }
  
  


  
  
//   // Example for POST request to create a new todo
//   export async function POST(request: Request) {
//     try {
//       const db = await connectToDatabase();
//       const todosCollection = db.collection('todos');
  
//       const todo = await request.json(); // Parse the incoming JSON
//       const result = await todosCollection.insertOne(todo); // Insert the new todo
  
//       return NextResponse.json({ success: true, todoId: result.insertedId });
//     } catch (error) {
//       console.error('Error creating todo:', error);
//       return NextResponse.json({ success: false, error: 'Error creating todo' }, { status: 500 });
//     } finally {
//       await closeDatabaseConnection(); // Close the connection
//     }
//   }


  export async function POST(request: Request) {
    try {
      const db = await connectToDatabase();
      const todosCollection = db.collection('todos');
      const todo = await request.json();
      const result = await todosCollection.insertOne(todo);
      return NextResponse.json({ success: true, todo: { ...todo, _id: result.insertedId } });
    } catch (error) {
      console.error('Error creating todo:', error);
      return NextResponse.json({ success: false, error: 'Error creating todo' }, { status: 500 });
    } finally {
      await closeDatabaseConnection();
    }
  }