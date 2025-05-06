import { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

const FormInput = ({
  name,
  label,
  form,
  required = false,
  placeholder,
  description,
  type = 'text',
}: {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  required?: boolean;
  placeholder?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            required={required}
            placeholder={placeholder}
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
            {...field}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormInput;
