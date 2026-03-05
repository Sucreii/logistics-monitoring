<script setup lang="ts">
import { useAuthStore } from 'src/stores/LoginAuth';
import { computed, watch, onMounted, ref } from 'vue';
import {
  updateTripsForm,
  getAllPortStorables,
  getTruckStorables,
  getAllTrips,
} from 'src/stores/ShipmentStore';
import { Loading, QSpinnerIos, useQuasar } from 'quasar';
import { tripsForm } from 'src/stores/AllPostReactive';
import { sizeArr } from 'src/utils';
import type { Trips, TripInputItem } from 'src/utils/static/types';

onMounted(async () => {
  await graphPorts.fetchPortStores();
  await graphTrips.fetchTrips();
  await graphTruckDropDown.fetchTruckStores();
});

const sizeOptions = ref(sizeArr);
const authStore = useAuthStore();
const graphTrips = getAllTrips();
const updateTrips = updateTripsForm();
const graphPorts = getAllPortStorables();
const graphTruckDropDown = getTruckStorables();
const $q = useQuasar();
const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
  emit('update:modelValue', false);
};

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
const sizeSelectOptions = computed(() => {
  return sizeOptions.value.map((port) => ({
    label: port.label,
    value: port.size,
  }));
});

const props = defineProps<{
  modelValue: boolean;
  row: Trips | null;
}>();

const inputArr = computed((): TripInputItem[] => [
  { key: 'truck', inputVModel: 'truck_id', colSpace: '6', label: 'Truck ID', type: 'select' },
  { key: 'port', inputVModel: 'port_id', colSpace: '6', label: 'Port ID', type: 'select' },
  {
    key: 'warehouse',
    inputVModel: 'warehouse_id',
    colSpace: '6',
    label: 'Warehouse ID',
    type: 'select',
  },
  {
    key: 'container',
    inputVModel: 'container_id',
    colSpace: '6',
    label: 'Container ID',
    type: 'select',
  },
  { key: 'commodity', inputVModel: 'commodity', colSpace: '4', label: 'Commodity', type: 'text' },
  { key: 'volx', inputVModel: 'volumex', colSpace: '4', label: 'Volume', type: 'number' },
  {
    key: 'date_delivered',
    inputVModel: 'date_delivered',
    colSpace: '4',
    label: 'Date Delivered',
    type: 'date',
  },
]);

watch(
  () => props.row,
  (newVal) => {
    if (newVal) {
      tripsForm.id = newVal.id;
      tripsForm.commodity = newVal.commodity;
      tripsForm.truck_id = newVal.truck?.id || '';
      tripsForm.port_id = newVal.port?.id || '';
      tripsForm.warehouse_id = newVal.warehouse?.id || '';
      tripsForm.container_id = newVal.container?.id || '';
      tripsForm.base_rate = newVal.base_rate;
      tripsForm.volumex = newVal.volumex;
      // tripsForm.volumey = newVal.volumey;
      tripsForm.date_delivered = newVal.date_delivered;
      tripsForm.finances = newVal.financeSummary?.map((f) => ({ ...f })) || [];
    }
  },
  { immediate: true },
);

const updateNewTripsInfo = async () => {
  if (!props.row?.id || updateTrips.loading) return;

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Authenticating... please wait.',
    backgroundColor: 'primary',
  });

  try {
    const response = await updateTrips.submitUpdateTrip();

    console.log('Success on Updating Trip Info: ', response);
    $q.notify({
      type: 'positive',
      position: 'top',
      message: 'Successfully updated trip',
      timeout: 3000,
    });
    await graphTrips.fetchTrips();
  } catch (err) {
    console.error('Error on updating Trips Info: ', err);
    $q.notify({
      type: 'negative',
      position: 'top',
      message: 'Error updating trip',
      timeout: 3000,
    });
    throw err;
  } finally {
    Loading.hide();
    closeDialog();
  }
};
</script>
<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card style="min-width: 550px">
      <q-form>
        <q-card-section>
          <div class="text-overline text-weight-bolder text-primary">Edit Trips Info</div>
          <div class="row q-col-gutter-sm">
            <div v-for="item in inputArr" :key="item.key" :class="'col-' + item.colSpace">
              <q-select
                v-if="item.inputVModel === 'truck_id'"
                v-model="tripsForm[item.inputVModel]"
                :options="truckSelectOptions"
                :label="item.label"
                emit-value
                map-options
                outlined
              />

              <q-select
                v-else-if="item.inputVModel === 'port_id'"
                v-model="tripsForm[item.inputVModel]"
                :options="portSelectOptions"
                :label="item.label"
                emit-value
                map-options
                outlined
              />

              <q-select
                v-else-if="item.inputVModel === 'volumex'"
                v-model="tripsForm[item.inputVModel]"
                :options="sizeSelectOptions"
                :label="item.label"
                emit-value
                map-options
                outlined
              />

              <q-input
                v-else-if="item.inputVModel === 'date_delivered'"
                v-model="tripsForm[item.inputVModel]"
                :label="item.label"
                type="date"
                emit-value
                map-options
                outlined
              />

              <q-input
                v-else
                v-model="tripsForm[item.inputVModel] as any"
                class="input-uppercase"
                type="text"
                :label="item.label"
                outlined
              />
            </div>
          </div>

          <div
            v-if="
              props.row?.financeSummary?.length &&
              ['Super Admin', 'Admin'].includes(authStore.roleLabel)
            "
          >
            <div class="text-overline text-weight-bolder text-primary q-pt-sm">Finance Summary</div>
            <div
              v-for="(item, index) in tripsForm.finances"
              :key="index"
              class="row q-col-gutter-sm q-mb-sm"
            >
              <div class="col-8">
                <q-input
                  v-model="item.title"
                  :readonly="!['Super Admin', 'Admin'].includes(authStore.roleLabel)"
                  class="input-uppercase"
                  label="Title"
                  outlined
                />
              </div>

              <div class="col-4">
                <q-input
                  :model-value="
                    item.type === 'percentage'
                      ? (item.value * 100).toFixed(2) + '%'
                      : item.value.toLocaleString()
                  "
                  @update:model-value="
                    (val) =>
                      (item.value = item.type === 'percentage' ? Number(val) / 100 : Number(val))
                  "
                  :prefix="item.type === 'percentage' ? '%' : '₱'"
                  :readonly="!['Super Admin', 'Admin'].includes(authStore.roleLabel)"
                  label="Value"
                  outlined
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            outline
            label="Update Trip Info"
            style="color: green"
            :loading="updateTrips.loading"
            :disable="updateTrips.loading"
            @click="updateNewTripsInfo"
          />
          <q-btn outline style="color: red" label="Close" @click="closeDialog" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
