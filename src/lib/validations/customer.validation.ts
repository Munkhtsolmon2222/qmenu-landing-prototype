import { z } from 'zod';
import { Gender } from '../types';

const baseUser = z.object({
  phone: z.string().optional(),
  password: z.string().optional(),
  user: z.boolean(),
});

export const LoginSchema = baseUser.superRefine(({ phone, password }, ctx) => {
  if (!phone)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Утасны дугаараа оруулна уу',
      path: ['phone'],
    });

  if (phone && !/^\d{8}$/.test(phone))
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Утасны дугаар буруу байна',
      path: ['phone'],
    });

  if (!password)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Нууц үгээ оруулна уу',
      path: ['password'],
    });

  return z.NEVER;
});

export type LoginInput = z.infer<typeof LoginSchema>;

export type SignupInput = {
  gender: Gender;
  name: string;
  password: string;
  phone: string;
  session: string;
  year: number;
  month: number;
  day: number;
  email: string;
};

export const ProfileSchema = z.object({
  firstName: z.string().min(2, {
    message: 'Нэрээ оруулна уу.',
  }),
  lastName: z.string().min(2, {
    message: 'Овгоо оруулна уу.',
  }),
  gender: z.enum([Gender.Custom, Gender.Female, Gender.Male], {
    required_error: 'Утгыг оруулна уу.',
  }),
});

export type ProfileInput = z.infer<typeof ProfileSchema>;

const ChangePasswordBaseSchema = z.object({
  oldPassword: z.string({ required_error: 'Хуучин ууц үгээ оруулна уу.' }).min(2, {
    message: 'Хуучин ууц үгээ оруулна уу.',
  }),
  password: z.string({ required_error: 'Шинэ нууц үгээ оруулна уу.' }).min(4, {
    message: 'Нууц үг 4-с дээш тэмдэгтээс бүрдэнэ.',
  }),
  rePassword: z.string({ required_error: 'Нууц үгээ давтан оруулна уу.' }),
});

export const ChangePasswordSchema = ChangePasswordBaseSchema.superRefine(
  ({ password, rePassword }, ctx) => {
    if (rePassword !== password)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Нууц үг таарахгүй байна.',
        path: ['rePassword'],
      });

    return z.NEVER;
  },
);

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

export const SigninSchema = z.object({
  phone: z
    .string({
      required_error: 'Утасны дугаараа оруулна уу',
    })
    .refine(
      (phone) => {
        return /^\d{8}$/.test(phone);
      },
      { message: 'Утасны дугаар буруу байна' },
    ),
  password: z.string().min(2, {
    message: 'Нууц үгээ оруулна уу.',
  }),
});

export type SigninInput = z.infer<typeof SigninSchema>;
