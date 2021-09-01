import React, { FunctionComponentElement } from "react";
import { Container } from "./Container";

import "./DirectCar.scss";

interface IDirectCarProps {
  items: Record<string, any>;
  updateData: (data: any) => void;
}

const DirectCar = ({
  items,
  updateData
}): FunctionComponentElement<IDirectCarProps> => {
  return <>{items && <Container items={items} updateData={updateData} />}</>;
};

export { DirectCar };
