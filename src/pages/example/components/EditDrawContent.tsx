import { Button, TextField } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "app/hook";
import { Coil, StockSaddle } from "boot/model";
import BaseEditDrawContent, {
  BaseEditDrawContentProps,
} from "components/DrawerContent/BaseEditDrawContent";
import MySelect from "components/MySelect";
import VirtualScrollSelect from "components/MySelect/VirtualScrollSelect";
import { useStatusContext } from "context/BasePageStatus";
import { DialogModelProps } from "context/model";
import { updateCoil } from "features/coil/coilSlice";
import React, { useEffect, useState } from "react";
interface Props extends BaseEditDrawContentProps {
  open?: boolean | undefined;
  value?: any;
}

const Index = ({ open, onOpen, value }: Props) => {
  const bayIds = useAppSelector((state) => state.yard).bayIds;
  const bays = useAppSelector((state) => state.yard).bays;
  const [bayId, setBayId] = useState<string>();
  const [stockOptions, setStockOptions] = useState<string[]>([]);
  const [stock, setStock] = useState<string>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (bayId) {
      console.log(bayId);

      const bay =
        bays[bayIds.findIndex((bayIdTemp: string) => bayIdTemp === bayId)];
      setStockOptions(
        bay.stockSaddles.map((stockSaddle: StockSaddle) => stockSaddle.id)
      );
    }
  }, [bayId]);
  const onConfirm = () => {
    let dialogModelTemp: DialogModelProps = {
      title: "cofirm-product-dialog",
      header: "确认钢卷信息",
      open: true,
      msg: `确认是否修改产品${value[0].MAT_NO}的鞍座号为${stock}？`,
      actions: [
        () => {
          if (stock) {
            let coilTemp: Coil;
            coilTemp = JSON.parse(JSON.stringify(value[0]));
            coilTemp.ST_NO = stock;
            dispatch(updateCoil(coilTemp));
          }
        },
      ],
    };
    handleDialogModel(dialogModelTemp);
  };

  const { dialogModel, handleDialogModel } = useStatusContext();

  return (
    <div>
      <BaseEditDrawContent
        open={open}
        onOpen={onOpen}
        title={"修改停车位"}
        onConfirm={onConfirm}
      >
        <div style={{ marginTop: 40 }}>
          <MySelect
            label={"跨号"}
            style={{ marginBottom: 20 }}
            options={bayIds}
            value={bayId}
            onSelect={setBayId}
            init={!open}
          ></MySelect>
          <VirtualScrollSelect
            label={"库位"}
            options={stockOptions}
            value={stock}
            init={!open}
            onSelect={setStock}
          ></VirtualScrollSelect>
        </div>
      </BaseEditDrawContent>
    </div>
  );
};

export default Index;
