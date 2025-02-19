"use client";
import { GET_CURRENT_CUSTOMER } from "@/graphql/query/customer";
import { Customer } from "@/lib/types";
import { useQuery } from "@apollo/client";
import Info from "./components/info/page";
import Info2 from "./components/info2/page";
import Loader from "@/components/shared/loader";

const Account = () => {
  const { data: { me: customer } = {}, loading } = useQuery<{ me: Customer }>(
    GET_CURRENT_CUSTOMER,
    { fetchPolicy: "cache-first" }
  );

  if (loading) return <Loader />;
  return (
    <div className="px-4">
      <Info customer={customer} />
      <Info2 customer={customer} />
    </div>
  );
};

export default Account;
