import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  if (!password || password.length < 3)
    return NextResponse.json(
      {
        message: "Password must be at least 3 characters long",
      },
      {
        status: 400,
      }
    );

  // connect to the database
  try {
    await connectDB();
    // check if a user with this email already exists
    const userFound = await User.findOne({ email });
    // if a user with this email already exists, return an error
    if (userFound)
      return NextResponse.json(
        {
          message: "The email is already in use",
        },
        {
          status: 409,
        }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    return NextResponse.json({
      email: savedUser.email,
      name: savedUser.name,
      id: savedUser._id,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}
