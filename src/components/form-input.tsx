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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  description?: string;
};

export default function FormInput({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  description,
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
