import { ReactNode } from "react";
import { Translate } from "react-auto-translate";
import { categoryItems } from "@/lib/config/constant";
import Image from "next/image";
interface Props {
  name: ReactNode;
  icon: string;
}

function CategoryCard(props: Props) {
  const { icon, name } = props;
  const Icon = categoryItems[icon];

  if (!Icon) return;

  return (
    <div className="p-1 z-50 text-sm md:text-base  ">
      <div className="rounded-lg flex justify-center secondary-text items-center">
        <Image
          width={40}
          height={40}
          className="flex items-center"
          alt={icon}
          src={Icon}
        />
      </div>
      <p className="text-nowrap text-[13px] gap-3 flex text-center">
        <Translate>{name}</Translate>
      </p>
    </div>
  );
}

export default CategoryCard;
