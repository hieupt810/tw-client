'use client';

import { animate, useMotionValue } from 'motion/react';
import { useEffect, useState } from 'react';

export default function useAnimatedText(text: string) {
  const animatedCursor = useMotionValue(0);
  const [cursor, setCursor] = useState<number>(0);

  useEffect(() => {
    const control = animate(0, text.length, {
      duration: 3,
      ease: 'linear',
      onUpdate(latest) {
        setCursor(Math.floor(latest));
      },
    });

    return () => control.stop();
  }, [animatedCursor, text.length]);

  return text.slice(0, cursor);
}
