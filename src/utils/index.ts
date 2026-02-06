import type {
  ShipmentFieldTypes,
  TableShipmentConstants,
  TableUsersConstants,
  AdditionalShipmentTypes,
  TransitFieldTypes,
} from 'src/utils/static/types';

interface dummy {
  title: string;
  content: string;
  date: string;
}

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
  // {
  //   label: 'Reports',
  //   separator: true,
  //   name: 'home.reports',
  //   icon: 'query_stats',
  // },
  {
    label: 'Users',
    separator: true,
    name: 'home.users',
    icon: 'manage_accounts',
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
    label: 'Bill of Landing No.',
    placeholder: 'PORT001',
    model: 'blno',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Contract No.',
    placeholder: 'CON001',
    model: 'contract_no',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Entry No. ',
    placeholder: 'WARE001',
    model: 'entry_no',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Reference',
    placeholder: 'WARE001',
    model: 'reference',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Registry No. ',
    placeholder: 'WARE001',
    model: 'registry_no',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Port ID',
    placeholder: 'PORT001',
    model: 'port_id',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Shipping Line',
    placeholder: 'WARE001',
    model: 'shipping_line',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Volume X',
    placeholder: 'WARE001',
    model: 'volumex',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Volume Y',
    placeholder: 'WARE001',
    model: 'volumey',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Customer Name',
    placeholder: 'Juan Dela Cruz',
    model: 'customer_username',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Issuer Name',
    placeholder: 'WARE001',
    model: 'issuer_username',
    type: 'text',
    col: '6',
    variant: 'information',
  },
  {
    label: 'Estimated Time of Arrival',
    placeholder: 'WARE001',
    model: 'estimated_time_arrival',
    type: 'text',
    col: '6',
    variant: 'information',
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
