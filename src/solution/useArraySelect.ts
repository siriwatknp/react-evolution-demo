import { useState } from "react";

export const useArraySelect = <T>(
  items: T[],
  identifier: (item: T, selected: T) => boolean
) => {
  const [selectedItems, setSelectedItems] = useState<T[]>([]);
  return {
    isAllSelected: items.length === selectedItems.length,
    selectedItems,
    unselectedItems: items.filter((item) => {
      return !selectedItems.find((selected) => identifier(item, selected));
    }),
    onToggleAll: (deselected: boolean) => {
      setSelectedItems(deselected ? [] : items);
    },
    onToggle: (item: T) => {
      setSelectedItems((prevState) => {
        const newItems = prevState.filter(
          (selected) => !identifier(item, selected)
        );
        if (newItems.length === prevState.length) {
          newItems.push(item);
        }
        return newItems;
      });
    },
    checkSelected: (item: T) =>
      !!selectedItems.find((selected) => identifier(item, selected)),
  };
};
