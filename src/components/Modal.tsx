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

interface ModalProps {
  onClose: () => void;
}

const Modal = (props: ModalProps) => {
  const { onClose } = props;
  const addTask = useTaskStore((state) => state.addTask);

  const form = useForm<TaskFormValues>({
    resolver: zodResolver(TaskSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "TODO",
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    console.log(values);
    addTask(values.title, values.description, values.status);
    onClose();
  };

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Tasks</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new task.
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
