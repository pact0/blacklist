import React from "react";

import { FloatingLabelInput } from "@/components/ui/floating-label-input";

export default function DebouncedInputFloatingLabel({
  value: initialValue,
  onChange,
  label,
  debounce = 400,
  ...props
}: {
  value: string | number;
  label: string;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <FloatingLabelInput
      label={label}
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
