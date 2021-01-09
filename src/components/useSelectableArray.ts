import { useState } from "react";

export const useSelectableArray = <T>(
  items: T[],
  predicate: (selectedItem: T, item: T) => boolean
) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);

  return {
    selectedItems,
    onToggle: (item: T) => {
      if (selectedItems.find((selectedItem) => predicate(selectedItem, item))) {
        setSelectedItems((prevState) =>
          prevState.filter((selectedItem) => !predicate(selectedItem, item))
        );
      } else {
        setSelectedItems((prev) => [...prev, item]);
      }
    },
    onToggleAll: () => {
      if (!selectedItems.length) {
        setSelectedItems(items);
      } else {
        setSelectedItems([])
      }
    },
  };
};

export const isSameItem = <T extends { name: string }>(
  selectedItem: T,
  item: T
) => selectedItem.name === item.name;
