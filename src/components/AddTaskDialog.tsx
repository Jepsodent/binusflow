import { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import Modal from "./Modal";

const AddTaskDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-400 hover:bg-blue-500">Add Task</Button>
      </DialogTrigger>
      <Modal onClose={() => setOpen(false)} />
    </Dialog>
  );
};

export default AddTaskDialog;
