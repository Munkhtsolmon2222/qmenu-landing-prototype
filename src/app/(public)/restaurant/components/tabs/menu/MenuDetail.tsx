import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
type Props = {
  className?: string;
  count: number;
};

export const MenuDetail: React.FC<Props> = ({ className, count = 0 }) => {
  const { t } = useTranslation();
  return (
    <div
      className={cn(
        "my-2 flex justify-between w-full items-center gap-2",
        className
      )}
    >
      <div className="flex gap-2">
        <div className="font-medium">{t("Menu")}</div>
        <div className="text-current-2">
          ({count} {t("Product")})
        </div>
      </div>
    </div>
  );
};
