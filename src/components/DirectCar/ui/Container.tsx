import React, { useState, useEffect } from "react";
import { DirectCarItem } from "./Item";
import { useKeyPress } from "./useKeyPress";
import "./DirectCar.scss";

interface IContainerProps {
  items: Record<string, any>;
  updateData: (data: any) => void;
}

const Container = ({ items, updateData }: IContainerProps) => {
  const [selected, setSelected] = useState({});
  const downPress = useKeyPress("ArrowRight");
  const upPress = useKeyPress("ArrowLeft");
  const tabPress = useKeyPress("Tab");
  const enterPress = useKeyPress("Enter");
  const [cursor, setCursor] = useState(-1);

  const pivot = "make";
  const tradeTypeItem = items[selected[pivot]];

  useEffect(() => {
    if (tradeTypeItem && downPress) {
      setCursor(prevState =>
        prevState < tradeTypeItem.length ? prevState + 1 : prevState
      );
    }
  }, [downPress, tradeTypeItem]);

  useEffect(() => {
    if (tradeTypeItem && upPress) {
      setCursor(prevState => (prevState > 0 ? prevState - 1 : prevState));
    }
  }, [upPress, tradeTypeItem]);

  useEffect(() => {
    if (tradeTypeItem && enterPress) {
      const isValid = !tradeTypeItem
        .filter((prop: any) => prop.required === "true")
        .map((prop: any) => prop.name)
        .filter((required: any) => !Object.keys(selected).includes(required))
        .length;

      if (isValid) {
        updateData(selected);
        setCursor(0);
        setSelected({});
      }
    }
  }, [enterPress]);

  useEffect(() => {
    if (tradeTypeItem && tabPress) {
      setCursor(prevState => prevState > -1 && prevState + 1);
    }
  }, [tabPress, tradeTypeItem]);

  const setTrade = (item: Record<string, string>) => {
    setSelected({ ...selected, ...item });
  };

  return (
    <div className={"direct-car"} onMouseLeave={() => setCursor(-1)}>
      <DirectCarItem
        key={0}
        index={0}
        active={0 === cursor}
        item={{
          name: pivot,
          required: true,
          data: Object.keys(items).map(item => ({ name: item }))
        }}
        setTrade={setTrade}
        setHovered={setCursor}
      />

      {tradeTypeItem &&
        tradeTypeItem.map((tradeName: any, i: number) => {
          return (
            <DirectCarItem
              key={i + 1}
              index={i + 1}
              active={i + 1 === cursor}
              item={tradeName}
              setTrade={setTrade}
              setHovered={setCursor}
            />
          );
        })}
    </div>
  );
};

export { Container };
