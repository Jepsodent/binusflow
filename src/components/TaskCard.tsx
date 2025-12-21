import { ITask } from "@/types/Task";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useDraggable } from "@dnd-kit/core";
import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import useTaskStore from "@/store/TaskStore";
import TaskDialog from "./TaskDialog";

interface TaskCardProps {
  task: ITask;
  key?: string;
}

const TaskCard = (props: TaskCardProps) => {
  const { task } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div style={style} {...attributes} ref={setNodeRef}>
      <Card
        style={task.color ? { border: `2px solid ${task.color}` } : undefined}
        className={`bg-neutral-50  shadow-sm hover:shadow-md`}
      >
        <CardHeader>
          <div className="flex flex-row">
            <div {...listeners} className="cursor-grab w-full ">
              <CardTitle>{task.title}</CardTitle>
              <CardDescription className="mt-2 ">
                {task.description}
                {task.color.length > 0 && (
                  <div className="flex mt-1.5 gap-2 items-center">
                    <div
                      className="rounded-2xl w-4 h-4"
                      style={{ backgroundColor: task.color }}
                    />
                    <div>{task.color}</div>
                  </div>
                )}
              </CardDescription>
            </div>
            {/* DROPDOWN */}
            <div className="ml-auto">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40 p-4">
                  <TaskDialog type="UPDATE" task={task}>
                    <DropdownMenuItem
                      className="hover:bg-gray-50 text-accent-foreground cursor-pointer font-semibold"
                      onSelect={(e) => e.preventDefault()}
                    >
                      Update
                    </DropdownMenuItem>
                  </TaskDialog>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 font-semibold hover:bg-gray-50"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TaskCard;
