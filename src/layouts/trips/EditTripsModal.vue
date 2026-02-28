<script setup lang="ts">
import { computed, watch, onMounted } from 'vue';
import { updateTripsForm, getAllPortStorables, getTruckStorables, getAllTrips } from 'src/stores/ShipmentStore';
import { Loading, QSpinnerIos, useQuasar } from 'quasar';
import { tripsForm } from 'src/stores/AllPostReactive';
import type { Trips, TripInputItem } from 'src/utils/static/types';

onMounted(async () => {
  await graphPorts.fetchPortStores();
  await graphTrips.fetchTrips();
  await graphTruckDropDown.fetchTruckStores();
});

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
  console.log('I AM TRUCK SELECT', graphTruckDropDown)
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

const props = defineProps<{
  modelValue: boolean;
  row: Trips | null;
}>();

const inputArr = computed((): TripInputItem[] => [
  { key: 'truck', inputVModel: 'truck_id', colSpace: '6', label: 'Truck ID', type: 'select' },
  { key: 'port', inputVModel: 'port_id', colSpace: '6', label: 'Port ID', type: 'select' },
  { key: 'warehouse', inputVModel: 'warehouse_id', colSpace: '6', label: 'Warehouse ID', type: 'select' },
  { key: 'container', inputVModel: 'container_id', colSpace: '6', label: 'Container ID', type: 'select' },
  { key: 'commodity', inputVModel: 'commodity', colSpace: '6', label: 'Commodity', type: 'text' },
  { key: 'baseRate', inputVModel: 'base_rate', colSpace: '6', label: 'Base Rate', type: 'number' },
  { key: 'volx', inputVModel: 'volumex', colSpace: '3', label: 'Vol X', type: 'number' },
  { key: 'voly', inputVModel: 'volumey', colSpace: '3', label: 'Vol Y', type: 'number' },
  // { key: 'dateCreated', inputVModel: 'date_delivered', colSpace: '6', label: 'Date Created', type: 'date' },
]);

watch(
  () => props.row,
  (newVal) => {
    if (newVal && props.modelValue) {
      tripsForm.id = newVal.id;
      tripsForm.commodity = newVal.commodity;
      tripsForm.truck_id = newVal.truck?.id || '';
      tripsForm.port_id = newVal.port?.id || '';
      tripsForm.warehouse_id = newVal.warehouse?.id || '';
      tripsForm.container_id = newVal.container?.id || '';
      tripsForm.base_rate = newVal.base_rate;
      tripsForm.volumex = newVal.volumex;
      tripsForm.volumey = newVal.volumey;
      // tripsForm.date_delivered = newVal.date_delivered;
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
    // await graphTrips.fetchTrips();
  } catch (err) {
    console.error('Error on updating Trips Info: ', err);
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
                v-else-if="item.inputVModel === 'warehouse_id'"
                v-model="tripsForm[item.inputVModel]"
                :options="warehouseSelectOptions"
                :label="item.label"
                emit-value
                map-options
                outlined
              />

              <q-select
                v-else-if="item.inputVModel === 'container_id'"
                v-model="tripsForm[item.inputVModel]"
                :options="containerSelectOptions"
                :label="item.label"
                emit-value
                map-options
                outlined
              />

              <!-- <q-input
                v-else-if="item.inputVModel === 'date_delivered'"
                v-model="tripsForm[item.inputVModel]"
                :label="item.label"
                outlined
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="tripsForm[item.inputVModel]" mask="YYYY-MM-DD" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input> -->

              <q-input
                v-else
                v-model="tripsForm[item.inputVModel] as any"
                :type="
                  item.inputVModel === 'volumex' || item.inputVModel === 'volumey'
                    ? 'number'
                    : 'text'
                "
                :label="item.label"
                outlined
              />
            </div>

            
            <div class="col-12">
              <!-- <q-input
                v-model="tripsForm['date_delivered'] as string"
                label="Date Delivered"
                outlined
                dense
                readonly
              >
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="tripsForm['date_delivered'] as string" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input> -->
            </div>
          </div>

          <div v-if="props.row?.financeSummary?.length">
            <div class="text-overline text-weight-bolder text-primary">Finance Summary</div>
            <div
              v-for="(item, index) in props.row.financeSummary"
              :key="index"
              class="row q-col-gutter-sm q-mb-sm"
            >
              <div class="col-8">
                <q-input :model-value="item.title" label="Title" outlined readonly />
              </div>

              <div class="col-4">
                <q-input
                  :model-value="
                    item.type === 'percentage'
                      ? (item.value * 100).toFixed(2) + '%'
                      : item.value.toLocaleString()
                  "
                  label="Value"
                  outlined
                  readonly
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
