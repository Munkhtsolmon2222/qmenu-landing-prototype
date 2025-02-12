import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/use-media-query";
import { PAGE_PROFILE } from "@/lib/config/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@apollo/client";
import { Customer } from "@/lib/types";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import SelectLanguage from "@/components/ui/selectLanguage";
import { useRouter } from "next/navigation";
function ProfileButtons() {
  const { device } = useMediaQuery();
  const { data: { me: customer } = {}, loading } = useQuery<{
    me: Customer;
  }>(GET_CURRENT_CUSTOMER, { fetchPolicy: "cache-first" });
  const router = useRouter();

  return (
    <div className="flex items-center justify-between gap-4 w-max">
      <div className="mr-2">
        <SelectLanguage />
      </div>
      {device !== "mobile" && (
        <Icons.notePad
          className="h-6 w-6 cursor-pointer text-current"
          onClick={() => router.push("/orders")}
        />
      )}
      {device !== "mobile" && (
        <Button
          className="rounded-full bg-transparent hover:bg-transparent"
          onClick={() => router.push(PAGE_PROFILE)}
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback
              className={` text-xs ${
                !loading ? "bg-current text-white" : "bg-primary-foreground"
              }`}
            >
              {(customer?.firstName ?? "").slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      )}
    </div>
  );
}

export default ProfileButtons;
