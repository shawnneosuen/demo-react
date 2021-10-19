import { Button, TextField } from "@material-ui/core";
import { useAppSelector } from "app/hook";
import { StockSaddle } from "boot/model";
import BaseEditDrawContent, {
  BaseEditDrawContentProps,
} from "components/DrawerContent/BaseEditDrawContent";
import MySelect from "components/MySelect";
import VirtualScrollSelect from "components/MySelect/VirtualScrollSelect";
import React, { useEffect, useState } from "react";

interface Props extends BaseEditDrawContentProps {
  open?: boolean | undefined;
}

const Index = ({ open, onOpen }: Props) => {
  const bayIds = useAppSelector((state) => state.yard).bayIds;
  const bays = useAppSelector((state) => state.yard).bays;
  const [bayId, setBayId] = useState<string>();
  const [stockOptions, setStockOptions] = useState<string[]>([]);
  const [stock, setStock] = useState<string>();
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
    if (stock) {
    }
  };
  return (
    <div>
      <BaseEditDrawContent open={open} onOpen={onOpen} title={"修改停车位"}>
        <div style={{ marginTop: 40 }}>
          <MySelect
            label={"跨号"}
            style={{ marginBottom: 20 }}
            options={bayIds}
            onSelect={setBayId}
          ></MySelect>
          <VirtualScrollSelect
            label={"库位"}
            options={stockOptions}
            onSelect={setStock}
          ></VirtualScrollSelect>
        </div>
      </BaseEditDrawContent>
    </div>
  );
};

export default Index;
