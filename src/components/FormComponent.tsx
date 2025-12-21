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
import RenderInput from "@/components/RenderInput";

interface FormFieldProps {
  name: keyof TaskFormValues;
  form: UseFormReturn<TaskFormValues>;
  placeholder: string;
  label: string;
  description?: string;
  type?: "status" | "input" | "color";
}

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
            <RenderInput field={field} placeholder={placeholder} type={type} />
          </FormControl>
          <FormDescription>{description ? description : ""}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default FormComponent;
