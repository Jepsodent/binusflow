import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Modal from "./Modal";
import { ITask } from "@/types/Task";

interface DialogProps {
  type: "ADD" | "UPDATE";
  task?: ITask;
  children: React.ReactNode;
}

const TaskDialog = (props: DialogProps) => {
  const { task, type, children } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <Modal onClose={() => setOpen(false)} type={type} task={task} />
    </Dialog>
  );
};

export default TaskDialog;
