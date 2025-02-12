"use client";
import { Icons } from "@/components/shared/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { SEARCH_CUSTOMERS } from "@/graphql/query/customer";
import { Customer } from "@/lib/types";
import { useLazyQuery } from "@apollo/client";
import { LoaderIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onFinish: (e: { id: string; name: string; phone: string }) => void;
  // participants: { id?: string; name: string; phone: string }[];
  participants;
}

export const ParticipantsModal: React.FC<Props> = ({
  visible,
  setVisible,
  onFinish,
  participants,
}) => {
  const [customer, setCustomer] = useState<Customer>();
  const [error, setError] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const [searchCustomers, { loading }] = useLazyQuery(SEARCH_CUSTOMERS, {
    onCompleted: (data) => {
      const item = data.searchCustomers[0];
      if (item) {
        setCustomer(item);
        setError("");
      } else setError("Зочин олдсонгүй");
    },
    onError: () => setError("Зочин олдсонгүй"),
  });

  useEffect(() => {
    const prev = participants?.find((p) => p.phone === phone);
    if (prev) setError("Дугаар бүртгэгдсэн байна");
    else {
      if (phone.length === 8) searchCustomers({ variables: { query: phone } });
    }
  }, [phone, participants, searchCustomers]);

  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    if ((e.target.value ?? "").length < 8) {
      setError("");
      setCustomer(undefined);
      setPhone("");
    }
    if ((e.target.value ?? "").length <= 8) {
      setPhone(e.target.value);
    }
  };

  useEffect(() => {
    if (visible) setTimeout(() => inputRef.current?.focus(), 300);
  }, [visible]);

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      className="w-[calc(100%_-_30px)] -mt-20"
    >
      <Modal.Header>{t("Add a guest")}</Modal.Header>
      <Modal.Content>
        <Input
          ref={inputRef}
          placeholder={t("Phone number")}
          type="number"
          maxLength={8}
          value={phone}
          onChange={onChangePhone}
        />
        {error && (
          <div className="text-sm text-center text-red-500">{error}</div>
        )}
        {loading && (
          <div className="flex items-center justify-center">
            <LoaderIcon className="animate-spin text-current" />
          </div>
        )}
        {customer && (
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  <Icons.user />
                </AvatarFallback>
              </Avatar>
              <div>{customer.firstName}</div>
            </div>
            <Button
              onClick={() => {
                onFinish({
                  id: customer.id,
                  name: customer.firstName ?? "",
                  phone,
                });
                setCustomer(undefined);
                setPhone("");
                setError("");
              }}
              className="bg-current-2 text-white hover:bg-current-3"
            >
              <Icons.add />
            </Button>
          </div>
        )}
      </Modal.Content>
    </Modal>
  );
};
