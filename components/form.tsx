"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import LoadingDots from "@/components/loading-dots";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Form({ type }: { type: "login" | "register" }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('google');
      if (result && result.ok) {
        
      } else {
        //toast.error(result?.error ?? 'An error occurred while signing in.');
      }
    } catch (error) {
      //toast.error('An error occurred while signing in.');
    }

    setLoading(false);
  };

  return (
    <form
    onSubmit={handleSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <button
        disabled={loading}
        className={`${
          loading
            ? "cursor-not-allowed border-gray-200 bg-gray-100"
            : "border-black bg-black text-white hover:bg-white hover:text-black"
        } flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none`}
      >
        {loading ? (
          <LoadingDots color="#808080" />
        ) : (
          <p>{type === "login" ? "Sign In with Google" : "Sign Up"}</p>
        )}
      </button>
      {type === "login" ? (
        <p className="text-center text-sm text-gray-600">
          {/* Don&apos;t have an account?{" "} */}
          {/* <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>{" "} */}
          {/* for free. */}
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600">
          {/* Already have an account?{" "}
          <Link href="/login" className="font-semibold text-gray-800">
            Sign in
          </Link>{" "}
          instead. */}
        </p>
      )}
    </form>
  );
}
