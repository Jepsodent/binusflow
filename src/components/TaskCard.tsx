import { ITask } from "@/types/Task";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface TaskCardProps {
  task: ITask;
  key?: string;
}

const TaskCard = (props: TaskCardProps) => {
  const { task, key } = props;
  return (
    <div key={key}>
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
              <Button>test</Button>
              <Button>test</Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TaskCard;
