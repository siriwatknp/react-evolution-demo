import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { getComparator, stableSort } from "./utils";
import { getFilterById, useArrayInputSearch } from "./useArrayInputSearch";
import { isSameItemById, useSelectableArray } from "./useSelectableArray";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TablePagination from "@material-ui/core/TablePagination";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

type Order = "asc" | "desc";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

interface HeadCell<T extends { id: string | number }> {
  disablePadding: boolean;
  id: keyof T;
  label: string;
  numeric: boolean;
}

export const useTableRenderer = <T extends { id: string | number }>(
  rows: T[],
  headCells: HeadCell<T>[],
  options: {
    initialOrderBy?: keyof T;
    getSearchFilter?: (text: string) => (item: T) => boolean;
  } = {}
) => {
  const {
    initialOrderBy = headCells[0].id,
    getSearchFilter = getFilterById,
  } = options;
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState(initialOrderBy);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { result, text, setText } = useArrayInputSearch(rows, getSearchFilter);
  const { selectedItems, onToggle, onToggleAll } = useSelectableArray(
    rows,
    isSameItemById
  );
  const selected = selectedItems.map(({ id }) => id);
  const numSelected = selected.length;
  const rowCount = rows.length;
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof T
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const createSortHandler = (property: keyof T) => (
    event: React.MouseEvent<unknown>
  ) => {
    handleRequestSort(event, property);
  };
  const isSelected = (id: string | number) => selected.indexOf(id) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, result.length - page * rowsPerPage);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return {
    selectedItems,
    renderSearch: (props: Omit<TextFieldProps, "value" | "onChange">) => (
      <TextField
        placeholder={"Search..."}
        label={"Search"}
        {...props}
        value={text}
        onChange={(event) => {
          setText(event.target.value);
        }}
      />
    ),
    renderTableHead: () => (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onToggleAll}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id.toString()}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    ),
    renderTableBody: ({
      columnMapping,
    }: {
      columnMapping: { [k: number]: (item: T) => React.ReactNode };
    }) => (
      <TableBody>
        {stableSort(result, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                data-testid={"table-row"}
                hover
                onClick={() => onToggle(row)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </TableCell>
                {headCells.map((head, index) => columnMapping[index](row))}
              </TableRow>
            );
          })}
        {emptyRows > 0 &&
          [...Array(emptyRows)].map((_, index) => (
            <TableRow key={index} style={{ height: 53 }}>
              <TableCell colSpan={6} />
            </TableRow>
          ))}
      </TableBody>
    ),
    renderPagination: () => (
      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        SelectProps={{
          "aria-label": "pick amount of rows per page",
        }}
      />
    ),
  };
};
