import AddTodoForm from "@/components/AddTodoForm";
import TodosComponent from "@/components/TodosComponent";
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
            <TodosComponent todos={todos} />
        </main>
    );
};

export default Todos;
