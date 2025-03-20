'use client';
import { FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { ItemWrapper } from '../../../components';
import { useEffect, useState } from 'react';
import { ChildProps } from '../../../page';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gender } from '@/lib/types';
import female from '@/assets/images/profile/female.svg';
import male from '@/assets/images/profile/male.svg';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, getMonths } from '@/lib/utils';
import { REGISTER } from '@/actions';
import { useAction } from '@/lib/hooks';
import { Button, Icons, Input } from '@/components/general';
import Image from 'next/image';

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Genders: { label: string; icon?: string; value: Gender }[] = [
  {
    label: 'Эрэгтэй',
    value: Gender.Male,
    icon: male.src,
  },
  {
    label: 'Эмэгтэй',
    value: Gender.Female,
    icon: female.src,
  },
  {
    label: 'Бусад',
    value: Gender.Custom,
  },
];

const FormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: 'Нэрээ оруулна уу.',
    }),
    lastName: z.string().min(2, {
      message: 'Овгоо оруулна уу.',
    }),
    gender: z.enum([Gender.Custom, Gender.Female, Gender.Male], {
      required_error: 'Утгыг оруулна уу.',
    }),
    password: z.string({ required_error: 'Нууц үгээ оруулна уу.' }).min(2, {
      message: 'Нууц үгээ оруулна уу.',
    }),
    rePassword: z.string({ required_error: 'Нууц үгээ давтан оруулна уу' }),

    year: z.string({ required_error: 'Төрсөн оноо оруулна уу' }),
    month: z.string().optional(),
    day: z.string().optional(),
  })
  .superRefine(({ password, rePassword }, ctx) => {
    if (rePassword !== password)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Нууц үг таарахгүй байна.',
        path: ['rePassword'],
      });

    return z.NEVER;
  });

type FormSchema = z.infer<typeof FormSchema>;

interface KeyValuePair {
  key: any;
  label: any;
}

interface Props extends ChildProps {
  onFinish: (signUp: { token: string }) => void;
  phone: string;
  session?: string;
  loading: boolean;
}

