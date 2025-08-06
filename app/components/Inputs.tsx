import type { InputHTMLAttributes, JSX } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
const basesClass = (error: string) => {
  return `mt-1 w-full rounded border py-2 px-2 sm:text-sm text-gray-700
          ${error ? "border-red-500" : "border-border"}
          dark:text-gray-200 disabled:bg-gray-500/15 placeholder:text-sm`;
};
type CommonInputsProps = {
  label?: string;
  register?: UseFormRegisterReturn;
  error?: string;
};
type InputProps = CommonInputsProps &
  InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
export const Input = ({
  label,
  id,
  register,
  error,
  ref,
  ...inputProps
}: InputProps): JSX.Element => {
  return (
    <label htmlFor={id}>
      <span
        className={`text-sm font-medium text-gray-700 dark:text-gray-200 ${
          !label && "sr-only"
        }`}
      >
        {label}
      </span>

      <input
        ref={ref}
        id={id}
        className={`${basesClass(error ?? "")}`}
        {...inputProps}
        {...register}
      />
      {error && (
        <span className="block mt-0.5 text-red-500 text-xs dark:text-red-400">
          {error}
        </span>
      )}
    </label>
  );
};
