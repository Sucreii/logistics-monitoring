import { reactive, ref } from 'vue';
import type { FinanceItem } from 'src/utils/static/types';

export const shipmentForm = reactive({
  blno: '',
  contract_no: '',
  entry_no: '',
  reference: '',
  registry_no: '',
  port_id: '',
  shipping_line: '',
  volumex: null,
  volumey: null,
  customer_username: '',
  issuer_username: '',
  estimated_time_arrival: '',
  finances: [
    { title: 'Billing', type: 'number', value: null },
    { title: 'Cost', type: 'number', value: null },
    { title: 'Brokerage (VAT)', type: 'number', value: null },
    { title: 'Facilitation (VAT)', type: 'number', value: null },
    { title: 'Trucking (VAT)', type: 'number', value: null },
  ] as FinanceItem[],
});

export const usersForm = ref({
  username: '',
  password: '',
  first_name: '',
  last_name: '',
  role_id: null as number | null,
});
