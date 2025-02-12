import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { BlockItem, PaymentSchemaType } from "../../page";
import { Participant } from "@/lib/types";
import { useMemo } from "react";
import {
  PAYMENT_TYPE,
  PartnerObjType,
  SystemType,
} from "@/lib/config/constant";
import cash from "@/assets/images/banks/cash.png";
import card from "@/assets/images/banks/card.png";
import qpay from "@/assets/images/banks/qpay.png";
import monpay from "@/assets/images/banks/monpay.png";
import socialPay from "@/assets/images/banks/socialpay.png";
import toki from "@/assets/images/banks/toki.png";
import upoint from "@/assets/images/banks/upoint.png";
import unp from "@/assets/images/banks/union.png";
import voucher from "@/assets/images/banks/voucher.svg";
import mbank from "@/assets/images/banks/mbank.png";
import { Icons } from "@/components/shared/icons";
import Image, { StaticImageData } from "next/image";

type Props = {
  watch: UseFormWatch<PaymentSchemaType>;
  setValue: UseFormSetValue<PaymentSchemaType>;
  participant?: Participant;
  partner?: SystemType | undefined;
};

export const BankImages: Record<string, StaticImageData> = {
  [PAYMENT_TYPE.Cash]: cash,
  [PAYMENT_TYPE.Kart]: card,
  [PAYMENT_TYPE.QPay]: qpay,
  [PAYMENT_TYPE.MonPay]: monpay,
  [PAYMENT_TYPE.SocialPay]: socialPay,
  [PAYMENT_TYPE.Toki]: toki,
  [PAYMENT_TYPE.UPT]: upoint,
  [PAYMENT_TYPE.Upoint]: upoint,
  [PAYMENT_TYPE.MNQ]: monpay,
  [PAYMENT_TYPE.UNP]: unp,
  [PAYMENT_TYPE.VCR]: voucher,
  [PAYMENT_TYPE.MBK]: mbank,
};

const filterBanks = ["QPay", "QPay2", "UPT", "Upoint", "VCR"];

export const BanksForm: React.FC<Props> = ({
  watch,
  setValue,
  participant,
  partner,
}) => {
  const { paymentType } = watch();

  const banks = useMemo(() => {
    if (participant) {
      return participant.payments.filter((payment) =>
        partner
          ? PartnerObjType[partner]?.payment === payment
          : !filterBanks.includes(payment)
      );
    }
    return [];
  }, [participant, partner]);

  if (banks.length < 1) return null;

  return (
    <BlockItem>
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {banks.map((bank, index) => {
          const active = paymentType === bank;
          return (
            <div
              key={index}
              onClick={() => {
                setValue("payment", bank);
                setValue("paymentType", bank);
              }}
              className="cursor-pointer rounded-lg flex place-self-center relative"
            >
              {active && (
                <div className="absolute mt-1.5 ml-1.5 w-4 h-4 border-2 rounded-full flex items-center justify-center border-current bg-current">
                  <Icons.check className="w-4 h-4 text-white" />
                </div>
              )}
              <Image
                width={100}
                height={100}
                className={`w-16 rounded-lg ${
                  active ? "border-4 border-current" : ""
                }`}
                src={BankImages[bank]}
                alt={`${bank} Bank`}
              />
            </div>
          );
        })}
      </div>
    </BlockItem>
  );
};
