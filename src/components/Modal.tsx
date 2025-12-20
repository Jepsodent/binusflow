import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { TaskFormValues, TaskSchema } from "@/schemas/TaskSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormComponent from "./FormComponent";
import { Form } from "./ui/form";
import useTaskStore from "@/store/TaskStore";
import { ITask } from "@/types/Task";

interface ModalProps {
  onClose: () => void;
  type: "ADD" | "UPDATE";
  task?: ITask;
}

const Modal = (props: ModalProps) => {
  const { onClose, type, task } = props;
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "TODO",
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    if (type === "ADD") {
      addTask(values.title, values.description, values.status);
    }

    if (type === "UPDATE" && task) {
      updateTask(task.id, values.title, values.description, values.status);
    }
    form.reset();
    onClose();
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {type === "UPDATE" ? "Update Task" : "Add Task"}
            </DialogTitle>
            <DialogDescription>
              {type === "ADD"
                ? "Fill in the details below to create a new task."
                : "Update your task details below"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 mt-4">
            <FormComponent
              form={form}
              label="Title"
              name="title"
              placeholder="Input your task title"
            />
            <FormComponent
              form={form}
              label="Description"
              name="description"
              placeholder="Input your task description"
            />
            <FormComponent
              form={form}
              label="Status"
              name="status"
              placeholder="Select your task status"
              type="select"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default Modal;
