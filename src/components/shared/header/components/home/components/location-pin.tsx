import { Icons } from "../../../../icons";
import { useRouter } from "next/navigation";
export function LocationPin() {
  const router = useRouter();
  return (
    <div
      className={`flex flex-row  h-max  rounded-full   bg-primary-foreground justify-between items-center  relative border-[1px] p-2 cursor-pointer gap-1`}
      onClick={() => router.push("/map")}
    >
      <Icons.pin className="h-6 w-6" />
    </div>
  );
}
