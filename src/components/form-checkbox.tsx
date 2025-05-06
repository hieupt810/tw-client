import { UseFormReturn } from 'react-hook-form';

import { Checkbox } from './ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from './ui/form';

const FormCheckbox = ({
  form,
  name,
  label,
  required = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  name: string;
  label: string;
  required?: boolean;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem className='flex flex-row items-center'>
        <FormControl>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            required={required}
            aria-required={required}
            disabled={form.formState.isSubmitting}
            aria-disabled={form.formState.isSubmitting}
          />
        </FormControl>
        <FormLabel className='font-normal'>{label}</FormLabel>
      </FormItem>
    )}
  />
);

export default FormCheckbox;
