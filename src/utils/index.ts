import type {
  ShipmentFieldTypes,
  TableShipmentConstants,
  TableUsersConstants,
  TableTripsConstants,
  AdditionalShipmentTypes,
  TransitFieldTypes,
  AdditionalUsersTypes,
  AdditionalTrucksTypes,
  AdditionalPortStoreTypes,
  TableTruckProfileConstants,
} from 'src/utils/static/types';

export type DialogKey = 'shipments' | 'trips' | 'users' | 'trucks';

export const NavigationItems = [
  {
    label: 'Dashboard',
    separator: true,
    name: 'home.dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Notifications',
    separator: true,
    name: 'home.notifications',
    icon: 'list',
  },
  {
    label: 'Shipments',
    separator: true,
    name: 'home.shipments',
    icon: 'directions_boat',
  },
  {
    label: 'Trips',
    separator: true,
    name: 'home.trips',
    icon: 'local_shipping',
  },
  {
    label: 'Users',
    separator: true,
    name: 'home.users',
    icon: 'manage_accounts',
  },
  {
    label: 'Trucks',
    separator: true,
    name: 'home.trucks',
    icon: 'engineering',
  },
  {
    label: 'Audit',
    separator: true,
    name: 'home.audit',
    icon: 'list',
  },
];

export const linksArr: {
  label: string;
  icon: string;
  routeName: string;
  docDialog: DialogKey;
}[] = [
    {
      label: 'Add new Shipments',
      routeName: 'home.shipments',
      icon: 'add_shopping_cart',
      docDialog: 'shipments',
    },
    {
      label: 'Add new Trips',
      routeName: 'home.trips',
      icon: 'local_shipping',
      docDialog: 'trips',
    },
    {
      label: 'Add new Users',
      routeName: 'home.users',
      icon: 'person_add',
      docDialog: 'users',
    },
    {
      label: 'Add new Truck Profile',
      routeName: 'home.trucks',
      icon: 'contact_emergency',
      docDialog: 'trucks',
    },
  ];

export const portArr = [
  { label: 'MIP', value: 'MIP' },
  { label: 'POM', value: 'POM' },
  { label: 'CDO', value: 'CDO' },
  { label: 'DAVAO', value: 'DAVAO' },
  { label: 'CEBU', value: 'CEBU' },
  { label: 'MNL', value: 'MNL' },
];

export const selectivityArr = [
  { label: 'RED', value: 'RED' },
  { label: 'ORANGE', value: 'ORANGE' },
  { label: 'YELLOW', value: 'YELLOW' },
  { label: 'GREEN', value: 'GREEN' },
];

export const sizeArr = [
  { label: '20ft', size: '20ft' },
  { label: '40ft', size: '40ft' },
  { label: 'LCL', size: 'LCL' },
];

export const statusArr = [
  { label: 'PENDING', value: 'PENDING' },
  { label: 'ARRIVED', value: 'ARRIVED' },
];

// - - - - - - - - - - - FIELDS INPUT - - - - - - - - - -
export const CreateNewShipmentFields: ShipmentFieldTypes[] = [
  {
    label: 'Port',
    placeholder: 'PORT001',
    model: 'port',
    icon: 'flag',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Container No.',
    placeholder: 'CON001',
    model: 'container',
    icon: 'pin',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Warehouse',
    placeholder: 'WARE001',
    model: 'warehouse',
    icon: 'warehouse',
    type: 'text',
    col: '6',
    variant: 'information',
  },
];

