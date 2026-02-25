"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/dashboard");  
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-xl shadow-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Welcome Back</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500">
          Don't have an account? <Link href="/signup" className="text-blue-500 font-medium">Create one</Link>
        </p>
      </div>
    </div>
  );
}