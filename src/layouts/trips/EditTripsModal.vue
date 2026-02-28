<script setup lang="ts">
import { computed, watch } from 'vue';
import { updateTripsForm } from 'src/stores/ShipmentStore';
import { Loading, QSpinnerIos, useQuasar } from 'quasar';
import { tripsForm } from 'src/stores/AllPostReactive';
import type { Trips, TripInputItem } from 'src/utils/static/types';

// const graphTrips = getAllTrips();
const updateTrips = updateTripsForm();
const $q = useQuasar();
const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
  emit('update:modelValue', false);
};

const props = defineProps<{
  modelValue: boolean;
  row: Trips | null;
}>();

const inputArr = computed((): TripInputItem[] => [ 
  { key: 'commodity', inputVModel: 'commodity', colSpace: '6', label: 'Commodity' },
  { key: 'warehouse', inputVModel: 'warehouse_id', colSpace: '6', label: 'Warehouse ID' },
  { key: 'truck', inputVModel: 'truck_id', colSpace: '4', label: 'Truck ID' },
  { key: 'port', inputVModel: 'port_id', colSpace: '4', label: 'Port ID' },
  { key: 'container', inputVModel: 'container_id', colSpace: '4', label: 'Container ID' },
  { key: 'baseRate', inputVModel: 'base_rate', colSpace: '6', label: 'Base Rate' },
  { key: 'volx', inputVModel: 'volumex', colSpace: '3', label: 'Vol X' },
  { key: 'voly', inputVModel: 'volumey', colSpace: '3', label: 'Vol Y' },
])

watch(() => props.row, (newVal) => {
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
    tripsForm.finances = newVal.financeSummary?.map(f => ({ ...f })) || []
  }
}, { immediate: true })

const updateNewTripsInfo = async () => {
  if (!props.row?.id || updateTrips.loading) return;
  console.log('Updating Trip Info: ', props.row);

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Authenticating... please wait.',
    backgroundColor: 'primary',
  });

  try{
    const response = await updateTrips.submitUpdateTrip();

    console.log('Success on Updating Trip Info: ', response)
    $q.notify({
      type: 'positive',
      position: 'top',
      message: response.data.message,
      timeout: 3000,
    })

    closeDialog();
    // await graphTrips.fetchTrips();
  } catch (err) {
    console.error('Error on updating Trips Info: ', err)
    throw err;
  } finally {
    Loading.hide();
  }
}
</script>
<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card style="min-width: 550px">
      <q-form>
        <q-card-section>
          <div class="text-overline text-weight-bolder text-primary">Edit Trips Info</div>
          <div class="row q-col-gutter-sm">
            <div 
              v-for="item in inputArr" 
              :key="item.key"
              :class="'col-' + item.colSpace"
            >
              <q-input
                v-model="(tripsForm[item.inputVModel] as any)"
                :type="item.inputVModel === 'volumex' || item.inputVModel === 'volumey' ? 'number' : 'text'"
                :label="item.label"
                outlined
              />
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
