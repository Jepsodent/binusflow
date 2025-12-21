import useColorStore from "@/store/ColorStore";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const ColorModalDelete = () => {
  const removeAll = useColorStore((state) => state.removeAll);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete All Colors</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete all colors?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-4">
        <DialogClose asChild>
          <Button variant={"destructive"} onClick={() => removeAll()}>
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

export default ColorModalDelete;
