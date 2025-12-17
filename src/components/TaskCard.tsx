import { ITask } from "@/types/Task";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useDraggable } from "@dnd-kit/core";
import { Ellipsis } from "lucide-react";

interface TaskCardProps {
  task: ITask;
  key?: string;
}

const TaskCard = (props: TaskCardProps) => {
  const { task } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div style={style} {...attributes} {...listeners} ref={setNodeRef}>
      <Card className="cursor-grab bg-neutral-50 shadow-sm hover:shadow-md">
        <CardHeader>
          <div className="flex flex-row gap-8">
            <div>
              <CardTitle>{task.title}</CardTitle>
              <CardDescription className="mt-2">
                {task.description}
              </CardDescription>
            </div>
            <div className="ml-auto flex gap-4">
              <Ellipsis />
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TaskCard;
