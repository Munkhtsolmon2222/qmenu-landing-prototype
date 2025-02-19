"use client";
import { SHAPE_TYPES, Table } from "@/lib/types";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/shared/icons";
import Info from ".";

interface Props {
  item: Table;
  onClick: () => void;
  selected: boolean;
  guests: number;
  inputGuest: number;
  hideGuests?: boolean;
}

const TableShape: React.FC<Props> = ({
  guests,
  item: { shape, name, remained, min, max },
  onClick,
  selected,
  inputGuest,
  hideGuests,
}) => {
  const className =
    min > inputGuest
      ? // || max < inputGuest
        Info.full.childClassName
      : selected
      ? Info.selected.childClassName
      : remained > 0
      ? Info.empty.childClassName
      : Info.full.childClassName;

  const style = useMemo(() => {
    if (shape.type === SHAPE_TYPES.RECT) {
      return {
        wrapper: {
          left: shape.x,
          top: shape.y,
          height: shape.height,
          width: shape.width,
        },
        style: {
          transformOrigin: "top left",
          transform: `rotate(${shape.rotation}deg)`,
          clipPath: "inset(0px 0px 0px 0px round 10px)",
          borderRadius: "10px",
        },
      };
    }
    if (shape.type === SHAPE_TYPES.CIRCLE) {
      return {
        wrapper: {
          left: shape.x - shape.radius,
          top: shape.y - shape.radius,
          height: shape.radius * 2,
          width: shape.radius * 2,
        },
        style: {
          borderRadius: "50%",
          clipPath: "circle(50% at center)",
        },
      };
    }
    return { wrapper: {}, style: {} };
  }, [shape]);

  return (
    <div
      className="bg-primary-foreground absolute p-1.5 cursor-pointer"
      style={style.wrapper}
    >
      <div
        onClick={onClick}
        style={style.style}
        className={cn(
          "bg-background w-full h-full flex flex-col items-center justify-center",
          className
        )}
      >
        <div className="text-sm text-white leading-3">{name}</div>
        {!hideGuests && (
          <>
            {guests < 1 && (
              <div className="text-xs opacity-90 text-white">
                {min} - {max}
              </div>
            )}
            {guests > 0 && (
              <div className="flex items-center justify-center gap-0.5">
                <div className="text opacity-80 text-white">{guests}</div>
                <Icons.user className="w-3.5 h-3.5 text-white" />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TableShape;
