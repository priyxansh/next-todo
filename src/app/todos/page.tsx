import TodosComponent from "@/components/TodosComponent";
import { authOptions } from "@/lib/next-auth";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

type TodosProps = {};

const Todos = async ({}: TodosProps) => {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/auth/signin");

    const todos: Todo[] = await prisma.todo.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: [
            {
                completed: "asc",
            },
            {
                createdAt: "desc",
            },
        ],
        select: {
            id: true,
            text: true,
            completed: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    return (
        <main className="w-full px-4">
            <TodosComponent todos={todos} />
        </main>
    );
};

export default Todos;
