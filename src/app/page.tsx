import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/auth/signin");

    return (
        <main className="">
            <Link
                className="text-xl font-medium rounded-md border-2 border-sky-300 px-4 py-2 hover:bg-sky-300 hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
                href="/todos"
            >
                Todos
            </Link>
        </main>
    );
}
