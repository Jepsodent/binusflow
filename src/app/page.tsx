"use client";

import Column from "@/components/Column";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COLUMNS, INITIAL_TASKS } from "@/constants/Task.constants";
import { ITask } from "@/types/Task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState<ITask[]>(INITIAL_TASKS);
  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    const taskId = active.id;
    const columnId = over.id as ITask["status"];

    setTask(() =>
      task.map((t) => (t.id === taskId ? { ...t, status: columnId } : t))
    );
  };

  return (
    <div className="flex mt-4 flex-col gap-4 h-full ">
      <div className="w-full flex justify-end gap-10 mr-12">
        <Input placeholder="Search" className="max-w-150" />
        <Button className="bg-blue-400 hover:bg-blue-500">Add Task</Button>
      </div>
      <div className="flex gap-8 mt-4">
        <DndContext onDragEnd={handleDragEvent}>
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={task.filter((t) => t.status == col.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
