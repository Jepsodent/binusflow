import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ColorFormValue, ColorSchema } from "@/schemas/ColorSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ColorForm from "./ColorForm";
import { Form } from "../ui/form";
import { IColor } from "@/types/Color";
import useColorStore from "@/store/ColorStore";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  type: "ADD" | "UPDATE";
  color?: IColor;
}

const ColorModal = (props: ModalProps) => {
  const { onClose, type, color } = props;
  const addColor = useColorStore((state) => state.addColor);
  const updateColor = useColorStore((state) => state.updateColor);

  const form = useForm<ColorFormValue>({
    resolver: zodResolver(ColorSchema),
    defaultValues: {
      label: color?.label ?? "",
      hex: color?.hex ?? "#000000",
    },
  });
  useEffect(() => {
    form.reset({
      label: color?.label ?? "",
      hex: color?.hex ?? "#000000",
    });
  }, [color, form]);

  const onSubmit = (values: ColorFormValue) => {
    if (type === "ADD") {
      addColor(values.label, values.hex);
    }

    if (type === "UPDATE" && color) {
      updateColor(color.id, values.label, values.hex);
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
              {type === "UPDATE" ? "Update Color" : "Add Color"}
            </DialogTitle>
            <DialogDescription>
              {type === "ADD"
                ? "Fill in the details below to create a new color."
                : "Update your color details below"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-5 mt-4">
            <ColorForm
              form={form}
              label="Label"
              name="label"
              placeholder="Input your label for your color"
            />
            <ColorForm
              type="color"
              form={form}
              label="Pick Color"
              name="hex"
              placeholder="Input your hex color"
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

export default ColorModal;
