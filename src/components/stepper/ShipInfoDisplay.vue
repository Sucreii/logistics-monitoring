<script lang="ts" setup>
// import { ref } from 'vue'
import { shipmentForm } from 'src/stores/AllPostReactive';

const userInfo = shipmentForm;
const fieldDisplayArr = [
  { key: 'eta', label: 'ETA', col: '12', modelVal: userInfo.estimated_time_arrival },
  { key: 'customer', label: 'Customer Username', col: `6`, modelVal: userInfo.customer_username },
  { key: 'issuer', label: 'Issuer Name', col: '6', modelVal: userInfo.issuer_username },
  { key: 'billnum', label: 'Bill of Landing', col: '4', modelVal: userInfo.blno },
  { key: 'contractnum', label: 'Contract no.', col: '4', modelVal: userInfo.contract_no },
  { key: 'entrynum', label: 'Entry no.', col: '4', modelVal: userInfo.entry_no },
  { key: 'regnum', label: 'Registry no.', col: '6', modelVal: userInfo.registry_no },
  { key: 'refnum', label: 'Reference no.', col: '6', modelVal: userInfo.reference },
  { key: 'portID', label: 'Port ID', col: '4', modelVal: userInfo.port_id },
  { key: 'shipline', label: 'Shipping Line.', col: '4', modelVal: userInfo.shipping_line },
  { key: 'volx', label: 'Vol. X', col: '2', modelVal: userInfo.volumex },
  { key: 'voly', label: 'Vol. Y', col: '2', modelVal: userInfo.volumey },
  { key: 'billing', label: 'Billing', col: '6', modelVal: '' },
  { key: 'cost', label: 'Cost', col: '6', modelVal: '' },
  { key: 'vat1', label: 'Brokerage VAT', col: '4', modelVal: '' },
  { key: 'vat2', label: 'Facilitation VAT', col: '4', modelVal: '' },
  { key: 'vat3', label: 'Trucking VAT', col: '4', modelVal: '' },
];

console.log('Shipment Info: ', userInfo);
</script>

<template>
  <div class="row q-col-gutter-md">
    <div v-for="field in fieldDisplayArr" :class="`col-${field.col}`" :key="field.key">
      <q-input :model-value="field.modelVal" :label="field.label" outlined readonly />
    </div>
  </div>
</template>
