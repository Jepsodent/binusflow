import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TaskFormValues } from "@/schemas/TaskSchema";
import useColorStore from "@/store/ColorStore";
import { TaskStatus } from "@/types/Task";
import { ControllerRenderProps } from "react-hook-form";

interface renderInputProps {
  field: ControllerRenderProps<TaskFormValues, keyof TaskFormValues>;
  placeholder: string;
  type: "status" | "input" | "color";
}
const TASK_STATUS: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

const RenderInput = ({ field, placeholder, type }: renderInputProps) => {
  const colors = useColorStore((state) => state.colors);

  switch (type) {
    case "status":
      return (
        <Select onValueChange={field.onChange} value={field.value}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {TASK_STATUS.map((status) => (
              <SelectItem key={status} value={status}>
                {status.replace("_", " ")}{" "}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "color":
      return (
        <div className="flex flex-wrap gap-2 mt-2 ">
          {colors.map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() => field.onChange(color.hex)}
              className={cn(
                "w-8 h-8 rounded-sm border-2 transition-all",
                field.value === color.hex
                  ? "border-black scale-110 shadow-md"
                  : "border-transparent hover:scale-105"
              )}
              style={{ backgroundColor: color.hex }}
              title={color.label}
            />
          ))}
          {colors.length === 0 && (
            <p className="text-xs text-muted-foreground italic">
              No colors available.Add some in configuration.
            </p>
          )}
        </div>
      );
    case "input":
      return <Input placeholder={placeholder} {...field} />;
  }
};

export default RenderInput;
