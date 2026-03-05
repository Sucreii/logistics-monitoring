<script lang="ts" setup>
import { computed } from 'vue';
import { tripsForm2 } from 'src/stores/AllPostReactive';
import { useAuthStore } from 'src/stores/LoginAuth';

type SimpleTripsKeys = Exclude<keyof typeof userInfo, 'finances'>;
const userInfo = tripsForm2;
const authStore = useAuthStore();
const fieldDisplayArr = computed(() => [
  { key: 'truck_id', label: 'Truck Name', col: `3`, modelVal: userInfo.truck_id },
  { key: 'container_id', label: 'Container ID', col: '3', modelVal: userInfo.container_id },
  { key: 'commodity', label: 'Commodity', col: `6`, modelVal: userInfo.commodity },
  { key: 'port_id', label: 'Port ID', col: `4`, modelVal: userInfo.port_id },
  { key: 'warehouse_id', label: 'Warehouse ID', col: `4`, modelVal: userInfo.warehouse_id },
  { key: 'volumex', label: 'Volume', col: `4`, modelVal: userInfo.volumex },
]);
</script>
<template>
  <div class="row q-col-gutter-sm q-mb-md">
    <div v-for="field in fieldDisplayArr" :class="`col-${field.col}`" :key="field.key">
      <q-input
        class="input-uppercase"
        :model-value="userInfo[field.key as SimpleTripsKeys]"
        :label="field.label"
        outlined
        readonly
      />
    </div>
  </div>

  <q-separator v-if="['Super Admin', 'Admin'].includes(authStore.roleLabel)" />

  <div
    v-if="['Super Admin', 'Admin'].includes(authStore.roleLabel)"
    class="row q-col-gutter-md q-mt-xs"
  >
    <div class="col-12 text-overline text-weight-bolder text-primary">Finance Summary</div>
    <div class="col-6">
      <q-input
        class="input-uppercase"
        label="Base Rate"
        :model-value="Number(userInfo.base_rate)"
        outlined
        readonly
      />
    </div>

    <div
      v-for="(finance, index) in userInfo.finances"
      class="col-12 row q-col-gutter-sm items-center"
      :key="index"
    >
      <div class="col-6">
        <q-input
          class="input-uppercase"
          :model-value="finance.title"
          label="Description"
          readonly
          outlined
        />
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
