import { ITask } from "@/types/Task";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface TaskCardProps {
  task: ITask;
}

const TaskCard = (props: TaskCardProps) => {
  const { task } = props;
  return (
    <Card className="cursor-grab bg-neutral-50 shadow-sm hover:shadow-md max-w-100">
      <CardHeader>
        <div className="flex flex-row">
          <div>
            <CardTitle>{task.title}</CardTitle>
            <CardDescription className="mt-2">
              {task.description}
            </CardDescription>
          </div>
          <div className="ml-auto flex gap-4">
            <Button>test</Button>
            <Button>test</Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default TaskCard;
