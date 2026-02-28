<script setup lang="ts">
import { computed, watch } from 'vue';
import { Loading, QSpinnerIos, useQuasar } from 'quasar';
import { shipmentForm } from 'src/stores/AllPostReactive';
import { updateShipmentForm, getAllShipment } from 'src/stores/ShipmentStore';
import type { Shipment, InputItem } from 'src/utils/static/types';

const updateShipInfo = updateShipmentForm()
const graphShipment = getAllShipment();
const $q = useQuasar();
const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
  emit('update:modelValue', false);
};

const props = defineProps<{
  modelValue: boolean;
  row: Shipment | null;
}>();

const inputArr = computed((): InputItem[] => [ 
  { key: 'selectivity', inputVModel: 'selectivity', colSpace: '4', label: 'Selectivity' },
  { key: 'status', inputVModel: 'status', colSpace: '4', label: 'Status' },
  // { key: 'refID', inputVModel: 'reference', colSpace: '3', label: 'Reference ID' },
  { key: 'consignee', inputVModel: 'customer_username', colSpace: '4', label: 'Consignee' },
  { key: 'wareID', inputVModel: 'warehouse_id', colSpace: '4', label: 'Warehouse ID' },
  { key: 'containNo', inputVModel: 'containers', colSpace: '4', label: 'Container No.' },
  { key: 'contractNo', inputVModel: 'contract_no', colSpace: '4', label: 'Contract No.' },
  { key: 'regNo', inputVModel: 'registry_no', colSpace: '4', label: 'Registry No.' },
  { key: 'entNo', inputVModel: 'entry_no', colSpace: '4', label: 'Entry No.' },
  { key: 'issuer', inputVModel: 'issuer_username', colSpace: '4', label: 'Issuer' },
  { key: 'blno', inputVModel: 'blno', colSpace: '4', label: 'Bill of Landing' },
  { key: 'port', inputVModel: 'port_id', colSpace: '4', label: 'Port' },
  { key: 'volx', inputVModel: 'volumex', colSpace: '2', label: 'Vol X' },
  { key: 'voly', inputVModel: 'volumey', colSpace: '2', label: 'Vol Y' },
  { key: 'shipline', inputVModel: 'shipping_line', colSpace: '6', label: 'Shipping Line' },
])

watch(() => props.row, (newVal) => {
  if (newVal) {
    shipmentForm.id = newVal.id;
    shipmentForm.selectivity = newVal.selectivity;
    shipmentForm.status = newVal.status;
    shipmentForm.blno = newVal.blno;
    shipmentForm.contract_no = newVal.contract_no;
    shipmentForm.registry_no = newVal.registry_no;
    shipmentForm.entry_no = newVal.entry_no;
    shipmentForm.port_id = newVal.port_id;
    // shipmentForm.reference = newVal.reference;
    shipmentForm.warehouse_id = newVal.warehouse_id;
    shipmentForm.volumex = newVal.volumex;
    shipmentForm.volumey = newVal.volumey;
    shipmentForm.shipping_line = newVal.shipping_line;
    shipmentForm.customer_username = newVal.customer?.username || '';
    shipmentForm.issuer_username = newVal.issuer?.username || '';
    shipmentForm.estimated_time_arrival = newVal.estimated_time_arrival;
    shipmentForm.containers = newVal.containers.map(c => c.id);
    shipmentForm.finances = newVal.financeSummary.map(f => ({
      title: f.title,
      type: f.type,
      value: f.value
    }))
  }
}, { immediate: true })

const updateNewShipmentInfo = async () => {
  if (!props.row?.id) return;

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Authenticating... please wait.',
    backgroundColor: 'primary',
  });

  try{
    const response = await updateShipInfo.submitUpdateShipment();
    $q.notify({
      type: 'positive',
      position: 'top',
      message: response.data.message,
      timeout: 3000,
    })
  } catch (err) {
    console.error('Error on updating Shipment Info: ', err)
    throw err;
  } finally {
    Loading.hide();
    closeDialog();

    await graphShipment.fetchShipments();
  }
}

</script>
<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card style="min-width: 550px">
      <q-form>
        <q-card-section>
          <div class="text-overline text-weight-bolder text-primary">Edit Shipment Info</div>
          <div class="row q-col-gutter-sm">
            <div 
              v-for="item in inputArr" 
              :key="item.key"
              :class="'col-' + item.colSpace"
            >
              <q-input
                v-model="(shipmentForm[item.inputVModel] as any)"
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
            label="Update Shipment Info"
            style="color: green"
            @click="updateNewShipmentInfo"
          />
          <q-btn outline style="color: red" label="Close" @click="closeDialog" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
