import type {
  ShipmentFieldTypes,
  TableShipmentConstants,
  TableUsersConstants,
  AdditionalShipmentTypes,
  TransitFieldTypes,
  AdditionalUsersTypes,
  AdditionalTrucksTypes,
  TableTruckProfileConstants,
} from 'src/utils/static/types';

interface dummy {
  title: string;
  content: string;
  date: string;
}
export type DialogKey = 'shipments' | 'trips' | 'users' | 'trucks';
export const NavigationItems = [
  {
    label: 'Dashboard',
    separator: true,
    name: 'home.dashboard',
    icon: 'dashboard',
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

export const dummyNotificationContent: dummy[] = [
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'May nag notif',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'hahaa',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 20, 2024',
  },
  {
    title: 'huhuhuhuhuhuhu',
    content: 'luh di nga? Totoo ba ? ',
    date: 'December 1212, 2024',
  },
];

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
    label: 'Customer Name',
    placeholder: 'Juan Dela Cruz',
    model: 'customer_username',
    type: 'select',
    col: '6',
    variant: 'name',
    rules: [(val) => !!val || 'Customer Name is required'],
  },
  {
    label: 'Issuer Name',
    placeholder: 'WARE001',
    model: 'issuer_username',
    type: 'select',
    col: '6',
    variant: 'name',
    rules: [(val) => !!val || 'Issuer Name is required'],
  },
  {
    label: 'Bill of Landing No.',
    placeholder: 'Bill-001',
    model: 'blno',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Bill of Landing No. is required'],
  },
  {
    label: 'Contract No.',
    placeholder: 'ConNum-001',
    model: 'contract_no',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Contract No. is required'],
  },
  {
    label: 'Entry No. ',
    placeholder: 'EntNum-001',
    model: 'entry_no',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Entry No. is required'],
  },
  {
    label: 'Reference',
    placeholder: 'RefID-001',
    model: 'reference',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Reference No. is required'],
  },
  {
    label: 'Registry No. ',
    placeholder: 'RegNum-001',
    model: 'registry_no',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Registry No. is required'],
  },
  {
    label: 'Volume X',
    placeholder: 'Vol X',
    model: 'volumex',
    type: 'number',
    col: '2',
    variant: 'information',
    rules: [(val) => !!val || 'Volume X is required'],
  },
  {
    label: 'Volume Y',
    placeholder: 'Vol Y',
    model: 'volumey',
    type: 'number',
    col: '2',
    variant: 'information',
    rules: [(val) => !!val || 'Volume Y is required'],
  },
  {
    label: 'Port ID',
    placeholder: 'PortID-001',
    model: 'port_id',
    type: 'text',
    col: '3',
    variant: 'port',
    rules: [(val) => !!val || 'Port ID is required'],
  },
  {
    label: 'Shipping Line',
    placeholder: 'ShipLine Name',
    model: 'shipping_line',
    type: 'text',
    col: '3',
    variant: 'information',
    rules: [(val) => !!val || 'Shipping Line is required'],
  },
  {
    label: 'Estimated Time of Arrival',
    placeholder: 'YYYY-MM-DD HH:mm',
    model: 'estimated_time_arrival',
    type: 'date',
    col: '6',
    variant: 'date',
    rules: [(val) => !!val || 'Estimated Time of Arrival is required'],
  },
];

// export const CreateExpensesShipmentsFields: ExpensesShipmentTypes[] = [
//   {
//     label: 'Billing',
//     placeholder: '₱',
//     model: 'title',
//     type: 'number',
//     col: '6',
//     variant: 'expenses',
//     rules: [(val) => !!val || 'Billing Value is required'],
//   },
//   {
//     label: 'Cost',
//     placeholder: '₱',
//     model: 'title',
//     type: 'number',
//     col: '6',
//     variant: 'expenses',
//     rules: [(val) => !!val || 'Cost Value is required'],
//   },
//   {
//     label: 'Brokerage',
//     placeholder: '₱',
//     model: 'title',
//     type: 'number',
//     col: '6',
//     variant: 'expenses',
//     rules: [(val) => !!val || 'Tax Value is required'],
//   },
//   {
//     label: 'Facilitation',
//     placeholder: '₱',
//     model: 'title',
//     type: 'number',
//     col: '6',
//     variant: 'expenses',
//     rules: [(val) => !!val || 'Tax Value is required'],
//   },
//   {
//     label: 'Trucking',
//     placeholder: '₱',
//     model: 'title',
//     type: 'number',
//     col: '6',
//     variant: 'expenses',
//     rules: [(val) => !!val || 'Tax Value is required'],
//   },
// ];

export const CreateExpensesShipmentsFields = [
  { label: 'Billing', index: 0, col: '6' },
  { label: 'Cost', index: 1, col: '6' },
  { label: 'Brokerage', index: 2, col: '6' },
  { label: 'Facilitation', index: 3, col: '6' },
  { label: 'Trucking', index: 4, col: '6' },
];

export const CreateAdditionalTrucks: AdditionalTrucksTypes[] = [
  {
    label: 'Truck Name',
    placeholder: 'Plate Number/Name',
    model: 'id',
    type: 'text',
    col: '4',
    variant: 'information',
    rules: [(val) => !!val || 'Truck Name is required'],
  },
  {
    label: 'Operator Name',
    placeholder: 'John Doe',
    model: 'operator',
    type: 'text',
    col: '5',
    variant: 'information',
    rules: [(val) => !!val || 'Operator Name is required'],
  },
  {
    label: 'Date',
    placeholder: 'YYYY-MM-DD',
    model: 'date_added',
    type: 'date',
    col: '3',
    variant: 'information',
    rules: [(val) => !!val || 'Date is required'],
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
    label: 'Transit No. ',
    placeholder: 'TRANS001',
    model: 'port',
    icon: 'flag',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Truck No.',
    placeholder: 'TRUCK001',
    model: 'container',
    icon: 'pin',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Address',
    placeholder: 'Silang, Cavite',
    model: 'warehouse',
    icon: 'warehouse',
    type: 'text',
    col: '6',
    variant: 'information',
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
