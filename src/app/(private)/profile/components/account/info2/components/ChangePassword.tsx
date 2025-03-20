'use client';
import { UPDATE_PASSWORD } from '@/actions';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Icons,
  Input,
} from '@/components/general';
import { FormField } from '@/components/ui';
import { showToast } from '@/lib/helpers';
import { useAction } from '@/lib/hooks';
import { ChangePasswordInput, ChangePasswordSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ItemWrapper } from '../../ItemWrapper';
import { CloseButton } from './CloseButton';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export const ChangePassword: React.FC<Props> = ({ onClose: onCloseModal, visible }) => {
  const [hidePassword, setHidePassword] = useState<{
    old: boolean;
    new: boolean;
  }>({ old: true, new: true });

  const {
    control,
    formState: { isValid },
    handleSubmit,
    setValue,
  } = useForm<ChangePasswordInput>({
    mode: 'all',
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onClose = () => {
    setValue('oldPassword', '');
    setValue('password', '');
    setValue('rePassword', '');
    onCloseModal();
  };

  const { action: updatePassword, loading } = useAction(UPDATE_PASSWORD, {
    lazy: true,
    onSuccess: () => {
      showToast('Нууц үг амжилттай шинэчлэгдлээ.');
    },
  });

  const onSubmit = (e: FieldValues) => {
    updatePassword(e.oldPassword, e.password);
  };

  return (
    <Dialog open={visible} onOpenChange={onClose}>
      <DialogContent className="h-full sm:h-max rounded-none px-0 sm:px-4">
        <CloseButton onClick={onClose} />
        <DialogHeader className="px-4 sm:px-0">
          <DialogTitle className="text-start">Нууц үг солих</DialogTitle>
        </DialogHeader>
        <div className="relative p-4">
          <FormField
            control={control}
            name="oldPassword"
            render={({ field: { value = '', ...field }, fieldState: { error } }) => (
              <ItemWrapper error={error} title="Хуучин нууц үг" titleClassName="text-sm">
                <div className="relative w-full">
                  <Input
                    {...field}
                    value={value}
                    type={hidePassword.old ? 'password' : 'text'}
                    placeholder="Одоогийн нууц үгээ оруулна уу"
                    className="pr-10 h-12"
                  />
                  <div
                    className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                    onClick={() =>
                      setHidePassword({
                        ...hidePassword,
                        old: !hidePassword.old,
                      })
                    }
                  >
                    {hidePassword.old ? (
                      <Icons.eye className="h-7 w-5" />
                    ) : (
                      <Icons.eyeOff className="h-7 w-5" />
                    )}
                  </div>
                </div>
              </ItemWrapper>
            )}
          />

          <br />

          <FormField
            control={control}
            name="password"
            render={({ field: { value = '', ...field }, fieldState: { error } }) => (
              <ItemWrapper
                error={error}
                title="Шинэ нууц үг"
                titleClassName="text-sm"
                className="mb-3"
              >
                <div className="relative w-full">
                  <Input
                    {...field}
                    value={value}
                    type={hidePassword.new ? 'password' : 'text'}
                    placeholder="Нууц үгээ оруулна уу"
                    className="pr-10 h-12"
                  />
                  <div
                    className="absolute cursor-pointer bottom-2.5 right-4 opacity-40 hover:opacity-100"
                    onClick={() =>
                      setHidePassword({
                        ...hidePassword,
                        new: !hidePassword.new,
                      })
                    }
                  >
                    {hidePassword.new ? (
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
              <ItemWrapper error={error} titleClassName="text-sm">
                <Input
                  {...field}
                  value={value}
                  type={hidePassword ? 'password' : 'text'}
                  placeholder="Нууц үгээ давтан оруулна уу"
                  className="h-12"
                />
              </ItemWrapper>
            )}
          />
        </div>
        <DialogFooter className="px-3 flex">
          <Button
            loading={loading}
            disabled={!isValid}
            type="submit"
            className={`w-full sm:w-48 ${
              isValid ? 'bg-primary' : 'bg-primary-foreground hover:bg-primary-foreground'
            }`}
            onClick={handleSubmit(onSubmit)}
          >
            <span className={`${isValid ? 'text-white' : 'text-primary'}`}>Шинэчлэх</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
