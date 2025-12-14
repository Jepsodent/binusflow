import Column from "@/components/Column";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { COLUMNS, INITIAL_TASKS } from "@/constants/Task.constants";
import { IColumn, ITask } from "@/types/Task";

export default function Home() {
  return (
    <div className="flex mt-4 flex-col gap-4 h-full ">
      <div className="w-full flex justify-end gap-10 mr-12">
        <Input placeholder="Search" className="max-w-150" />
        <Button className="bg-blue-400 hover:bg-blue-500">Add Task</Button>
      </div>
      <div className="flex  gap-8 mt-4">
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={INITIAL_TASKS.filter((task) => task.status == col.id)}
          />
        ))}
      </div>
    </div>
  );
}
