import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { TaskFormValues } from "@/schemas/TaskSchema";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TaskStatus } from "@/types/Task";

interface FormFieldProps {
  name: keyof TaskFormValues;
  form: UseFormReturn<TaskFormValues>;
  placeholder: string;
  label: string;
  description?: string;
  type?: "select" | "input";
}
const TASK_STATUS: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

const FormComponent = (props: FormFieldProps) => {
  const { name, form, placeholder, label, description, type = "input" } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <FormControl>
            {type === "input" ? (
              <Input placeholder={placeholder} {...field} />
            ) : (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder={placeholder}></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TASK_STATUS.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.replace("_", " ")}{" "}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </FormControl>
          <FormDescription>{description ? description : ""}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default FormComponent;
