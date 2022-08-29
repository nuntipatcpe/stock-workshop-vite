import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect } from "react";
import { server } from "../../../Constants";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "NAME", width: 130 },
  { field: "price", headerName: "PRICE", width: 130 },
  { field: "stock", headerName: "STOCK", width: 130 },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function Stock() {
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    // axios.get("http://localhost:8085/api/v2/stock/product").then((result) => {
    //   console.log(result.status);

    //   // setRows(result.data);
    // });
    axios
      .get("http://localhost:8085/api/v2/stock/product")
      .then((res) => setRows(res.data));
    // fetchdata();
    // fetch("http://localhost:8085/api/v2/stock/product").then((result) => {
    //   // setRows(result.data);
    //   console.log(result);
    // });
  }, []);

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
