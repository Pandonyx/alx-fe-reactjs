import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(0);

  return (
    <div style={{ display: "grid", gap: "0.75rem", maxWidth: 280 }}>
      <p aria-live='polite'>Current Count: {count}</p>

      <button
        type='button'
        onClick={increment}>
        Increment
      </button>
      <button
        type='button'
        onClick={decrement}>
        Decrement
      </button>
      <button
        type='button'
        onClick={reset}>
        Reset
      </button>
    </div>
  );
}
