"use client";
import OrderDialog from "@/components/modal/OrderDialog/page";
import { PAGE_ORDER, PAGE_PAYMENT, PAGE_RESTAURANT } from "@/lib/config/page";
import { useRestaurantStore } from "@/lib/providers/restaurant";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export const OrderDialogRestaurant: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { current } = useRestaurantStore();
  const router = useRouter();
  const pathname = usePathname();

  const lastPage = pathname.split("/");
  const isOrder =
    lastPage[lastPage.length - 2] === PAGE_ORDER ||
    lastPage[lastPage.length - 1] === PAGE_ORDER;
  const isPayment = lastPage[lastPage.length - 2] === PAGE_PAYMENT;

  const onClose = () => router.push(`${PAGE_RESTAURANT}/${current?.id}`);
  const visible = isOrder || isPayment;

  return (
    <OrderDialog visible={visible} onClose={onClose}>
      {children}
    </OrderDialog>
  );
};
