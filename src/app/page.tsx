import Link from "next/link";

export default function Home() {
    return (
        <main className="">
            <Link
                className="text-xl font-medium rounded-md border-2 border-sky-300 px-4 py-2 hover:bg-sky-300 hover:text-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-slate-900"
                href="/todos"
            >
                Todos
            </Link>
        </main>
    );
}
