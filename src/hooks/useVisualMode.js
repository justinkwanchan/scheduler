import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Replace current dialogue with appropriate dialogue depending on what is clicked
   * Accounts for special cases where dialogues in history must be skipped
   */
  const transition = (next, replace = false) => {
    setMode(() => next);

    setHistory(prev => {
      return replace ? [...prev.slice(0, -1), next] : [...prev, next];
    });
  };

  // Go back one step in the dialogue history
  const back = () => {
    if (history.length > 1) {
      setMode(() => history[history.length - 2]);
      setHistory(prev => prev.slice(0, -1));
    }
  };

  return { mode, transition, back };
}
