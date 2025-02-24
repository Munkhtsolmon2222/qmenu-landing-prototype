"use client";
import { FormField } from "@/components/ui/form";
import { GET_VAT_PAYER } from "@/graphql/query";
import { useLazyQuery } from "@apollo/client";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";
import BlockItem from "./BlockItem";
import { PaymentSchemaType } from "../page";
import { FieldError } from "../../../order/components";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

type Props = {
  watch: UseFormWatch<PaymentSchemaType>;
  setValue: UseFormSetValue<PaymentSchemaType>;
  control: Control<PaymentSchemaType>;
};

export const VatForm: React.FC<Props> = ({ watch, setValue, control }) => {
  const { vatType, register } = watch();

  const [getVatPayer, { loading }] = useLazyQuery(GET_VAT_PAYER, {
    onCompleted(data) {
      setValue("buyer", data.getVatPayer.name);
      if (!data.getVatPayer.found) setValue("buyer", undefined);
    },
    onError: () => {
      setValue("register", undefined);
      toast({
        title: "Алдаа",
        variant: "default",
        description: "Регистерийн дугаар буруу байна",
      });
    },
  });

  useEffect(() => {
    if (!register || register.length !== 7) setValue("buyer", "");
    else if (register.length === 7) getVatPayer({ variables: { register } });
  }, [register, getVatPayer, setValue]);

  useEffect(() => {
    setValue("register", undefined);
  }, [vatType, setValue]);

  return (
    <BlockItem>
      <div className="text-sm text-misty ">НӨАТ-ийн баримт</div>

      <FormField
        control={control}
        name="vatType"
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <div className="flex gap-3 mt-2 cursor-pointer">
              <span
                className={`inline-grid border border-border text-center p-2 w-full rounded-xl ${
                  vatType === "1" ? "bg-current-2 text-primary-foreground" : ""
                } `}
                onClick={() => onChange("1")}
              >
                Хувь хүн
              </span>
              <span
                onClick={() => onChange("3")}
                className={`inline-grid border border-border text-center p-2 w-full rounded-xl ${
                  vatType === "3" ? "bg-current-2 text-primary-foreground" : ""
                } `}
              >
                Байгуулага
              </span>
            </div>
            <FieldError error={error} />
          </>
        )}
      />

      {vatType === "3" && (
        <>
          <div className={` ${loading ? "opacity-20" : ""} `}>
            <div className="inline-grid w-full  ">
              <label
                className="text-gray-700 text-sm py-2 dark:text-white"
                htmlFor=""
              >
                Байгууллагын регистер
              </label>
              <FormField
                control={control}
                name="register"
                render={({
                  field: { ref, value = "", onChange },
                  fieldState: { error },
                }) => (
                  <>
                    <Input
                      maxLength={7}
                      ref={ref}
                      disabled={loading}
                      onChange={(e) => onChange(e.target.value)}
                      className="px-4 py-2 text-gray-800 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 mb-1"
                      type="text"
                      value={value}
                    />
                    <FieldError error={error} />
                  </>
                )}
              />
            </div>

            <div className="inline-grid w-full ">
              <label
                className="text-gray-700 text-sm  text-misty py-2 dark:text-white"
                htmlFor=""
              >
                Байгууллагын нэр
              </label>
              <FormField
                control={control}
                name="buyer"
                render={({
                  field: { ref, value = "" },
                  fieldState: { error },
                }) => (
                  <>
                    <input
                      ref={ref}
                      value={value}
                      className="px-4 py-2 text-gray1 transition duration-300 border border-gray-300 rounded-lg focus:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300"
                      type="text"
                      disabled
                    />
                    <FieldError error={error} />
                  </>
                )}
              />
            </div>
          </div>
        </>
      )}
    </BlockItem>
  );
};
