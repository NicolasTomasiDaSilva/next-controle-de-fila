import { useEffect, useRef, useState } from "react";

export function useCooldown(seconds: number) {
  const [cooldown, setCooldown] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCooldown = () => setCooldown(seconds);

  useEffect(() => {
    if (cooldown === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    if (cooldown > 0 && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [cooldown]);

  return { cooldown, startCooldown };
}
