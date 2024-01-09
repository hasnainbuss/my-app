import { useEffect, useState } from "react";
import { DEFAULT_DEBOUNCE_DELAY_INTERVAL_MS } from "../../../Constants";

export default function useDebounce(
  value: any,
  delay = DEFAULT_DEBOUNCE_DELAY_INTERVAL_MS
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
