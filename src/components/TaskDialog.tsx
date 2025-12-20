import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import Modal from "./Modal";
import { ITask } from "@/types/Task";
import ModalDelete from "./ModalDelete";

interface DialogProps {
  type: "ADD" | "UPDATE" | "DELETE";
  task?: ITask;
  children: React.ReactNode;
}

const TaskDialog = (props: DialogProps) => {
  const { task, type, children } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {type === "ADD" || type === "UPDATE" ? (
        <Modal onClose={() => setOpen(false)} type={type} task={task} />
      ) : (
        <ModalDelete />
      )}
    </Dialog>
  );
};

export default TaskDialog;
