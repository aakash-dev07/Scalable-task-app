import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  await connectDB();
  const token = (await cookies()).get("token")?.value;
  const decoded: any = verifyToken(token || "");

  if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const tasks = await Task.find({ user: decoded.userId }).sort({ createdAt: -1 });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  await connectDB();
  const token = (await cookies()).get("token")?.value;
  const decoded: any = verifyToken(token || "");

  if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { title, description } = await req.json();
  const newTask = await Task.create({
    title,
    description,
    user: decoded.userId,
  });

  return NextResponse.json(newTask, { status: 201 });
}

// 1. DELETE functionality
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const token = (await cookies()).get("token")?.value;
    if (!verifyToken(token || "")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;  
    await Task.findByIdAndDelete(id);

    return NextResponse.json({ message: "Task Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}

// 2. UPDATE (Status toggle) functionality
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const token = (await cookies()).get("token")?.value;
    if (!verifyToken(token || "")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const task = await Task.findById(id);
    
    if (!task) return NextResponse.json({ message: "Task not found" }, { status: 404 });

   
    task.status = task.status === "Pending" ? "Completed" : "Pending";
    await task.save();

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}