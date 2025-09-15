import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md px-4 py-12">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Log in</h1>
      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Password</label>
          <input
            type="password"
            required
            className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-rose-500"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-rose-500 px-4 py-2 text-white hover:bg-rose-600"
        >
          Continue
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-rose-600 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </main>
  );
}