export const RegisterForm: React.FC<Props> = ({ onFinish, phone, session, loading: userLoad }) => {
  const [hidePassword, setHidePassword] = useState<Record<0 | 1, boolean>>({
    0: true,
    1: true,
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
    watch,
    setValue,
  } = useForm<FormSchema>({
    mode: 'onSubmit',
    resolver: zodResolver(FormSchema),
    defaultValues: {
      gender: Gender.Male,
    },
  });

  const { gender, month } = watch();

  const { action: signUp, loading } = useAction(REGISTER, {
    lazy: true,
    onSuccess(data) {
      if (!data?.token) return;
      onFinish(data);
    },
  });

  const onSubmit = (data: FormSchema) => {
    signUp({
      email: '',
      gender: capitalizeFirstLetter(data.gender) as Gender,
      name: data.firstName ?? '',
      password: data.password ?? '',
      phone: phone ?? '',
      session: session ?? '',
      year: +(data.year ?? 0),
      month: data.month ? +data.month : 0,
      day: data.day ? +data.day : 0,
    });
  };

  const getYears = () => {
    let d = new Date();
    let y = d.getFullYear();

    const times: KeyValuePair[] = [];
    for (let i = 0; i < 60; i++) {
      times.push({ key: i, label: y-- });
    }
    return times;
  };

  const getDays = (month: string = '') => {
    const days: { key: number; label: number }[] = [];
    const totalDays = new Date(new Date().getFullYear(), parseInt(month, 10), 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push({ key: i, label: i });
    }
    return days;
  };

  let Days = getDays(month);

  const Years = getYears();

  useEffect(() => {
    setValue('day', '');
    Days = getDays(month);
  }, [watch('month')]);

  return (
    <>
      <div className="flex justify-between gap-3 -mt-3">
        <FormField
          control={control}
          name="lastName"
          render={({ field: { value = '', ...field }, fieldState: { error } }) => (
            <ItemWrapper
              title="Овог"
              error={error}
              titleClassName="text-sm"
              className="mb-4 w-full"
            >
              <Input {...field} value={value} className="h-12" placeholder="Овог" />
            </ItemWrapper>
          )}
        />
        <FormField
          control={control}
          name="firstName"
          render={({ field: { value = '', ...field }, fieldState: { error } }) => (
            <ItemWrapper title="Нэр" error={error} titleClassName="text-sm" className="mb-4 w-full">
              <Input {...field} value={value} className="h-12" placeholder="Нэр" />
            </ItemWrapper>
          )}
        />
      </div>

      <div className="grid grid-cols-3">
        <FormField
          control={control}
          name="year"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ItemWrapper error={error} title="Төрсөн он" titleClassName="text-sm" className="mb-4">
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Он" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="h-full max-h-96 overflow-y-auto">
                    <SelectLabel>Төрсөн он</SelectLabel>
                    {Years.map((year, index) => (
                      <SelectItem key={index} value={year.label.toString()}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </ItemWrapper>
          )}
        />
        <FormField
          control={control}
          name="month"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ItemWrapper error={error} title="Сар" titleClassName="text-sm" className="mb-4">
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Сар" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="h-full max-h-96 overflow-y-auto">
                    <SelectLabel>Сар</SelectLabel>
                    {getMonths.map((month, index) => (
                      <SelectItem key={index} value={month.label}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </ItemWrapper>
          )}
        />
        <FormField
          control={control}
          name="day"
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ItemWrapper error={error} title="Өдөр" titleClassName="text-sm" className="mb-4">
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Өдөр" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className="h-full max-h-96 overflow-y-auto">
                    <SelectLabel>Өдөр</SelectLabel>
                    {Days.map((year, index) => (
                      <SelectItem key={index} value={year.label.toString()}>
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </ItemWrapper>
          )}
        />
      </div>

      <FormField
        control={control}
        name="gender"
        render={({ field: { onChange }, fieldState: { error } }) => (
          <ItemWrapper error={error} title="Хүйс" titleClassName="text-sm" className="mb-4">
            <div className="grid grid-cols-3 gap-2">
              {Genders.map((item, index) => {
                const active = item.value === gender;
                return (
                  <Button
                    onClick={() => onChange(item.value)}
                    key={index}
                    variant={active ? 'default' : 'outline'}
                    className="h-10"
                  >
                    {item.icon && (
                      <Image
                        alt={item.label}
                        width={20}
                        height={20}
                        src={item.icon}
                        className={cn(
                          'w-5',
                          'dark:filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(94%)_saturate(0%)_hue-rotate(229deg)_brightness(105%)_contrast(107%)]',
                          active &&
                            'filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(94%)_saturate(0%)_hue-rotate(229deg)_brightness(105%)_contrast(107%)] dark:filter-none',
                        )}
                      />
                    )}
                    <div className="ml-1 text-xs">{item.label}</div>
                  </Button>
                );
              })}
            </div>
          </ItemWrapper>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field: { value = '', ...field }, fieldState: { error } }) => (
          <ItemWrapper
            error={error}
            title="Хэрэглэгчийн нууц үг"
            titleClassName="text-sm"
            className="mb-4"
          >
            <div className="relative w-full">
              <Input
                {...field}
                value={value}
                type={hidePassword[0] ? 'password' : 'text'}
                placeholder="Нууц үгээ оруулна уу"
                className="pr-10 h-12"
              />
              <div
                className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                onClick={() => setHidePassword({ ...hidePassword, 0: !hidePassword[0] })}
              >
                {hidePassword[0] ? (
                  <Icons.eye className="h-7 w-5" />
                ) : (
                  <Icons.eyeOff className="h-7 w-5" />
                )}
              </div>
            </div>
          </ItemWrapper>
        )}
      />
      <FormField
        control={control}
        name="rePassword"
        render={({ field: { value = '', ...field }, fieldState: { error } }) => (
          <ItemWrapper error={error} title="Хэрэглэгчийн нууц үг давтах" titleClassName="text-sm">
            <div className="relative w-full">
              <Input
                {...field}
                value={value}
                type={hidePassword[1] ? 'password' : 'text'}
                placeholder="Нууц үгээ давтан оруулна уу"
                className="pr-10 h-12"
              />
              <div
                className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                onClick={() => setHidePassword({ ...hidePassword, 1: !hidePassword[1] })}
              >
                {hidePassword[1] ? (
                  <Icons.eye className="h-7 w-5" />
                ) : (
                  <Icons.eyeOff className="h-7 w-5" />
                )}
              </div>
            </div>
          </ItemWrapper>
        )}
      />

      <Button
        loading={loading || userLoad}
        disabled={!isValid}
        type="submit"
        className={`w-full mt-6 h-12 rounded-md bg-current-2 ${
          isValid ? 'bg-current-2' : 'bg-primary-foreground hover:bg-primary-foreground'
        }`}
        onClick={handleSubmit(onSubmit)}
      >
        <span className={`${isValid ? 'text-white' : 'text-primary'}`}>Бүртгүүлэх</span>
      </Button>
    </>
  );
};
