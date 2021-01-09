import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import SortableTable from "./components/SortableTable";
import NewSortableTable from "./components/SortableTable.new";

function App() {
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
