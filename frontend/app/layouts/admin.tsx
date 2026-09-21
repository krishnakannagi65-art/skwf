import type { ClientLoaderFunctionArgs } from "react-router";
import { Link, Outlet, redirect, useLoaderData } from "react-router";
import { supabase } from "~/lib/supabase";

export async function clientLoader({ request }: ClientLoaderFunctionArgs) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return redirect("/admin/login");
  return { email: session.user.email };
}

export default function AdminLayout() {
  const { email } = useLoaderData<typeof clientLoader>();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <Link to="/admin" className="text-xl font-bold text-gray-900">
          Admin Dashboard
        </Link>
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-600 hidden sm:inline-block">
            Logged in as:{" "}
            <span className="font-medium text-gray-900">{email}</span>
          </span>
          <Link
            to="/admin/logout"
            className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors"
          >
            Logout
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
