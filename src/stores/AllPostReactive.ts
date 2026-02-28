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
  volumex: null as number | null,
  volumey: null as number | null,
  estimated_time_arrival: '',
  customer_username: '',
  issuer_username: '',
  // containers: [] as string[],
  containers: [] as (string | { id: string | number })[],
  finances: [
    {
      title: '',
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
  volumex: 0,
  volumey: 0,
  date_delivered: '',
  finances: [
    {
      title: '',
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