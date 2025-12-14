import TaskCard from "@/components/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ITask } from "@/types/Task";

export default function Home() {
  const taskTest: ITask = {
    id: "T001",
    status: "TODO",
    title: "test",
    description: "Cobain aja deh",
  };
  return (
    <div className="flex mt-4 flex-col gap-4 h-full ">
      <div className="w-full flex justify-end gap-10 mr-12">
        <Input placeholder="Search" className="max-w-150" />
        <Button className="bg-blue-400 hover:bg-blue-500">Add Task</Button>
      </div>
      <TaskCard task={taskTest}></TaskCard>
    </div>
  );
}
