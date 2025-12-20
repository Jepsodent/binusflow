"use client";

import Column from "@/components/Column";

import { Input } from "@/components/ui/input";
import { COLUMNS } from "@/constants/Task.constants";
import useTaskStore from "@/store/TaskStore";
import { ITask } from "@/types/Task";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import TaskDialog from "@/components/TaskDialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  const initTask = useTaskStore((state) => state.initTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [search, setSearch] = useState("");
  const [debounceSearch, setDebounceSearch] = useState<string>("");

  // initial
  useEffect(() => {
    initTask();
  }, []);

  // filter
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filterTask = useMemo(() => {
    const dSearch = debounceSearch.toLowerCase();
    if (!dSearch) return tasks;
    console.log(dSearch);
    return tasks.filter((task) => {
      console.log(task.title);
      return (
        task.title.toLowerCase().includes(dSearch) ||
        task.description.toLowerCase().includes(dSearch)
      );
    });
  }, [tasks, debounceSearch]);

  // drag event
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
        <Input
          placeholder="Search"
          className="max-w-150"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <TaskDialog type="ADD">
          <Button className="bg-blue-400 hover:bg-blue-500">Add Task</Button>
        </TaskDialog>
      </div>
      <div className="flex gap-8 mt-4">
        <DndContext onDragEnd={handleDragEvent}>
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              column={col}
              tasks={filterTask.filter((t) => t.status == col.id)}
            />
          ))}
        </DndContext>
      </div>
    </div>
  );
}
