export interface IValidationError {
  message: string;
}

type TradeValueType =
  | number
  | string
  | boolean
  | null
  | undefined
  | Record<string, IValidationError>;

interface ITradeSignature {
  [index: string]: TradeValueType;
}
export interface ITrade extends ITradeSignature {
  status?: string;
  date?: string;
  make?: string;
  model?: string;
  price?: number;
  release?: string;
  isDirty?: boolean;
  id: string;
  entryId?: string;
  available?: boolean;
  isNoValidated?: boolean;
  validationErrors?: {};
}

export interface IStateTrades {
  data?: Array<ITrades>;
  dirtyData: Array<ITrades> | [];
  columnDef: Array<any>;
  carManufactures: Array<any>;
  carPartsByManufacture: Record<string, string>;
  date: string;
}

export interface IStateModal {
  modalType: string;
  modalProps: {
    isOpen: boolean;
    id: string;
    actions: any;
  };
}
export interface IStateMessage {
  messageType: string;
  messageProps: {
    message: boolean;
    type: string;
  };
}

export interface IAppState {
  app: IStateTrades;
  modal: IStateModal;
  message: IStateMessage;
}
