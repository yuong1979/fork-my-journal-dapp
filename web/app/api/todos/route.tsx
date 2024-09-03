

// app/api/todos/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase, closeDatabaseConnection } from '../../../lib/mongodb';

export async function GET() {
  try {
    const db = await connectToDatabase();
    const todosCollection = db.collection('todos');
    const todos = await todosCollection.find({}).toArray();
    return NextResponse.json({ success: true, todos });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ success: false, error: 'Error fetching todos' }, { status: 500 });
  } finally {
    await closeDatabaseConnection();
  }
}

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