import React, { useEffect, useState } from "react";

/**
 * same as useState but with saving the state to local storage
 *
 * @param key key of the local storage
 * @param init starting value if not exsists
 * @returns a value and setter same as useState
 */
export default function useLocalStorage<T>(
  key: string,
  init: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const oldValue = localStorage.getItem(key);

    if (oldValue) return JSON.parse(oldValue) as T;

    localStorage.setItem(key, JSON.stringify(init));
    return init;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
