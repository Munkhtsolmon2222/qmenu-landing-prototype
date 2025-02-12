"use client";
import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format, parse } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordin";

import { useLazyQuery } from "@apollo/client";
import { GET_CARD_ORDERS } from "@/graphql/query";

interface Props {
  card: string;
  branch: string;
}

type DateRangeString = {
  startDate: string;
  endDate: string;
};
export default function MemberTransactions(props: Props) {
  const { card, branch } = props;
  const [dateRange, setDateRange] = useState<DateRangeString>({
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  });

  const [getCardOrders, { data, loading }] = useLazyQuery(GET_CARD_ORDERS);

  useEffect(() => {
    if (dateRange)
      getCardOrders({
        variables: {
          number: card,
          branch,
          startDate: dateRange?.startDate,
          endDate: dateRange?.endDate,
        },
      });
  }, [dateRange, branch, card, getCardOrders]);

  const handleDateSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setDateRange({
        startDate: format(range.from, "yyyy-MM-dd"),
        endDate: range.to
          ? format(range.to, "yyyy-MM-dd")
          : format(range.from, "yyyy-MM-dd"),
      });
    }
  };

  return (
    <Card className="w-full  mt-6">
      <CardHeader></CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.startDate === dateRange.endDate
                  ? dateRange.startDate
                  : `${dateRange.startDate} - ${dateRange.endDate}`}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={parse(
                  dateRange.startDate,
                  "yyyy-MM-dd",
                  new Date()
                )}
                selected={{
                  from: parse(dateRange.startDate, "yyyy-MM-dd", new Date()),
                  to: parse(dateRange.endDate, "yyyy-MM-dd", new Date()),
                }}
                onSelect={handleDateSelect}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {loading ? (
            <div className="text-center py-4">Уншиж байна...</div>
          ) : data?.getCardOrders?.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {data?.getCardOrders?.map((transaction) => (
                <AccordionItem
                  key={transaction.id}
                  value={`transaction-${transaction.id}`}
                >
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex justify-between items-center w-full">
                      <div className="text-left">
                        <p className="font-semibold">
                          Захиалгын дугаар: {transaction.number}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(transaction.completedAt, "yyyy-MM-dd:hh:ss")}
                        </p>
                      </div>
                      <span>₮ {transaction.grandTotal.toLocaleString()}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {transaction.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center text-sm"
                        >
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>₮ {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-4">Захиалга олдсонгүй</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
