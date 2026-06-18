import { useState, useEffect, useRef } from 'react';

/**
 * Animates a number from 0 up to `end` over `duration` ms using requestAnimationFrame.
 * Used by stat cards to give numbers a sense of motion when they enter the viewport.
 */
function useCountUp(end, duration = 1800) {
  const [count, setCount] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    const startTime = performance.now();
    const endValue = parseFloat(end);

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic, feels less mechanical
      setCount(Math.floor(endValue * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setCount(endValue);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [end, duration]);

  return count;
}

export default useCountUp;
