<script lang="ts" setup>
import { computed } from 'vue';
import { shipmentForm2 } from 'src/stores/AllPostReactive';

const userInfo = shipmentForm2;
const fieldDisplayArr = computed(() => [
  { key: 'eta', label: 'ETA', col: '6', modelVal: userInfo.estimated_time_arrival },
  {
    key: 'container',
    label: 'Container No.',
    col: '6',
    modelVal: (function () {
      const data = userInfo.containers;
      if (Array.isArray(data)) {
        return data.map((c) => (typeof c === 'object' ? (c).id : c)).join(', ');
      }

      return data || 'None';
    })(),
  },
  { key: 'customer', label: 'Consignee', col: `6`, modelVal: userInfo.customer_username },
  { key: 'issuer', label: 'Issuer Name', col: '6', modelVal: userInfo.issuer_username },
  { key: 'billnum', label: 'Bill of Landing', col: '4', modelVal: userInfo.blno },
  // { key: 'refnum', label: 'Reference no.', col: '4', modelVal: userInfo.reference },
  { key: 'warehouse_id', label: 'Warehouse', col: '4', modelVal: userInfo.warehouse_id },
  { key: 'contractnum', label: 'Contract no.', col: '4', modelVal: userInfo.contract_no },
  { key: 'entrynum', label: 'Entry no.', col: '4', modelVal: userInfo.entry_no },
  { key: 'regnum', label: 'Registry no.', col: '4', modelVal: userInfo.registry_no },
  { key: 'portID', label: 'Port ID', col: '4', modelVal: userInfo.port_id },
  { key: 'shipline', label: 'Shipping Line.', col: '4', modelVal: userInfo.shipping_line },
  { key: 'volx', label: 'Vol. X', col: '2', modelVal: Number(userInfo.volumex) },
  { key: 'voly', label: 'Vol. Y', col: '2', modelVal: Number(userInfo.volumey) },
]);
</script>
<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div v-for="field in fieldDisplayArr" :class="`col-${field.col}`" :key="field.key">
      <q-input :model-value="field.modelVal" :label="field.label" outlined readonly />
    </div>
  </div>

  <q-separator />

  <div class="row q-col-gutter-sm q-mt-xs">
    <div class="text-overline text-weight-bolder text-primary">Finance Summary</div>
    <div
      v-for="(finance, index) in userInfo.finances"
      class="col-12 row q-col-gutter-md items-center"
      :key="index"
    >
      <div class="col-6">
        <q-input :model-value="finance.title" label="Type" readonly outlined />
      </div>

      <div class="col-6">
        <q-input
          :model-value="
            finance.type === 'percentage' ? finance.value * 100 + '%' : '₱' + finance.value
          "
          label="Value"
          readonly
          outlined
        />
      </div>
    </div>
  </div>
</template>
