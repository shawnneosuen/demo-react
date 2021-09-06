import React, { useState } from "react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import * as api from "boot/api";
import { stringify } from "qs";
import { TransferWithinAStationSharp } from "@material-ui/icons";

interface Props {}
interface Model {
  MAT_NO: string;
}
interface State {
  rowData: Model[];
}
export default class Tabel extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { rowData: [] };
  }

  async queryData() {
    let sql = "SELECT MAT_NO FROM UACS_SCHEDULE_COIL";
    try {
      let data = await api.query(sql);
      return JSON.stringify(data);
      console.log('data1', data)
    } catch (e) {
      throw e;
    }
  }

  async componentDidMount() {
    let data: [];
    data = JSON.parse(await this.queryData());
    if (data && data?.length) {
      let dataGroup: Model[] = [];
      console.log("data2", data);

      (await data).forEach((temp: string[]) => {
        console.log("temp", temp);

        let rowModelTemp: Model = { MAT_NO: "" };
        rowModelTemp.MAT_NO = temp[0];
        dataGroup.push(rowModelTemp);
      });
      this.setState({ rowData: dataGroup });
    }
    console.log(this.state.rowData);
  }

  render() {
    return (
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact rowData={this.state.rowData}>
          <AgGridColumn field="MAT_NO"></AgGridColumn>
        </AgGridReact>
      </div>
    );
  }
}
