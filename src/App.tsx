import React from "react";
import Alert from "@material-ui/lab/Alert";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box, { BoxProps } from "@material-ui/core/Box";
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
      <Slide bgcolor="grey.100">
        <Typography variant={"h4"} gutterBottom>
          Render Hook
        </Typography>
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
