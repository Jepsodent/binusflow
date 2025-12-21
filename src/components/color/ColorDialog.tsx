import { useState } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import ColorModal from "./ColorModal";
import ColorModalDelete from "./ColorModalDelete";
import { IColor } from "@/types/Color";

interface DialogProps {
  type: "ADD" | "UPDATE" | "DELETE";
  color?: IColor;
  children: React.ReactNode;
}

const ColorDialog = (props: DialogProps) => {
  const { color, type, children } = props;
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {type === "ADD" || type === "UPDATE" ? (
        <ColorModal onClose={() => setOpen(false)} type={type} color={color} />
      ) : (
        <ColorModalDelete />
      )}
    </Dialog>
  );
};

export default ColorDialog;
