export type InputType =
  | 'number'
  | 'text'
  | 'textarea'
  | 'time'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'file'
  | 'url'
  | 'date'
  | 'datetime-local'
  | 'select'
  | 'selects';

export type FieldTypes = {
  label: string;
  model: string;
  icon: string;
  type: InputType;
  // col: number
};

export interface TableRequestProps {
  pagination: {
    page: number;
    rowsPerPage: number;
    sortBy?: string | null;
    descending?: boolean;
    rowsNumber?: number;
  };
  filter?: string;
  getCellValue?: (col: number | string, row: number | string) => number | string;
}

export type FinanceItem = {
  title: string;
  type: 'number';
  value: number | null;
};
export interface Shipment {
  id: string;
  warehouse_id: string;
  blno: string;
  contract_no: string;
  entry_no: string;
  reference: string;
  registry_no: string;
  status: string;
  volumex: number;
  volumey: number;
  estimated_time_arrival: string;
  issuer_username: string;
  customer_username: string;
  containers: {
    id: string;
    type: string;
    description: string;
  }[];
  financeSummary: {
    title: string;
    type: string;
    value: number;
  }[];
}

export interface SearchShipmentType {
  id: string;
  blno: string;
  reference: string;
  contract_no: string;
  registry_no: string;
  volumex?: number;
  volumey?: number;
  status: string;
  warehouse_id?: string;
  containers?: {
    id: string;
    type: string;
    description: string;
  }[];
  financeSummary?: {
    title: string;
    type: string;
    value: number;
  }[];
}
export interface Trips {
  id: string;
  commodity: string;
  truck: {
    id: string;
    operator: string | null;
  } | null;
  warehouse: {
    id: string;
    description: string | null;
  } | null;
  port: {
    id: string;
    description: string | null;
  } | null;
  container: {
    id: string;
    description: string | null;
  } | null;
  financeSummary: {
    title: string;
    type: string;
    value: number;
  }[];
}
export interface Users {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  last_logged_in: string;
  role: {
    id: string;
    title: string;
  };
}

export interface Storables {
  id: string;
  type: string;
  description: string;
  date_created: string;
}

export interface Trucks {
  id: string;
  operator: string;
  is_archived: boolean;
  date_added: string;
}

export interface DashboardStats {
  TotalPending: number;
  TotalTransit: number;
  TotalDelivered: number;
}

export type ShipmentInputType = 'text' | 'number' | 'date' | 'password';

export type ShipmentFieldTypes = {
  label: string;
  placeholder: string;
  model: string;
  icon: string;
  type: InputType;
  col: string;
  variant: string;
  rules?: ((v: string | number | boolean | null | undefined) => boolean | string)[]; // Added rules
};

export type AdditionalShipmentTypes = {
  label: string;
  placeholder: string;
  model: string;
  type: ShipmentInputType | 'select';
  col: string;
  variant: string;
  rules?: ((v: string | number | boolean | null | undefined) => boolean | string)[]; // Added rules
};

export type ExpensesShipmentTypes = {
  label: string;
  placeholder: string;
  model: string;
  type: number | string;
  col: string;
  variant: string; // Added rules
};

export type AdditionalUsersTypes = {
  label: string;
  placeholder: string;
  model: string;
  type: ShipmentInputType;
  col: string;
  variant: string;
  rules?: ((v: string | number | boolean | null | undefined) => boolean | string)[]; // Added rules
};

export type AdditionalTrucksTypes = {
  label: string;
  placeholder: string;
  model: string;
  type: ShipmentInputType;
  col: string;
  variant: string;
  rules?: ((v: string | number | boolean | null | undefined) => boolean | string)[]; // Added rules
};

export type AdditionalPortStoreTypes = {
  label: string;
  placeholder: string;
  model: string;
  type: ShipmentInputType;
  col: string;
  variant: string;
  rules?: ((v: string | number | boolean | null | undefined) => boolean | string)[]; // Added rules
};

export type TransitFieldTypes = {
  label: string;
  placeholder: string;
  model: string;
  icon: string;
  type: InputType;
  col: string;
  variant: string;
  rules?: ((v: string | number | boolean | null | undefined) => boolean | string)[]; // Added rules
};

export type ShipmentExpensesFieldTypes = {
  label: string;
  model: string;
  icon: string;
  type: InputType;
  col: number;
  variant: string;
};

export type FormFilterTypes = {
  label: string;
  model: string;
  type: InputType;
};

export type ContainerType = [];

export type WarehouseType = [];

export type expensesType = {
  id: number;
  name: string;
  value: string;
}[];

export type revenueType = {
  id: number;
  name: string;
  value: string;
}[];

// export type ShipmentListTypes = {
//   contractNo?: string;
//   reference?: string;
//   blno?: string;
//   volumeX?: number;
//   volumeY?: number;
//   shipping_line?: string;
//   port?: string;
//   estimatedTimeArrival?: string;
//   actualTimeArrival?: string;
//   entryNo?: string;
//   registryNo?: string;
//   container?: ContainerType[];
//   warehouse?: WarehouseType;
//   expenses?: expensesType;
//   revenue?: revenueType;
// };

export type ShipmentList = {
  id: string;
  contractNo?: string;
  reference?: string;
  customer?: string;
  blno?: string;
  volumeX?: number;
  volumeY?: number;
  shippingLine?: string;
  port?: string;
  estimatedTimeArrival?: string;
  actualTimeArrival?: string;
  entryNo?: string;
  registryNo?: string;
  container?: ContainerType[];
  warehouse?: WarehouseType;
  expenses?: expensesType;
  revenue?: revenueType;
  net?: number;
  issuedBy?: string;
  dateIssued?: string;
};

export type TableShipmentConstants = {
  id: string;
  blno?: string;
  contract_no?: string;
  entry_no?: string;
  reference?: string;
  registry_no?: string;
};

export type TableTripsConstants = {
  id: string;
  commodity?: string;
  truckId?: string;
  warehouse?: string;
  container?: string;
  port?: string;
};

export type TableUsersConstants = {
  id: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  last_logged_in?: string;
};

export type TableTruckProfileConstants = {
  id: string;
  operator?: string;
  is_archived?: boolean;
  date_added?: string;
};

interface ShipmentExpense {
  id: number;
  name: string;
  value: number;
}

interface ShipmentRevenue {
  id: number;
  name: string;
  value: number;
}

export type FinanceListTypes = {
  shipmentExpense?: ShipmentExpense[];
  shipmentRevenue?: ShipmentRevenue[];
};

export type StorableFieldModel = 'warehouse' | 'container' | 'port' | 'expense' | 'revenue';

export type StorableValue = string;
