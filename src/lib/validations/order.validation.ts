import { SessionType } from '@/lib/constant';
import { z } from 'zod';

const baseTableOrderSchema = z.object({
  guests: z.number().optional(),
  date: z.string().optional(),
  deliveryDate: z.string().optional(),
  sectionId: z.string().optional(),
  duration: z.string().optional(),
  participants: z.array(
    z.object({ id: z.string().optional(), name: z.string(), phone: z.string() }),
  ),
  comment: z.string().optional(),
});

export const TableOrderSchema = baseTableOrderSchema.superRefine(
  ({ date, deliveryDate, sectionId, guests }, ctx) => {
    if (!guests || guests < 1)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Зочдын тоог оруулна уу',
        path: ['guests'],
      });

    if (!date)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Өдрөө сонгоно уу',
        path: ['date'],
      });

    if (!deliveryDate || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(deliveryDate))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Цагаа сонгоно уу',
        path: ['time'],
      });

    if (!sectionId)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Үйлчлэх заалаа сонгоно уу',
        path: ['sectionId'],
      });

    return z.NEVER;
  },
);

export type TableOrderInput = z.infer<typeof TableOrderSchema>;

export const TableInputSchema = z.object({
  tables: z.array(z.object({ tableId: z.string(), guests: z.number() })).optional(),
});

export type TableInput = z.infer<typeof TableInputSchema>;

const baseTakeAway = z.object({
  deliveryDate: z.string().optional(),
  name: z.string().optional(),
  contact: z.string().optional(),
  comment: z.string().optional(),
});

export const TakeAwaySchema = baseTakeAway.superRefine(({ deliveryDate }, ctx) => {
  if (!deliveryDate)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Цагаа сонгоно уу',
      path: ['deliveryDate'],
    });

  return z.NEVER;
});

export type TakeAwayInput = z.infer<typeof TakeAwaySchema>;

const baseOrderOtp = z.object({
  type: z.nativeEnum(SessionType).optional(),
  phone: z.string().optional(),
  name: z.string().optional(),
  pin: z.string().optional(),
  sessionId: z.string().optional(),
});

export const OrderOtpSchema = baseOrderOtp.superRefine(({ type, name, pin, phone }, ctx) => {
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

  if (type === SessionType.R) {
    if (!name || name.length < 4)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Нэрээ оруулна уу',
        path: ['name'],
      });
  }

  if (!pin || pin.length < 4)
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Нэг удаагийн код-оо оруулна уу',
      path: ['pin'],
    });

  return z.NEVER;
});

export type OrderOtpInput = z.infer<typeof OrderOtpSchema>;

const basePaymentSchema = z.object({
  vatType: z.string({ required_error: 'НӨАТ-ийн төрлөө сонгоно уу' }),
  code: z.string().optional(),
  register: z.string().optional(),
  buyer: z.string().optional(),
  payment: z.string().optional(),
  paymentType: z.string().optional(),
});

export const PaymentFormSchema = basePaymentSchema.superRefine(
  ({ vatType, register, payment, paymentType }, ctx) => {
    if (vatType && vatType === '3' && (!register || register.length < 7)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Байгууллагын регистер-ээ оруулна уу',
        path: ['register'],
      });
    }

    if (!payment) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Төлбөрийн төрлөө сонгоно уу',
        path: ['payment'],
      });
    }

    if (!paymentType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Төлбөрийн төрлөө сонгоно уу',
        path: ['payment'],
      });
    }

    return z.NEVER;
  },
);

export type PaymentSchemaType = z.infer<typeof PaymentFormSchema>;