export const CreateAdditionalShipments: AdditionalShipmentTypes[] = [
  {
    label: 'Selectivity',
    placeholder: 'ORANGE',
    model: 'selectivity',
    type: 'text',
    col: '3',
    variant: 'selectivity',
    rules: [(val) => !!val || 'Selectivity is required'],
  },
  {
    label: 'Consignee',
    placeholder: 'John Doe',
    model: 'customer_username',
    type: 'select',
    col: '6',
    variant: 'name',
    rules: [(val) => !!val || 'Consignee is required'],
  },
  {
    label: 'Bill of Lading No.',
    placeholder: 'BLN0026002',
    model: 'blno',
    type: 'text',
    col: '3',
    variant: 'information',
    rules: [(val) => !!val || 'Bill of Lading No. is required'],
  },
  {
    label: 'Shipping Line',
    placeholder: 'SITC',
    model: 'shipping_line',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Shipping Line is required'],
  },
  {
    label: 'Port ID',
    placeholder: 'POM',
    model: 'port_id',
    type: 'text',
    col: '4',
    variant: 'port',
    rules: [(val) => !!val || 'Port ID is required'],
  },
  {
    label: 'Estimated Date of Arrival',
    placeholder: 'DD-MMM-YYYY',
    model: 'estimated_time_arrival',
    type: 'date',
    col: '4',
    variant: 'date',
    rules: [(val) => !!val || 'Estimated Date of Arrival is required'],
  },
  {
    label: 'Entry No. ',
    placeholder: 'C-001-26',
    model: 'entry_no',
    type: 'text',
    col: '6',
    variant: 'information',
    rules: [(val) => !!val || 'Entry No. is required'],
  },
  // {
  //   label: 'Warehouse',
  //   placeholder: 'Polyland',
  //   model: 'warehouse_id',
  //   type: 'text',
  //   col: '4',
  //   variant: 'information',
  //   rules: [(val) => !!val || 'Warehouse is required'],
  // },
  {
    label: 'Volume',
    placeholder: '1',
    model: 'volumex',
    type: 'text',
    col: '3',
    variant: 'information',
    rules: [(val) => !!val || 'Volume X is required'],
  },
  {
    label: 'Size',
    placeholder: 'LCL',
    model: 'volumey',
    type: 'text',
    col: '3',
    variant: 'sizeForVol',
    rules: [(val) => !!val || 'Size is required'],
  },
  {
    label: 'Registry No. ',
    placeholder: 'REG001-26',
    model: 'registry_no',
    type: 'text',
    col: '6',
    variant: 'information',
    rules: [(val) => !!val || 'Registry No. is required'],
  },
  // {
  //   label: 'Container',
  //   placeholder: '(e.g., container1, container2)',
  //   model: 'containers',
  //   type: 'text',
  //   col: '4',
  //   variant: 'information',
  //   rules: [
  //     (val) => !!val || 'Container ID is required',
  //     (val) =>
  //       (val && /^[A-Za-z]{4}\d{7}$/.test(val as string)) ||
  //       'Wrong Container format. Ex.: ABCD1234567',
  //   ],
  // },
  {
    label: 'Contract No.',
    placeholder: 'CON001-26',
    model: 'contract_no',
    type: 'text',
    col: '6',
    variant: 'information',
    // rules: [(val) => !!val || 'Contract No. is required'],
  },
];

export const CreateAdditionalPort: AdditionalPortStoreTypes[] = [
  {
    label: 'Port Name',
    placeholder: 'MIP',
    model: 'id',
    type: 'text',
    col: '3',
    variant: 'information',
    rules: [(val) => !!val || 'Port Name is required'],
  },
  {
    label: 'Type',
    placeholder: 'PORT',
    model: 'type',
    type: 'text',
    col: '3',
    variant: 'information',
    // rules: [(val) => !!val || 'Operator Name is required'],
  },
  {
    label: 'Description',
    placeholder: '...',
    model: 'description',
    type: 'text',
    col: '6',
    variant: 'information',
    // rules: [(val) => !!val || 'Date is required'],
  },
];

export const CreateAdditionalTrucks: AdditionalTrucksTypes[] = [
  {
    label: 'Date',
    placeholder: 'YYYY-MM-DD',
    model: 'date_added',
    type: 'date',
    col: '4',
    variant: 'date',
    rules: [(val) => !!val || 'Date is required'],
  },
  {
    label: 'Truck Name',
    placeholder: 'Plate Number/Name',
    model: 'id',
    type: 'text',
    col: '8',
    variant: 'information',
    rules: [(val) => !!val || 'Truck Name is required'],
  },
];

export const CreateAdditionalUsers: AdditionalUsersTypes[] = [
  {
    label: 'Username',
    placeholder: 'ItsMeJuan',
    model: 'username',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Username is required'],
  },
  {
    label: 'Password',
    placeholder: '**********',
    model: 'password',
    type: 'password',
    col: '5',
    variant: 'information',
    rules: [(val) => !!val || 'Password is required'],
  },
  {
    label: 'Role',
    placeholder: 'Select Role',
    model: 'role_id',
    type: 'number',
    col: '3',
    variant: 'information',
    rules: [(val) => !!val || 'Role is required'],
  },
  {
    label: 'First Name',
    placeholder: 'Juan',
    model: 'first_name',
    type: 'text',
    col: '6',
    variant: 'information',
    rules: [(val) => !!val || 'First Name is required'],
  },
  {
    label: 'Last Name',
    placeholder: 'Dela Cruz',
    model: 'last_name',
    type: 'text',
    col: '6',
    variant: 'information',
    rules: [(val) => !!val || 'Last Name is required'],
  },
];

