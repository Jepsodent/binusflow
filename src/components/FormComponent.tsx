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

interface FormFieldProps {
  name: keyof TaskFormValues;
  form: UseFormReturn<TaskFormValues>;
  placeholder: string;
  label: string;
  description?: string;
}

const FormComponent = (props: FormFieldProps) => {
  const { name, form, placeholder, label, description } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description ? description : ""}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default FormComponent;
