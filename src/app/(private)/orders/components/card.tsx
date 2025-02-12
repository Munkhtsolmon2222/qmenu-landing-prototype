import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { ORDER_STATES } from "@/lib/config/constant";
import { Order, OrderState } from "@/lib/types";
import restaurant from "@/assets/images/restaurant.png";

interface Props {
  order: Order;
}
export default function OrderCard(props: Props) {
  const { order } = props;

  return (
    <div className="flex flex-col ">
      <Card className="p-3">
        <CardHeader className="flex flex-row items-end justify-between px-0 pb-3 pt-0">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                alt="AI Assistant"
                src={
                  typeof order?.branch.logo === "string"
                    ? order?.branch.logo
                    : restaurant.src
                }
              />

              <AvatarFallback>
                {order?.branch?.name.split("", 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{order?.branch?.name}</h3>
              <p className="text-gray-400 ">
                Захиалагын дугаар: <span className="">{order?.number}</span>
              </p>
            </div>
          </div>
          <p className="text-gray-400 ">{order?.date}</p>
        </CardHeader>
        <div className="w-full h-[2px] border-b"></div>
        <CardContent className="p-0 flex flex-row w-full justify-between items-center pt-2">
          <div className="flex  flex-col gap-2">
            <p className="text-gray-400 ">Захиалагын төлөв:</p>
            <div className="text-white text-center leading-0 h-max  flex items-center justify-center bg-gray-400 rounded-md pb-[0.1rem] ">
              <p className="leading-0">
                {ORDER_STATES.get(
                  (order?.state as OrderState) ?? OrderState.BOOKED
                )}
              </p>
            </div>
          </div>
          <div className="flex  flex-col gap-2 items-end justify-end">
            <p className="text-gray-400 ">Нийт дүн:</p>
            <div className="flex items-end justify-end">
              {order?.grandTotal} MNT
              <span className="ml-2 text-gray-400">
                ({order?.items?.length})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function ArrowRightIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export function BarChartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

export function BriefcaseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
  );
}

export function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

export function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
