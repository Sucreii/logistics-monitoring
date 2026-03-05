<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import { getAllPortStorables, getAllTrips, getTruckStorables } from 'src/stores/ShipmentStore';
import { CreateTransitDetailsFields, sizeArr, portArr } from 'src/utils';
import { tripsForm2 } from 'src/stores/AllPostReactive';

onMounted(async () => {
  await graphPorts.fetchPortStores();
  await graphTrips.fetchTrips();
  await graphTruckDropDown.fetchTruckStores();
});

type TripsInputKeys = Exclude<keyof typeof tripsForm2, 'finances'>;
const tripsInfo = tripsForm2;
const graphPorts = getAllPortStorables();
const graphTrips = getAllTrips();
const graphTruckDropDown = getTruckStorables();
const portOption = ref(portArr);
const volOption = ref(sizeArr);

const truckSelectOptions = computed(() => {
  return graphTruckDropDown.trucks.map((trucks) => ({
    label: trucks.id,
    value: trucks.id,
  }));
});
</script>

<template>
  <div class="row q-col-gutter-sm">
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
            :options="portOption"
            :label="field.placeholder"
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
            :label="field.placeholder"
            :rules="field.rules"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-select
            v-else-if="field.variant === 'price'"
            v-model="tripsInfo[field.model as keyof typeof tripsInfo]"
            :options="volOption"
            :label="field.placeholder"
            :rules="field.rules"
            option-value="size"
            option-label="label"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-input
            v-else
            class="input-uppercase"
            v-model="tripsInfo[field.model as TripsInputKeys]"
            :rules="field.rules"
            :label="field.placeholder"
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
