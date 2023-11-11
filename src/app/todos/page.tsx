import AddTodoForm from "@/components/AddTodoForm";
import ScrollArea from "@/components/ui/ScrollArea";
import prisma from "@/lib/prisma";

type TodosProps = {};

const Todos = async ({}: TodosProps) => {
    const todos: Todo[] = await prisma.todo.findMany({
        orderBy: [
            {
                completed: "asc",
            },
            {
                createdAt: "desc",
            },
        ],
    });

    return (
        <main className="w-full px-4">
            <section className="flex flex-col gap-6 w-11/12 max-w-[500px] m-auto">
                <h2 className="text-3xl text-center font-semibold">Todos</h2>
                <AddTodoForm />
                <ScrollArea todos={todos} />
            </section>
        </main>
    );
};

export default Todos;
