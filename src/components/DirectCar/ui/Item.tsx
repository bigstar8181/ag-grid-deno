import React, { Dispatch, SetStateAction } from "react";
import { AutosuggestionComponent } from "../../Autosuggest-dropdown";

import "./DirectCar.scss";

interface IDirectCarItemProps {
  item: any;
  active: boolean;
  setTrade: (value: Record<string, string>) => void;
  setHovered: Dispatch<SetStateAction<number>>;
  index: number;
}

const DirectCarItem = ({
  item = null,
  active,
  setTrade,
  setHovered,
  index
}: IDirectCarItemProps) => {
  const getSelectedOption = (selectedOption: string) => {
    const { name } = item;
    setTrade({ [name]: selectedOption });
  };

  const suggestions =
    (item.data && item.data.map((values: any) => values.name)) || [];
  const ref = React.createRef();

  return (
    <div
      className={`item ${active ? "active" : ""}`}
      onClick={() => {
        setHovered(index);
        console.log(ref.current);
      }}
    >
      <AutosuggestionComponent
        ref={ref}
        autoFocus={active}
        getSelectedOption={getSelectedOption}
        values={suggestions}
      />
    </div>
  );
};

export { DirectCarItem };
