import React from "react";
import { render, screen } from "@testing-library/react";
import SortableTable from "./SortableTable";
import userEvent from "@testing-library/user-event";

import { getData } from "./utils";

const data = getData();

describe("SortableTable", () => {
  const getFirstRow = () => screen.getAllByTestId("table-row")[0];
  it("renders without clash", () => {
    expect(() => render(<SortableTable />)).not.toThrow();
  });

  it("show 5 rows as default", () => {
    render(<SortableTable />);
    expect(screen.getAllByTestId("table-row").length).toEqual(5);
  });

  it("row can be selected", () => {
    render(<SortableTable />);
    expect(getFirstRow()).toHaveAttribute("aria-checked", "false");
    userEvent.click(getFirstRow());
    expect(getFirstRow()).toHaveAttribute("aria-checked", "true");
  });

  it("select all rows", () => {
    render(<SortableTable />);
    userEvent.click(screen.getByLabelText("select all desserts"));
    const rows = screen.getAllByTestId("table-row");
    rows.forEach((row) => {
      expect(row).toHaveAttribute("aria-checked", "true");
    });
  });

  it("can go to next/previous page", () => {
    render(<SortableTable />);
    screen.getByText(data[0].name);
    expect(screen.queryByText(data[5].name)).toBeNull();

    userEvent.click(screen.getByLabelText('Next page'))
    screen.getByText(data[5].name);
    expect(screen.queryByText(data[0].name)).toBeNull();

    userEvent.click(screen.getByLabelText('Previous page'))
    screen.getByText(data[0].name);
    expect(screen.queryByText(data[5].name)).toBeNull();
  });
});
