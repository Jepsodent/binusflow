"use client";

import Column from "@/components/Column";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { COLUMNS } from "@/constants/Task.constants";
import useTaskStore from "@/store/TaskStore";
import { ITask } from "@/types/Task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect } from "react";

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  const initTask = useTaskStore((state) => state.initTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  useEffect(() => {
    initTask();
  }, []);

  const handleDragEvent = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
    const taskId = active.id;
    const columnId = over.id as ITask["status"];
    const currentTask = tasks.find((t) => t.id === taskId);
    if (!currentTask) return;
    updateTask(
      currentTask.id,
      currentTask.title,
      currentTask.description,
      columnId
    );
  };

  return (
    <div className="flex mt-4 flex-col gap-4 h-full ">
      <div className="w-full flex justify-end gap-10 mr-12">
        <Input placeholder="Search" className="max-w-150" />
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-400 hover:bg-blue-500">Add Task</Button>
          </DialogTrigger>
          <Modal />
        </Dialog>
      </div>
      <div className="flex gap-8 mt-4">
        <DndContext onDragEnd={handleDragEvent}>
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={tasks.filter((t) => t.status == col.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
