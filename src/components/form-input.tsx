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

type Props = {
  name: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  required?: boolean;
  placeholder?: string;
  description?: string;
  type?: React.HTMLInputTypeAttribute;
};

export default function FormInput({
  name,
  label,
  form,
  required = false,
  placeholder,
  description,
  type = 'text',
}: Props) {
  return (
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
}
