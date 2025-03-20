'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui';
import { Button, Input } from '@/components/general';

const FormSchema = z.object({
  email: z.string().email({
    message: 'Enter a valid email.',
  }),
});

export function NewsletterForm() {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function onSubmit(data: z.infer<typeof FormSchema>) {
    form.reset();

    ///Doto
    //Add mutation to subcribe
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2 ">
        <FormField
          control={form.control}
          name="email"
          render={({ field }: { field: any }) => (
            <FormItem>
              <FormControl>
                <div className="flex flex-col gap-2 items-start justify-center pt-4">
                  <FormLabel htmlFor="rating" className="pl-3 sm:text-center ">
                    {t('Register an organization')}
                  </FormLabel>
                  <div className="flex border-2 rounded-full">
                    <Input
                      type="email"
                      className="border-none outline-none w-3/4 cursor-pointer"
                      placeholder="bat@example.com"
                      {...field}
                    />
                    <div className="flex items-center px-[2px] pointer-events-none z-50 cursor-pointer ">
                      <Button size="sm">{t('signup')}</Button>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
