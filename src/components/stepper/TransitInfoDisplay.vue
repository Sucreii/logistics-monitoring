<script lang="ts" setup>
import { computed } from 'vue';
import { tripsForm2 } from 'src/stores/AllPostReactive';

type SimpleTripsKeys = Exclude<keyof typeof userInfo, 'finances'>;
const userInfo = tripsForm2;
const fieldDisplayArr = computed(() => [
  { key: 'container_id', label: 'Container ID', col: '6', modelVal: userInfo.container_id },
  { key: 'commodity', label: 'Commodity', col: `6`, modelVal: userInfo.commodity },
  { key: 'truck_id', label: 'Truck Name', col: `4`, modelVal: userInfo.truck_id },
  { key: 'port_id', label: 'Port ID', col: `4`, modelVal: userInfo.port_id },
  { key: 'warehouse_id', label: 'Warehouse ID', col: `4`, modelVal: userInfo.warehouse_id },
  { key: 'base_rate', label: 'Base Rate', col: `6`, modelVal: Number(userInfo.base_rate) },
  { key: 'volumex', label: 'Volume X', col: `3`, modelVal: Number(userInfo.volumex) },
  { key: 'volumey', label: 'Volume Y', col: `3`, modelVal: Number(userInfo.volumey) },
]);
</script>
<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div v-for="field in fieldDisplayArr" :class="`col-${field.col}`" :key="field.key">
      <q-input
        :model-value="userInfo[field.key as SimpleTripsKeys]"
        :label="field.label"
        outlined
        readonly
      />
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
        <q-input :model-value="finance.title" label="Description" readonly outlined />
      </div>

      <div class="col-6">
        <q-input
          :model-value="
            finance.type === 'percentage' ? finance.value * 100 + '%' : '₱' + finance.value
          "
          label="Amount"
          readonly
          outlined
        />
      </div>
    </div>
  </div>
</template>
