import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  speed?: number; // ms per character
  enabled?: boolean;
  catchUpThreshold?: number; // chars behind before speeding up
}

export function useTypewriter(
  fullText: string,
  options: UseTypewriterOptions = {}
) {
  const { speed = 15, enabled = true, catchUpThreshold = 50 } = options;
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    if (!enabled) {
      // When disabled, show all text immediately
      setDisplayedText(fullText);
      indexRef.current = fullText.length;
      return;
    }

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
      }

      const elapsed = currentTime - lastTimeRef.current;
      const charsRemaining = fullText.length - indexRef.current;

      // Calculate dynamic speed - speed up if falling behind
      let effectiveSpeed = speed;
      if (charsRemaining > catchUpThreshold) {
        // Progressively speed up based on how far behind we are
        const catchUpFactor = Math.min(charsRemaining / catchUpThreshold, 5);
        effectiveSpeed = speed / catchUpFactor;
      }

      // Add slight randomization for natural feel (±30%)
      const variance = effectiveSpeed * 0.3;
      const randomizedSpeed = effectiveSpeed + (Math.random() * variance * 2 - variance);

      if (elapsed >= randomizedSpeed && indexRef.current < fullText.length) {
        indexRef.current++;
        setDisplayedText(fullText.slice(0, indexRef.current));
        lastTimeRef.current = currentTime;
      }

      if (indexRef.current < fullText.length) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    // Start animation if there's more to show
    if (indexRef.current < fullText.length) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [fullText, speed, enabled, catchUpThreshold]);

  // Reset when fullText is cleared (new conversation)
  useEffect(() => {
    if (fullText === "") {
      indexRef.current = 0;
      setDisplayedText("");
      lastTimeRef.current = 0;
    }
  }, [fullText]);

  const isTyping = enabled && indexRef.current < fullText.length;

  return { displayedText, isTyping };
}
