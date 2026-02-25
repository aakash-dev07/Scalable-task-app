

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // Update/Edit 
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const router = useRouter();

  // --- 2. API Functions --


  const fetchTasks = async () => {
    const response = await fetch("/api/tasks");
    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  // To add a new task
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const response = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title: newTaskTitle }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setNewTaskTitle("");
      fetchTasks();
    }
  };

  // Delete a task here
  const handleDeleteTask = async (id: string) => {
    const response = await fetch(`/api/tasks/${id}`, { method: "DELETE" });
    if (response.ok) fetchTasks();
  };

  // Update a task
  const handleUpdateTitle = async (id: string) => {
    if (!editTitle.trim()) return;
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ title: editTitle }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setEditingId(null);
      fetchTasks();
    }
  };


  
  const handleToggleStatus = async (id: string, currentStatus: string) => {
     
    const newStatus = currentStatus === "Pending" ? "Completed" : "Pending";

    const response = await fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: newStatus }), 
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      fetchTasks();  
    }
  };

 
  const filteredTasks = tasks.filter((task: any) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 text-slate-900">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">

        {/* Header Area */}
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📋 <span className="tracking-tight">Task Manager</span>
          </h1>
          <button
            onClick={() => { document.cookie = "token=; path=/;"; router.push("/login"); }}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-bold backdrop-blur-md transition"
          >
            Logout
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">

          {/* Search & Input Group */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="🔍 Search tasks..."
              className="w-full p-4 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-400 outline-none text-slate-800"
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <form onSubmit={handleAddTask} className="flex gap-3">
              <input
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="flex-1 p-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 text-slate-800 shadow-sm"
                placeholder="What needs to be done?"
                required
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-10 rounded-2xl font-black shadow-lg shadow-blue-200 transition-all active:scale-95">
                Add Task
              </button>
            </form>
          </div>

          {/* Task List Section */}
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest px-2">Your Tasks</h2>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task: any) => (
                <div
                  key={task._id}
                  className="group flex items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={task.status === "Completed"}
                      onChange={() => handleToggleStatus(task._id, task.status)}  
                      className="w-6 h-6 rounded-full border-2 border-slate-300 checked:bg-blue-600 cursor-pointer transition-all"
                    />

                    {/* Conditional Rendering for Edit Mode */}
                    {editingId === task._id ? (
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 bg-blue-50 border-b-2 border-blue-500 outline-none px-2 text-lg text-black font-medium"
                        autoFocus
                      />
                    ) : (
                      <span className={`text-lg font-medium transition-all ${task.status === "Completed" ? "line-through text-slate-300" : "text-slate-700"}`}>
                        {task.title}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons (Edit & Delete) */}
                  <div className="flex items-center gap-2">
                    {editingId === task._id ? (
                      <button
                        onClick={() => handleUpdateTitle(task._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => { setEditingId(task._id); setEditTitle(task.title); }}
                        className="text-slate-300 hover:text-blue-500 p-2 transition-all"
                        title="Edit Task"
                      >
                        ✏️
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="text-slate-300 hover:text-red-500 p-2 transition-all"
                      title="Delete Task"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium italic">No tasks found. Relax or add a new one!</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}