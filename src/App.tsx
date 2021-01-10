import React, { useEffect } from "react";
import Alert from "@material-ui/lab/Alert";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import Delete from "@material-ui/icons/Delete";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Box, { BoxProps } from "@material-ui/core/Box";
import SortableTable from "./components/SortableTable";
import NewSortableTable from "./components/SortableTable.new";
import { useTableRenderer } from "./components/useTableRenderer";
import { getData } from "./components/utils";
import { getFilterByName } from "./components/useArrayInputSearch";

const rows = getData().map((item, index) => ({ id: index + 1, ...item }));
function App() {
  const {
    isAllSelected,
    selectedItems,
    renderSearch,
    renderTableHead,
    renderTableBody,
    renderPagination,
  } = useTableRenderer(
    rows,
    [
      {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Dessert (100g serving)",
      },
      {
        id: "calories",
        numeric: true,
        disablePadding: false,
        label: "Calories",
      },
      { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
      { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
      {
        id: "protein",
        numeric: true,
        disablePadding: false,
        label: "Protein (g)",
      },
    ],
    { getSearchFilter: getFilterByName }
  );
  useEffect(() => {
    if (isAllSelected) {
      alert("Hey!");
    }
  }, [isAllSelected]);
  return (
    <main>
      <CssBaseline />
      <Slide bgcolor="grey.100">
        <Typography variant={"h4"} gutterBottom>
          Render Hook
        </Typography>
        <Paper>
          <Box px={2}>
            <Box py={2} display={"flex"} alignItems={"center"}>
              {renderSearch({ variant: "outlined" })}
              {selectedItems.length > 0 && (
                <Box ml={"auto"} display={"flex"} alignItems={"center"}>
                  <Typography>{selectedItems.length} Selected</Typography>
                  &nbsp; &nbsp;
                  <IconButton
                    onClick={() =>
                      alert(`Delete ${selectedItems.length} items!`)
                    }
                  >
                    <Delete />
                  </IconButton>
                </Box>
              )}
            </Box>
            <Alert>Hello World</Alert>
          </Box>
          <TableContainer>
            <Table>
              {renderTableHead()}
              {renderTableBody({
                columnMapping: {
                  0: (row) => (
                    <TableCell component="th" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                  ),
                  1: (row) => (
                    <TableCell align="right">{row.calories}</TableCell>
                  ),
                  2: (row) => <TableCell align="right">{row.fat}</TableCell>,
                  3: (row) => <TableCell align="right">{row.carbs}</TableCell>,
                  4: (row) => (
                    <TableCell align="right">{row.protein}</TableCell>
                  ),
                },
                appendRow: (item) => (
                  <Box p={2} m={2} bgcolor={"grey.100"}>
                    You need to eat carb {item.carbs} not protein {item.protein}
                  </Box>
                ),
              })}
            </Table>
          </TableContainer>
          {renderPagination()}
        </Paper>
      </Slide>
      <Slide>
        <Typography variant={"h4"} gutterBottom>
          Abstract logic to Hooks
        </Typography>
        <NewSortableTable searchable />
      </Slide>
      <Slide bgcolor="grey.100">
        <Typography variant={"h4"} gutterBottom>
          The usual way
        </Typography>
        <SortableTable searchable />
      </Slide>
    </main>
  );
}

function Slide({
  children,
  ...props
}: { children: NonNullable<React.ReactNode> } & BoxProps) {
  return (
    <Box
      minHeight={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      {...props}
    >
      <Container>{children}</Container>
    </Box>
  );
}

export default App;
