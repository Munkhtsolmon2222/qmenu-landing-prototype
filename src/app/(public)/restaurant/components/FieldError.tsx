import { FieldError as FE } from "react-hook-form";

type Props = { error?: FE; className?: string };

export const FieldError = ({ error, className }: Props) => {
  if (!error?.message) return null;

  return (
    <span className={`text-xs mx-2 text-red-400 ${className}`}>
      {error.message}
    </span>
  );
};
