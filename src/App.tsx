import React from "react";
import Alert from "@material-ui/lab/Alert";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import SortableTable from "./components/SortableTable";
import NewSortableTable, { headCells } from "./components/SortableTable.new";
import { useTableRenderer } from "./components/useTableRenderer";
import { getData } from "./components/utils";

const rows = getData();
function App() {
  const {
    renderSearch,
    renderTableHead,
    renderTableBody,
    renderPagination,
  } = useTableRenderer(rows, headCells);
  return (
    <main>
      <CssBaseline />
      <Box
        height={"100vh"}
        bgcolor={"common.white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Container>
          <Box mb={2}>
            <Box py={2}>{renderSearch({ variant: "outlined" })}</Box>
            <Alert>Hello World</Alert>
            <TableContainer>
              <Table>
                {renderTableHead()}
                {renderTableBody()}
                <Box bgcolor={"primary.light"}>{renderPagination()}</Box>
              </Table>
            </TableContainer>
          </Box>
          <NewSortableTable searchable />
        </Container>
      </Box>
      <Box
        height={"100vh"}
        bgcolor={"grey.100"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Container>
          <SortableTable searchable />
        </Container>
      </Box>
    </main>
  );
}

export default App;
