"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Loader from "@/components/shared/loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MerchantProfile } from "./components/MerchantProfile";
import { MembershipCard } from "./components/MemberShipcard";
import TopUpTransaction from "./components/TopUpTransaction";
import useTopup from "@/hooks/useTopup";
import MemberTransactions from "./components/MemberTransactions";

function Domain() {
  const {
    loading,
    getting,
    data,
    navigation,
    handleCardNumberChange,
    cardNumber,
    setTab,
    tab,
    validateCardNumber,
    checking,
    branch,
    card,
    isValidCard,
  } = useTopup();

  if (loading || getting) return <Loader />;

  return (
    <div className="p-4 flex justify-center flex-col w-full items-center">
      <div className="max-w-4xl min-w-96">
        {data && <MerchantProfile branch={data?.getMerchantByDomain} />}

        <Card>
          <CardHeader>
            <CardTitle>Гишүүнчлэлийн карт</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                id="cardNumber"
                type="number"
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="Картын дугаараа оруулна уу"
                className="mt-1"
              />
            </div>

            <Button
              disabled={checking || !branch || !cardNumber}
              onClick={validateCardNumber}
            >
              Карт шалгах
            </Button>
          </CardContent>
        </Card>

        {card && isValidCard && <MembershipCard card={card?.checkCard} />}
        {card && isValidCard && (
          <nav className="overflow-x-auto border-b border-border mt-2">
            <div className="container mx-auto px-4">
              <div className="flex whitespace-nowrap">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    onClick={() =>
                      item?.path &&
                      setTab(item?.path as "topup" | "transaction")
                    }
                    className={`flex-shrink-0 px-4 py-2 text-sm font-medium cursor-pointer ${
                      item.path === tab
                        ? "border-b-2 border-primary text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-current={item.path === tab ? "page" : undefined}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </nav>
        )}
        {tab === "topup" && (
          <TopUpTransaction
            card={card}
            isValidCard={isValidCard}
            cardNumber={cardNumber}
          />
        )}
        {tab === "transaction" && card && (
          <MemberTransactions card={cardNumber} branch={branch} />
        )}
      </div>
    </div>
  );
}

export default Domain;
