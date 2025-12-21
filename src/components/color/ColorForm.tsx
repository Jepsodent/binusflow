import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ColorFormValue } from "@/schemas/ColorSchema";
import { Input } from "../ui/input";

interface FormFieldProps {
  name: keyof ColorFormValue;
  form: UseFormReturn<ColorFormValue>;
  placeholder: string;
  label: string;
  description?: string;
  type?: "color" | "input";
}

const ColorForm = (props: FormFieldProps) => {
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
              <div className="flex items-center gap-3">
                <Input
                  type="color"
                  className="h-10 w-10 p-1 "
                  value={field.value || "#000000"}
                  onChange={field.onChange}
                />
                <Input
                  value={field.value || "#000000"}
                  disabled
                  onChange={field.onChange}
                  className="w-32 font-mono"
                />
              </div>
            )}
          </FormControl>
          <FormDescription>{description ? description : ""}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
};

export default ColorForm;
