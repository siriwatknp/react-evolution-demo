import React, { useState } from "react";

export const useArrayTextSearch = <T>(
  items: T[],
  identifier: (item: T, keyword: string) => boolean
) => {
  const [keyword, setKeyword] = useState("");

  return {
    result: items.filter((item) => identifier(item, keyword)),
    keyword,
    onInputChange: (
      event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => setKeyword(event.target.value),
    onClear: () => setKeyword(""),
  };
};
