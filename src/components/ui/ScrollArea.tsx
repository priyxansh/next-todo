"use client";

import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import Todo from "../Todo";

type ScrollAreaProps = {
    todos: Todo[];
};

const ScrollArea = ({ todos }: ScrollAreaProps) => {
    
    return (
        <RadixScrollArea.Root className="h-[300px] w-full m-auto rounded overflow-hidden">
            <RadixScrollArea.Viewport className="w-full h-full rounded">
                <div className="flex flex-col gap-3">
                    {todos.map((todo) => (
                        <Todo key={todo.id} {...todo} />
                    ))}
                </div>
            </RadixScrollArea.Viewport>
            <RadixScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 bg-gray-900 transition-colors duration-[160ms] ease-out hover:bg-black data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="vertical"
            >
                <RadixScrollArea.Thumb className="flex-1 bg-slate-700 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </RadixScrollArea.Scrollbar>
            <RadixScrollArea.Scrollbar
                className="flex select-none touch-none p-0.5 bg-gray-900 transition-colors duration-[160ms] ease-out hover:bg-gray-900 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                orientation="horizontal"
            >
                <RadixScrollArea.Thumb className="flex-1 bg-slate-700 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
            </RadixScrollArea.Scrollbar>
            <RadixScrollArea.Corner className="bg-slate-700" />
        </RadixScrollArea.Root>
    );
};

export default ScrollArea;
