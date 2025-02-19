"use client";
import { SessionType } from "@/lib/config/constant";
import { z } from "zod";

const baseTableOrderSchema = z.object({
  guests: z.number().optional(),
  date: z.string().optional(),
  deliveryDate: z.string().optional(),
  sectionId: z.string().optional(),
  duration: z.string().optional(),
  participants: z.array(
    z.object({ id: z.string().optional(), name: z.string(), phone: z.string() })
  ),
  comment: z.string().optional(),
});

export const TableOrderSchema = baseTableOrderSchema.superRefine(
  ({ date, deliveryDate, sectionId, guests }, ctx) => {
    if (!guests || guests < 1)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Зочдын тоог оруулна уу",
        path: ["guests"],
      });

    if (!date)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Өдрөө сонгоно уу",
        path: ["date"],
      });

    if (!deliveryDate || !/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/.test(deliveryDate))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Цагаа сонгоно уу",
        path: ["time"],
      });

    if (!sectionId)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Үйлчлэх заалаа сонгоно уу",
        path: ["sectionId"],
      });

    return z.NEVER;
  }
);

export type TableOrderInput = z.infer<typeof TableOrderSchema>;

export const TableInputSchema = z.object({
  tables: z
    .array(z.object({ tableId: z.string(), guests: z.number() }))
    .optional(),
});

export type TableInput = z.infer<typeof TableInputSchema>;

const baseTakeAway = z.object({
  deliveryDate: z.string().optional(),
  name: z.string().optional(),
  contact: z.string().optional(),
  comment: z.string().optional(),
});

export const TakeAwaySchema = baseTakeAway.superRefine(
  ({ deliveryDate }, ctx) => {
    if (!deliveryDate)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Цагаа сонгоно уу",
        path: ["deliveryDate"],
      });

    return z.NEVER;
  }
);

export type TakeAwayInput = z.infer<typeof TakeAwaySchema>;

const baseOrderUser = z.object({
  phone: z.string().optional(),
  password: z.string().optional(),
  user: z.boolean(),
});

export const OrderUserSchema = baseOrderUser.superRefine(
  ({ phone, password }, ctx) => {
    if (!phone)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Утасны дугаараа оруулна уу",
        path: ["phone"],
      });

    if (phone && !/^\d{8}$/.test(phone))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Утасны дугаар буруу байна",
        path: ["phone"],
      });

    if (!password)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Нууц үгээ оруулна уу",
        path: ["password"],
      });

    return z.NEVER;
  }
);

export type OrderUserInput = z.infer<typeof OrderUserSchema>;

const baseOrderOtp = z.object({
  type: z.nativeEnum(SessionType).optional(),
  phone: z.string().optional(),
  name: z.string().optional(),
  pin: z.string().optional(),
  sessionId: z.string().optional(),
});

export const OrderOtpSchema = baseOrderOtp.superRefine(
  ({ type, name, pin, phone }, ctx) => {
    if (!phone)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Утасны дугаараа оруулна уу",
        path: ["phone"],
      });

    if (phone && !/^\d{8}$/.test(phone))
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Утасны дугаар буруу байна",
        path: ["phone"],
      });

    if (type === SessionType.R) {
      if (!name || name.length < 4)
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Нэрээ оруулна уу",
          path: ["name"],
        });
    }

    if (!pin || pin.length < 4)
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Нэг удаагийн код-оо оруулна уу",
        path: ["pin"],
      });

    return z.NEVER;
  }
);

export type OrderOtpInput = z.infer<typeof OrderOtpSchema>;
