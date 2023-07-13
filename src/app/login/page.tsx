"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
      return;
    }

    if (res?.ok) {
      router.push("/dashboard/profile");
      return;
    }

    console.log(res);
  };

  return (
    <div className="justify-center h-[calc(100vh-4rem)] flex items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-950 px-8 py-10 w-3/12">
        {error && <div className="bg-red-500 text-white p-2 mb-2">{error}</div>}

        <h1 className="text-4xl text-center font-bold mb-7">SignIn</h1>

        <input
          type="email"
          placeholder="someemail@gmail.com"
          name="email"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        <input
          type="password"
          placeholder="*******"
          name="password"
          className="bg-zinc-800 px-4 py-2 block mb-2 w-full"
        />

        <button className="bg-indigo-500 px-4 py-2">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
