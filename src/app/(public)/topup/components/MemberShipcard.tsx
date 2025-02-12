import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { User, Wallet } from "lucide-react";
import { IMemberCard } from "@/lib/types";

interface Props {
  card: IMemberCard;
}
export const MembershipCard = (props: Props) => {
  const {
    card: { firstName, lastName, number, balance },
  } = props;
  return (
    <Card className="w-96 h-44 bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 overflow-hidden relative shadow-xl mt-6 ">
      <CardContent className="flex flex-col h-full justify-between p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span className="text-lg">{firstName}</span>
            <span className="text-lg">{lastName}</span>
          </div>
          <div className="text-xl tracking-wider">{number}</div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Wallet className="w-6 h-6" />
              <span className="text-sm">Данс</span>
            </div>
            <div className="text-xl font-semibold">₮ {balance.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
