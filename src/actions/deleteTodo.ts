"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteTodo = async (id: number) => {
    await prisma.todo.delete({
        where: {
            id: id,
        },
    });
    revalidatePath("/todos");
};
