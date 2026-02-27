import { reactive, ref } from 'vue';

export const shipmentForm = reactive({
  blno: '',
  contract_no: '',
  warehouse_id: '',
  entry_no: '',
  reference: '',
  registry_no: '',
  port_id: '',
  shipping_line: '',
  volumex: null,
  volumey: null,
  estimated_time_arrival: '',
  customer_username: '',
  issuer_username: '',
  containers: '',
  finances: [
    {
      title: '',
      type: 'amount',
      value: 0,
    },
  ],
});

export const tripsForm = reactive({
  container_id: '',
  truck_id: '',
  port_id: '',
  commodity: '',
  warehouse_id: '',
  base_rate: 0,
  volumex: 0,
  volumey: 0,
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
  role_id: null as number | null,
  username: '',
  first_name: '',
  last_name: '',
});
