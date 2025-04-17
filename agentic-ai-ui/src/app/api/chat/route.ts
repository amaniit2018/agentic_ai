import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const question = body.message;

  try {
    // Send the question to FastAPI backend
    const response = await axios.post('http://localhost:8000/query', {
      question: question,
    });

    // The backend should return an object with the 'answer' key.
    const answer = response.data.answer;

    // Return the answer as a JSON response to the frontend
    return NextResponse.json({ reply: answer });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ reply: 'Error connecting to backend' }, { status: 500 });
  }
}
