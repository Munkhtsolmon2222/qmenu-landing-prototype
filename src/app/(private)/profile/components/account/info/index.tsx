'use client';
import { UPDATE_PROFILE } from '@/actions';
import female from '@/assets/images/profile/female.svg';
import male from '@/assets/images/profile/male.svg';
import { Button, Icons, Input } from '@/components/general';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { showToast } from '@/lib/helpers';
import { useAction } from '@/lib/hooks';
import { Customer, Gender } from '@/lib/types';
import { ProfileInput, ProfileSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ItemWrapper } from '../ItemWrapper';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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

interface Props {
  customer?: Customer;
}

export const Info: React.FC<Props> = ({ customer }) => {
  const [changed, setChanged] = useState<boolean>(false);

  const { handleSubmit, control, setValue, watch } = useForm<ProfileInput>({
    mode: 'all',
    resolver: zodResolver(ProfileSchema),
  });

  const { gender, firstName, lastName } = watch();

  const { action: updateProfile, loading } = useAction(UPDATE_PROFILE, {
    lazy: true,
    onSuccess() {
      setChanged(false);
      showToast('Амжилттай');
    },
  });

  useEffect(() => {
    setChanged(
      (gender && firstName && lastName && gender !== customer?.gender) ||
        lastName !== customer?.lastName ||
        firstName !== customer.firstName,
    );
  }, [gender, firstName, lastName, customer]);

  useEffect(() => {
    if (customer) {
      setValue('firstName', customer.firstName ?? '');
      setValue('lastName', customer.lastName ?? '');
      setValue('gender', customer.gender ?? Gender.Male);
    }
  }, [customer]);

  function onSubmit(input: ProfileInput) {
    updateProfile(input);
  }

  return (
    <>
      <div className="text-lg font-medium mb-5">Хэрэглэгчийн мэдээлэл</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-16 w-16 text-white">
            <AvatarImage alt="AI Assistant" src="/placeholder-user.jpg" />
            <AvatarFallback className="text-xl bg-current-3">
              {(customer?.firstName ?? 'Gu').slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="text-xl xl:text-2xl font-medium">{customer?.firstName}</div>
        </div>
        <Button
          loading={loading}
          variant={changed ? 'default' : 'outline'}
          disabled={!changed}
          className="flex items-center gap-2"
          onClick={handleSubmit(onSubmit)}
        >
          <div className="font-normal">Засах</div>
          <div className="h-5">
            <Icons.pencilLine className="h-full w-full" />
          </div>
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
        <div className="flex flex-col gap-5 sm:mr-5">
          <Controller
            control={control}
            name="lastName"
            render={({ field: { value = '', ...field }, fieldState: { error } }) => (
              <ItemWrapper title="Овог" error={error}>
                <Input placeholder="Овог" {...field} value={value} className="h-12" />
              </ItemWrapper>
            )}
          />

          <Controller
            control={control}
            name="firstName"
            render={({ field: { value = '', ...field }, fieldState: { error } }) => (
              <ItemWrapper title="Нэр" error={error}>
                <Input placeholder="Нэр" {...field} value={value} className="h-12" />
              </ItemWrapper>
            )}
          />
        </div>

        <Controller
          control={control}
          name="gender"
          render={({ field: { onChange }, fieldState: { error } }) => (
            <ItemWrapper title="Хүйс" error={error}>
              <div className="flex gap-2 flex-wrap">
                {Genders.map((item, index) => {
                  const active = item.value === gender;
                  return (
                    <Button
                      onClick={() => onChange(item.value)}
                      key={index}
                      variant={active ? 'default' : 'outline'}
                    >
                      {item.icon && (
                        <Image
                          alt="gender"
                          width={20}
                          height={20}
                          src={item.icon}
                          className={cn(
                            'dark:filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(94%)_saturate(0%)_hue-rotate(229deg)_brightness(105%)_contrast(107%)]',
                            active &&
                              'filter-[brightness(0)_saturate(100%)_invert(100%)_sepia(94%)_saturate(0%)_hue-rotate(229deg)_brightness(105%)_contrast(107%)] dark:filter-none',
                          )}
                        />
                      )}
                      <div className="ml-1">{item.label}</div>
                    </Button>
                  );
                })}
              </div>
            </ItemWrapper>
          )}
        />
      </div>
    </>
  );
};
