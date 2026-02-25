import { connectDB } from "@/lib/mongodb";
import Task from "@/models/Task";
import { verifyToken } from "@/lib/auth";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// --- DELETE FUNCTION ---
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    
    // Auth Check
    const token = (await cookies()).get("token")?.value;
    if (!verifyToken(token || "")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

     
    const { id } = await params; 

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// --- UPDATE (PATCH) FUNCTION ---
 

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const { title, status } = await req.json();  

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, status },  
      { new: true }  
    );

    if (!updatedTask) return NextResponse.json({ message: "Task not found" }, { status: 404 });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}