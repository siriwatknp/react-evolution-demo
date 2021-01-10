import { useState } from "react";

export const useArrayInputSearch = <T>(
  items: T[],
  getPredicate: (text: string) => (value: T, index: number) => boolean
) => {
  const [text, setText] = useState("");

  return {
    text,
    setText,
    result: items.filter(getPredicate(text)),
  };
};

export const getFilterByName = (text: string) => <T extends { name: string }>(
  item: T
) => item.name.toLowerCase().includes(text.toLowerCase());

export const getFilterById = (text: string) => <
  T extends { id: string | number }
>(
  item: T
) => item.id.toString().toLowerCase().includes(text.toLowerCase());
