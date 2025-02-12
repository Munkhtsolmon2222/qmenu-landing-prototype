"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useMutation } from "@apollo/client";
import { CREATE_TOPUP } from "@/graphql/mutation";
import Image from "next/image";
interface Props {
  card;
  isValidCard: boolean;
  cardNumber: string;
}
function TopUpTransaction({ card, isValidCard, cardNumber }: Props) {
  const [amount, setAmount] = useState(0);

  const [createTopUp, { data, loading: creating }] = useMutation(CREATE_TOPUP);

  const fundCard = () => {
    if (card?.checkCard && cardNumber) {
      createTopUp({ variables: { amount: amount, id: card?.checkCard?.id } });
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const transaction = data?.createTopUp;

  return (
    <>
      {card && isValidCard && (
        <Card className="mt-6">
          <CardContent className="mt-7">
            <div className="mb-4">
              <Input
                id="cardNumber"
                type="number"
                value={amount}
                onChange={handleAmountChange}
                placeholder="Цэнэглэх дүн оруулна уу"
                className="mt-1"
              />
            </div>

            <Button disabled={creating} onClick={fundCard}>
              Карт цэнэглэх
            </Button>
          </CardContent>
        </Card>
      )}
      {transaction && (
        <div className="w-full  h-full border mt-6 rounded-lg overflow-hidden">
          <div className="flex flex-col items-center justify-center  bg-background px-4  text-center md:px-16">
            <h3 className="font-urban text-2xl font-bold">
              {transaction?.description}
            </h3>
            {/* <p className="font-urban text-xl font-bold py-2">
        {transaction.amount} ₮{" "}
      </p> */}
          </div>
          <div className="w-full flex flex-col items-center justify-center py-4 border-b-2">
            {transaction && transaction?.image && (
              <Image
                className="w-auto h-auto"
                alt="QPay"
                height={200}
                width={200}
                src={`data:image/jpeg;base64,${transaction?.image}`}
              />
            )}
            {/* <p className="mt-2 font-bold flex gap-2">
        <span>
          <Icons.spinner className="animate-spin" />
        </span>
      </p> */}
          </div>
          <p className="font-urban text-xl font-bold text-center mt-4">
            Банкны аппликэйшн
          </p>
          <div className="grid grid-cols-4 gap-6 md:grid-cols-4 my-4 px-4">
            {transaction?.links?.map((e, index: number) => (
              <div
                key={index}
                className="rounded-lg  py-2 flex flex-col items-center"
              >
                <a href={e.link} className="text-blue-500 underline break-all">
                  <Image
                    width={12}
                    height={12}
                    src={e.logo}
                    alt="Logo"
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default TopUpTransaction;
