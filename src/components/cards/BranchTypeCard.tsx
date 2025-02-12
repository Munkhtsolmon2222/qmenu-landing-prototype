import { ReactNode } from "react";

interface Props {
  name: string;
  icon: ReactNode;
  active?: boolean;
  plain?: boolean;
}
function BranchTypeCard(props: Props) {
  const { icon, name, active } = props;

  return (
    <div
      className={`rounded-full  flex items-center justify-center border px-5 py-2  gap-1  text-sm md:text-base  ${
        active ? "bg-current text-background" : "bg-current-1"
      }`}
    >
      <div className={`${active && "[&>*]:fill-primary-foreground "} `}>
        {icon}
      </div>
      <p className="text-center font-semibold text-nowrap">{name}</p>
    </div>
  );
}

export default BranchTypeCard;