export const CreateTransitDetailsFields: TransitFieldTypes[] = [
  {
    label: 'Container ID',
    placeholder: 'TRANS001',
    model: 'container_id',
    icon: '',
    type: 'text',
    col: '4',
    variant: 'container',
    rules: [
      (val) => !!val || 'Container ID is required',
      (val) =>
        (val && /^[A-Za-z]{4}\d{7}$/.test(val as string)) ||
        'Wrong Container format. Ex.: ABCD1234567',
    ],
  },
  {
    label: 'Commodity',
    placeholder: 'Juan Luna',
    model: 'commodity',
    icon: '',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Commodity is required'],
  },
  {
    label: 'Warehouse',
    placeholder: 'Silang, Cavite',
    model: 'warehouse_id',
    icon: '',
    type: 'text',
    col: '4',
    variant: 'warehouse',
    rules: [(val) => !!val || 'Warehouse ID is required'],
  },
  {
    label: 'Truck',
    placeholder: 'TXQ001',
    model: 'truck_id',
    icon: '',
    type: 'text',
    col: '4',
    variant: 'truck',
    rules: [(val) => !!val || 'Truck ID is required'],
  },
  {
    label: 'Port',
    placeholder: 'NAIC',
    model: 'port_id',
    icon: '',
    type: 'text',
    col: '4',
    variant: 'port',
    rules: [(val) => !!val || 'Port ID is required'],
  },
  {
    label: 'Volume',
    placeholder: '10ft',
    model: 'volumex',
    icon: '',
    type: 'text',
    col: '4',
    variant: 'price',
    rules: [(val) => !!val || 'Volume is required'],
  },
];

export const tableShipmentConstant: TableShipmentConstants[] = [
  {
    id: '007',
    blno: 'BL123456',
    contract_no: 'CN789012',
    entry_no: 'EN345678',
    reference: 'REF901234',
    registry_no: 'REG567890',
  },
  {
    id: '008',
    blno: 'BL234567',
    contract_no: 'CN890123',
    entry_no: 'EN456789',
    reference: 'REF012345',
    registry_no: 'REG678901',
  },
  {
    id: '009',
    blno: 'BL345678',
    contract_no: 'CN901234',
    entry_no: 'EN567890',
    reference: 'REF123456',
    registry_no: 'REG789012',
  },
];

export const tableTripsConstant: TableTripsConstants[] = [
  {
    id: '007',
    commodity: 'BL123456',
    truckId: 'CN789012',
    warehouse: 'EN345678',
    container: 'REF901234',
    port: 'REG567890',
  },
  {
    id: '008',
    commodity: 'BL123456',
    truckId: 'CN789012',
    warehouse: 'EN345678',
    container: 'REF901234',
    port: 'REG567890',
  },
  {
    id: '009',
    commodity: 'BL123456',
    truckId: 'CN789012',
    warehouse: 'EN345678',
    container: 'REF901234',
    port: 'REG567890',
  },
];

export const tableUsersConstants: TableUsersConstants[] = [
  {
    id: '1',
    username: 'jdoe',
    first_name: 'John',
    last_name: 'Doe',
    password: '********',
    last_logged_in: '2024-12-01 10:00 AM',
  },
  {
    id: '2',
    username: 'asmith',
    first_name: 'Alice',
    last_name: 'Smith',
    password: '********',
    last_logged_in: '2024-12-02 11:30 AM',
  },
  {
    id: '3',
    username: 'bwilliams',
    first_name: 'Bob',
    last_name: 'Williams',
    password: '********',
    last_logged_in: '2024-12-03 09:15 AM',
  },
];

export const tableTruckProfileConstants: TableTruckProfileConstants[] = [
  {
    id: '1',
    operator: 'Operator A',
    is_archived: false,
    date_added: '2024-12-01',
  },
  {
    id: '2',
    operator: 'Operator B',
    is_archived: true,
    date_added: '2024-11-15',
  },
  {
    id: '3',
    operator: 'Operator C',
    is_archived: false,
    date_added: '2024-10-20',
  },
];
