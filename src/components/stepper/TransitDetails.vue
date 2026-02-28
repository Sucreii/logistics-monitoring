<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { getAllPortStorables, getAllTrips, getTruckStorables } from 'src/stores/ShipmentStore';
import { CreateTransitDetailsFields } from 'src/utils';
import { tripsForm } from 'src/stores/AllPostReactive';

onMounted(async () => {
  await graphPorts.fetchPortStores();
  await graphTrips.fetchTrips();
  await graphTruckDropDown.fetchTruckStores();
});

type TripsInputKeys = Exclude<keyof typeof tripsForm, 'finances'>;
const tripsInfo = tripsForm;
const graphPorts = getAllPortStorables();
const graphTruckDropDown = getTruckStorables();
const graphTrips = getAllTrips();

const truckSelectOptions = computed(() => {
  return graphTruckDropDown.trucks.map((trucks) => ({
    label: trucks.id,
    value: trucks.id,
  }));
});

const portSelectOptions = computed(() => {
  return graphPorts.storables
    .filter((port) => port.type === 'PORT' || port.type === 'port')
    .map((port) => ({
      label: port.id,
      value: port.id,
    }));
});

const containerSelectOptions = computed(() => {
  return graphPorts.storables
    .filter((port) => port.type === 'CONTAINER' || port.type === 'container')
    .map((port) => ({
      label: port.id,
      value: port.id,
    }));
});

const warehouseSelectOptions = computed(() => {
  return graphPorts.storables
    .filter((port) => port.type === 'WAREHOUSE')
    .map((port) => ({
      label: port.id,
      value: port.id,
    }));
});
</script>

<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="field in CreateTransitDetailsFields"
      :class="`col-${field.col}`"
      :key="field.model"
      dense
    >
      <div class="row">
        <div class="col-12">
          <div class="text-subtitle3 text-grey-8">{{ field.label }}</div>
        </div>

        <div class="col-12">
          <q-select
            v-if="field.variant === 'port'"
            v-model="tripsInfo[field.model as keyof typeof tripsInfo]"
            :options="portSelectOptions"
            :placeholder="field.placeholder"
            :rules="field.rules"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-select
            v-else-if="field.variant === 'container'"
            v-model="tripsInfo[field.model as keyof typeof tripsInfo]"
            :options="containerSelectOptions"
            :placeholder="field.placeholder"
            :rules="field.rules"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-select
            v-else-if="field.variant === 'warehouse'"
            v-model="tripsInfo[field.model as keyof typeof tripsInfo]"
            :options="warehouseSelectOptions"
            :placeholder="field.placeholder"
            :rules="field.rules"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-select
            v-else-if="field.variant === 'truck'"
            v-model="tripsInfo[field.model as keyof typeof tripsInfo]"
            :options="truckSelectOptions"
            :placeholder="field.placeholder"
            :rules="field.rules"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-input
            v-else-if="field.variant === 'price'"
            v-model.number="tripsInfo[field.model as TripsInputKeys]"
            type="number"
            placeholder="₱"
            dense
            outlined
            clearable
          />

          <q-input
            v-else
            v-model="tripsInfo[field.model as TripsInputKeys]"
            :placeholder="field.placeholder"
            :icon="field.icon"
            dense
            outlined
            clearable
          />
        </div>
      </div>
    </div>
  </div>
</template>
