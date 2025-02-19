"use client";
import { QMENU_URL } from "@/lib/config/constant";
import { PAGE_NOT_FOUND } from "@/lib/config/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
const Qr = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    const type = searchParams.get("type");

    if (!id) router.push(PAGE_NOT_FOUND);

    let url = QMENU_URL + "/" + id;

    if (token && type) {
      url = url + "?token=" + token + "&type=" + type;
    }

    window.location.assign(url);
  }, [id, searchParams, router]);

  return (
    <>
      <div></div>
    </>
  );
};

export default Qr;
