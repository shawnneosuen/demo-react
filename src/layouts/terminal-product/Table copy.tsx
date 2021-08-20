import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import * as api from "boot/api";

const queryData = async () => {
  let sql = "SELECT * FROM UACS_SCHEDULE_COIL";
  try {
    let data = await api.query(sql);
    return data;
  } catch (e) {
    throw e;
  }
};

interface RowDataModel {
  make: string;
  model: string;
  price: number;
}

const Table = () => {
  let initialRowDataModel = {
    make: "Toyota",
    model: "Celica",
    price: 35000,
  };
  const [rowData, setRowData] = useState([
    { make: "China", model: "China", price: 2000 },
  ]);

  console.log(rowData);

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact rowData={rowData}>
        <AgGridColumn field="make"></AgGridColumn>
        <AgGridColumn field="model"></AgGridColumn>
        <AgGridColumn field="price"></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default Table;
