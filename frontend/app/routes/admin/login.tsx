import type {
  ClientActionFunctionArgs,
  ClientLoaderFunctionArgs,
} from "react-router";
import { Form, redirect, useActionData } from "react-router";
import { supabase } from "~/lib/supabase";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) return redirect("/admin");
  return null;
}

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return { error: error.message };
  return redirect("/admin");
}

export default function Login() {
  const actionData = useActionData<typeof clientAction>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Admin Access
        </h2>

        {actionData?.error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-6">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="flex flex-col gap-5">
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">
              Email Address
            </span>
            <input
              type="email"
              name="email"
              required
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-gray-700">Password</span>
            <input
              type="password"
              name="password"
              required
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
            />
          </label>
          <button
            type="submit"
            className="w-full bg-black text-white font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors mt-2"
          >
            Sign In
          </button>
        </Form>
      </div>
    </div>
  );
}
