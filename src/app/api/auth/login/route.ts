import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    await connectDB();

   
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "Invalid Email or Password" }, { status: 401 });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid Email or Password" }, { status: 401 });
}

  
    const token = signToken({ userId: user._id, email: user.email });

    
    const response = NextResponse.json({ message: "Login successful", user: { name: user.name, email: user.email } }, { status: 200 });
    
    response.cookies.set("token", token, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, 
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}