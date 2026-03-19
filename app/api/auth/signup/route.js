import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { name, email, password, age, gender,mobile} = body;

    if (!name || !email || !password) {
      return Response.json({ message: "All fields required" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // Create user
    const user = await User.create({ name, email, password });

    return Response.json(
      { message: "Signup successful", user },
      { status: 201 }
    );

  } catch (error) {
    console.error("ERROR:", error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}