import { reactive } from 'vue';

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
});
