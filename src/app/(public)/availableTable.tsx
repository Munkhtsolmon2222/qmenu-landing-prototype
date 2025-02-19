"use client";
import { BranchDetail } from "@/lib/types";
import { useTranslation } from "react-i18next";
interface Props {
  place: BranchDetail;
  services: boolean;
}
export const AvailableTable = (props: Props) => {
  const { place } = props;
  const { t } = useTranslation();
  const getAvailable = () => {
    if (!place?.tableInfo) return;
    const seated = place.tableInfo.seated || 0;
    const available = place.tableInfo.available || 0;

    if (seated === 0 && available === 0) return;
    return available;
  };

  return (
    <div>
      <div className="rounded-sm text-xs text-white font-semibold  backdrop-brightness-50 px-1">
        {getAvailable()
          ? t("Available table") + ":" + getAvailable()
          : t("BranchOpen")}
      </div>
    </div>
  );
};
