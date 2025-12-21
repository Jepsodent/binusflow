import useTaskStore from "@/store/TaskStore";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const ModalDelete = () => {
  const deleteAllTask = useTaskStore((state) => state.deleteAllTask);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete All Task</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete all task?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant={"destructive"} onClick={() => deleteAllTask()}>
            Delete All
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="bg-blue-500 hover:bg-blue-400">Cancel</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default ModalDelete;
