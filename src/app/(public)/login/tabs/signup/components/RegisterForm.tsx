'use client';
import { FormField } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import ItemWrapper from '../../../components/ItemWrapper';
import { Input } from '@/components/ui/input';
import { useEffect, useRef, useState } from 'react';
import { ChildProps } from '../../../page';
import { LoadingButton } from '@/components/ui/loading-button';
import { useMutation } from '@apollo/client';
import { REGISTER } from '@/graphql/mutation';
import { Icons } from '@/components/shared/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gender, SignUpReturnValue } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
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
import { getMonths } from '@/lib/utils';
import Image from 'next/image';
function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const Genders: { label: string; icon?: string; value: Gender }[] = [
  {
    label: 'Эрэгтэй',
    value: Gender.Male,
    icon: male,
  },
  {
    label: 'Эмэгтэй',
    value: Gender.Female,
    icon: female,
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
  key;
  label;
}

interface Props extends ChildProps {
  onFinish: (signUp: SignUpReturnValue) => void;
  phone: string;
  session?: string;
  loading: boolean;
}

export const RegisterForm: React.FC<Props> = ({
  onFinish,
  phone,
  session,
  loading: userLoad,
}) => {
  const { mainTheme } = useTheme();
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

  const [signUp, { loading }] = useMutation(REGISTER, {
    onCompleted({ signUp }) {
      onFinish(signUp);
    },
  });

  const onSubmit = (data: FormSchema) => {
    signUp({
      variables: {
        input: {
          email: '',
          gender: capitalizeFirstLetter(data.gender),
          name: data.firstName,
          password: data.password,
          phone,
          session,
          year: +data.year,
          month: data.month ? +data.month : 0,
          day: data.day ? +data.day : 0,
        },
      },
    });
  };

  const getYears = () => {
    const d = new Date();
    let y = d.getFullYear();

    const times: KeyValuePair[] = [];
    for (let i = 0; i < 60; i++) {
      times.push({ key: i, label: y-- });
    }
    return times;
  };

  const getDays = (month: string = '') => {
    const days = [];
    const totalDays = new Date(
      new Date().getFullYear(),
      parseInt(month, 10),
      0
    ).getDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push({ key: i, label: i });
    }
    return days;
  };
  const daysRef = useRef(getDays(month));
  useEffect(() => {
    setValue('day', '');
    daysRef.current = getDays(month);
  }, [month, setValue]);

  const Days = daysRef.current;
  const Years = getYears();
  return (
    <>
      <div className='flex justify-between gap-3'>
        <FormField
          control={control}
          name='lastName'
          render={({
            field: { value = '', ...field },
            fieldState: { error },
          }) => (
            <ItemWrapper
              title='Овог'
              error={error}
              titleClassName='text-sm'
              className='mb-4 w-full'
            >
              <Input
                {...field}
                value={value}
                className='h-12'
                placeholder='Овог'
              />
            </ItemWrapper>
          )}
        />
        <FormField
          control={control}
          name='firstName'
          render={({
            field: { value = '', ...field },
            fieldState: { error },
          }) => (
            <ItemWrapper
              title='Нэр'
              error={error}
              titleClassName='text-sm'
              className='mb-4 w-full'
            >
              <Input
                {...field}
                value={value}
                className='h-12'
                placeholder='Нэр'
              />
            </ItemWrapper>
          )}
        />
      </div>

      <div className='grid grid-cols-3'>
        <FormField
          control={control}
          name='year'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ItemWrapper
              error={error}
              title='Төрсөн он'
              titleClassName='text-sm'
              className='mb-4'
            >
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Он' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='h-full max-h-96 overflow-y-auto'>
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
          name='month'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ItemWrapper
              error={error}
              title='Төрсөн сар'
              titleClassName='text-sm'
              className='mb-4'
            >
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Сар' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='h-full max-h-96 overflow-y-auto'>
                    <SelectLabel>Төрсөн сар</SelectLabel>
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
          name='day'
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <ItemWrapper
              error={error}
              title='Төрсөн он'
              titleClassName='text-sm'
              className='mb-4'
            >
              <Select value={value} onValueChange={onChange}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Өдөр' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup className='h-full max-h-96 overflow-y-auto'>
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
        name='gender'
        render={({ field: { onChange }, fieldState: { error } }) => (
          <ItemWrapper
            error={error}
            title='Хүйс'
            titleClassName='text-sm'
            className='mb-4'
          >
            <div className='grid grid-cols-3 gap-2'>
              {Genders.map((item, index) => {
                const active = item.value === gender;
                return (
                  <Button
                    onClick={() => onChange(item.value)}
                    key={index}
                    variant={active ? 'default' : 'outline'}
                    className='h-12'
                  >
                    {item.icon && (
                      <Image
                        width={100}
                        height={100}
                        className='w-auto h-auto'
                        alt='itemPhoto'
                        src={item.icon}
                        style={{
                          filter:
                            (mainTheme === 'light' && active) ||
                            (mainTheme !== 'light' && !active)
                              ? 'brightness(0) saturate(100%) invert(100%) sepia(94%) saturate(0%) hue-rotate(229deg) brightness(105%) contrast(107%)'
                              : '',
                        }}
                      />
                    )}
                    <div className='ml-1'>{item.label}</div>
                  </Button>
                );
              })}
            </div>
          </ItemWrapper>
        )}
      />

      <FormField
        control={control}
        name='password'
        render={({
          field: { value = '', ...field },
          fieldState: { error },
        }) => (
          <ItemWrapper
            error={error}
            title='Хэрэглэгчийн нууц үг'
            titleClassName='text-sm'
            className='mb-4'
          >
            <div className='relative w-full'>
              <Input
                {...field}
                value={value}
                type={hidePassword[0] ? 'password' : 'text'}
                placeholder='Нууц үгээ оруулна уу'
                className='pr-10 h-12'
              />
              <div
                className='absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100'
                onClick={() =>
                  setHidePassword({ ...hidePassword, 0: !hidePassword[0] })
                }
              >
                {hidePassword[0] ? (
                  <Icons.eye className='h-7 w-5' />
                ) : (
                  <Icons.eyeOff className='h-7 w-5' />
                )}
              </div>
            </div>
          </ItemWrapper>
        )}
      />
      <FormField
        control={control}
        name='rePassword'
        render={({
          field: { value = '', ...field },
          fieldState: { error },
        }) => (
          <ItemWrapper
            error={error}
            title='Хэрэглэгчийн нууц үг давтах'
            titleClassName='text-sm'
          >
            <div className='relative w-full'>
              <Input
                {...field}
                value={value}
                type={hidePassword[1] ? 'password' : 'text'}
                placeholder='Нууц үгээ давтан оруулна уу'
                className='pr-10 h-12'
              />
              <div
                className='absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100'
                onClick={() =>
                  setHidePassword({ ...hidePassword, 1: !hidePassword[1] })
                }
              >
                {hidePassword[1] ? (
                  <Icons.eye className='h-7 w-5' />
                ) : (
                  <Icons.eyeOff className='h-7 w-5' />
                )}
              </div>
            </div>
          </ItemWrapper>
        )}
      />

      <div className='px-2 w-full'>
        <LoadingButton
          loading={loading || userLoad}
          disabled={!isValid}
          type='submit'
          className={`w-full mt-6 rounded-full bg-current ${
            isValid
              ? 'bg-primary'
              : 'bg-primary-foreground hover:bg-primary-foreground'
          }`}
          onClick={handleSubmit(onSubmit)}
        >
          <span className={`${isValid ? 'text-white' : 'text-primary'}`}>
            Бүртгүүлэх
          </span>
        </LoadingButton>
      </div>
    </>
  );
};
