import React from "react";
import * as api from "boot/api";

const queryData = async () => {
  let sql = "SELECT * FROM UACS_SCHEDULE_COIL";
  try {
    let data = await api.query(sql);
  } catch (e) {
    throw e;
  }
};

const TerminalProduct = () => {
  queryData();
  return (
    <div>
      <h1>Terminal Product</h1>
    </div>
  );
};

export default TerminalProduct;
