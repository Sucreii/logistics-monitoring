import { reactive, ref } from 'vue';

export const shipmentForm = reactive({
  id: '',
  selectivity: '',
  status: '',
  blno: '',
  contract_no: '',
  warehouse_id: '',
  entry_no: '',
  registry_no: '',
  port_id: '',
  shipping_line: '',
  volumex: '',
  volumey: '',
  estimated_time_arrival: '',
  customer_username: '',
  issuer_username: '',
  actual_time_arrival: '',
  // containers: [] as (string | { id: string | number })[],
  containers: [
    {
      container_id: '',
      // type: '',
      // description: '',
      warehouse_id: '',
    },
  ],
  finances: [
    {
      title: '',
      type: 'amount',
      value: 0,
    },
  ],
});

export const shipmentForm2 = reactive({
  selectivity: '',
  blno: '',
  contract_no: '',
  warehouse_id: '',
  entry_no: '',
  registry_no: '',
  port_id: '',
  shipping_line: '',
  volumex: '',
  volumey: '',
  estimated_time_arrival: '',
  customer_username: '',
  issuer_username: '',
  // containers: [] as (string | { id: string | number })[],
  containers: [
    {
      container_id: '',
      warehouse_id: '',
    },
  ],
  finances: [
    {
      title: 'BILLING',
      type: 'amount',
      value: 0,
    },
    {
      title: 'COST',
      type: 'amount',
      value: 0,
    },
  ],
});

export const tripsForm = reactive({
  id: '',
  container_id: '',
  truck_id: '',
  port_id: '',
  commodity: '',
  warehouse_id: '',
  base_rate: 0,
  volumex: '',
  date_delivered: '',
  finances: [
    {
      title: 'Tariff Rate',
      type: 'amount',
      value: 0,
    },
    {
      title: 'P/R Expense',
      type: 'amount',
      value: 0,
    },
    {
      title: 'Drvr Comm',
      type: 'amount',
      value: 0,
    },
    {
      title: 'Hlpr Comm',
      type: 'amount',
      value: 0,
    },
    {
      title: 'Other Exp',
      type: 'amount',
      value: 0,
    },
    {
      title: 'RFID',
      type: 'amount',
      value: 0,
    },
  ],
});

export const tripsForm2 = reactive({
  container_id: '',
  truck_id: '',
  port_id: '',
  commodity: '',
  warehouse_id: '',
  base_rate: 0,
  volumex: '',
  // date_delivered: '',
  finances: [
    {
      title: 'Tariff Rate',
      type: 'amount',
      value: 0,
    },
    {
      title: 'P/R Expense',
      type: 'amount',
      value: 0,
    },
    {
      title: 'Drvr Comm',
      type: 'amount',
      value: 0,
    },
    {
      title: 'Hlpr Comm',
      type: 'amount',
      value: 0,
    },
    {
      title: 'Other Exp',
      type: 'amount',
      value: 0,
    },
    {
      title: 'RFID',
      type: 'amount',
      value: 0,
    },
  ],
});

export const pagination = ref({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
});

export const usersForm = ref({
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  role_id: null as number | null,
});

export const truckForm = ref({
  id: '',
  operator: '',
  date_added: '',
});

export const storablesForm = ref({
  id: '',
  type: 'PORT',
  description: '',
});

export const editedUsersForm = ref({
  role_id: null as string | null,
  username: '',
  first_name: '',
  last_name: '',
});
