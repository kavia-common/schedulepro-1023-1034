"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function LoginPage() {
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) router.replace("/");
  }, [user, router]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const ok = await login(form.email, form.password);
    if (!ok) setError("Login failed. Please check your credentials.");
  }

  if (user || loading) return <div />;

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded shadow-md flex flex-col gap-4 min-w-[350px]"
      >
        <h1 className="font-bold text-lg text-primary">Sign In</h1>
        {error && <div className="text-red-500">{error}</div>}
        <input
          required
          type="email"
          autoComplete="email"
          placeholder="Email"
          className="border rounded p-2 outline-accent"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
        />
        <input
          required
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          className="border rounded p-2 outline-accent"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        />
        <button className="bg-primary text-white font-semibold px-4 py-2 rounded hover:bg-accent">
          Login
        </button>
        <Link className="text-accent hover:underline text-center" href="/register">
          Or Register
        </Link>
      </form>
    </div>
  );
}
