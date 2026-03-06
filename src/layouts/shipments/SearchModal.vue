<script setup lang="ts">
import { computed, watch, ref, onMounted } from 'vue';
import { Loading, QSpinnerIos, useQuasar } from 'quasar';
import { updateShipmentForm, getAllShipment, getAllUsers } from 'src/stores/ShipmentStore';
import { shipmentForm } from 'src/stores/AllPostReactive';
import { useAuthStore } from 'src/stores/LoginAuth';
import { portArr, selectivityArr, sizeArr, statusArr } from 'src/utils';
import type { Shipment, InputItem } from 'src/utils/static/types';

onMounted(async () => {
  await graphUsers.fetchUsers();
});

const portOptions = ref(portArr);
const selectOptions = ref(selectivityArr);
const sizeOptions = ref(sizeArr);
const statusOptions = ref(statusArr);
const authStore = useAuthStore();
const graphUsers = getAllUsers();
const updateShipInfo = updateShipmentForm();
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

const userSelectOptions = computed(() => {
  return graphUsers.user
    .filter((user) => {
      if (Number(user.role.id) == 4) {
        return user;
      }
    })
    .map((user) => ({
      label: user.username,
      value: user.username,
    }));
});
const portSelectOptions = computed(() => {
  return portOptions.value.map((port) => ({
    label: port.label,
    value: port.value,
  }));
});
const statusSelectOptions = computed(() => {
  return statusOptions.value.map((port) => ({
    label: port.label,
    value: port.value,
  }));
});
const selectivitySelectOptions = computed(() => {
  return selectOptions.value.map((port) => ({
    label: port.label,
    value: port.value,
  }));
});
const sizeSelectOptions = computed(() => {
  return sizeOptions.value.map((port) => ({
    label: port.label,
    value: port.size,
  }));
});

const inputArr = computed((): InputItem[] => [
  { key: 'selectivity', inputVModel: 'selectivity', colSpace: '4', label: 'Selectivity' },
  { key: 'status', inputVModel: 'status', colSpace: '4', label: 'Status' },
  { key: 'consignee', inputVModel: 'customer_username', colSpace: '4', label: 'Consignee' },
  // { key: 'wareID', inputVModel: 'warehouse_id', colSpace: '4', label: 'Warehouse ID' },
  // { key: 'containNo', inputVModel: 'containers', colSpace: '4', label: 'Container No.' },
  { key: 'contractNo', inputVModel: 'contract_no', colSpace: '4', label: 'Contract No.' },
  { key: 'regNo', inputVModel: 'registry_no', colSpace: '4', label: 'Registry No.' },
  { key: 'entNo', inputVModel: 'entry_no', colSpace: '4', label: 'Entry No.' },
  { key: 'blno', inputVModel: 'blno', colSpace: '3', label: 'Bill of Lading' },
  { key: 'port', inputVModel: 'port_id', colSpace: '3', label: 'Port' },
  { key: 'volx', inputVModel: 'volumex', colSpace: '2', label: 'Volume' },
  { key: 'voly', inputVModel: 'volumey', colSpace: '2', label: 'Size' },
  { key: 'shipline', inputVModel: 'shipping_line', colSpace: '2', label: 'Shipping' },
  {
    key: 'estimated_time_arrival',
    inputVModel: 'estimated_time_arrival',
    colSpace: '6',
    label: 'Estimated Date of Arrival',
  },
  {
    key: 'actual_time_arrival',
    inputVModel: 'actual_time_arrival',
    colSpace: '6',
    label: 'Actual Date of Arrival',
  },
]);

watch(
  () => props.row,
  (newVal) => {
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
      // shipmentForm.issuer_username = newVal.issuer?.username || '';
      shipmentForm.estimated_time_arrival = newVal.estimated_time_arrival || '';
      shipmentForm.actual_time_arrival = newVal.actual_time_arrival || '';
      // shipmentForm.containers = newVal.containers.map((c) => c.id);
      shipmentForm.containers = newVal.containers.map((f) => ({
        container_id: f.id,
        warehouse_id: f.warehouse_id,
      }));
      shipmentForm.finances = newVal.financeSummary.map((f) => ({
        title: f.title,
        type: f.type,
        value: f.value,
      }));
    }
  },
  { immediate: true },
);

const updateNewShipmentInfo = async () => {
  if (!props.row?.id) return;

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Authenticating... please wait.',
    backgroundColor: 'primary',
  });

  try {
    const response = await updateShipInfo.submitUpdateShipment();

    if (response.id) {
      $q.notify({
        type: 'positive',
        position: 'top',
        message: 'Shipment info updated successfully!',
        timeout: 3000,
      });
    }

    if (response.error) {
      console.log('SHIPMENT UPDATE ERROR RESPONSE: ', response);
      $q.notify({
        type: 'negative',
        position: 'top',
        message: 'Error updating shipment',
        timeout: 3000,
      });
    }

  } catch (err) {
    console.error('SHIPMENT UPDATE ERROR RESPONSE: ', err);
    $q.notify({
      type: 'negative',
      position: 'top',
      message: 'Error updating shipment',
      timeout: 3000,
    });
    throw err;
  } finally {
    Loading.hide();
    closeDialog();
    await graphShipment.fetchShipments();
  }
};
</script>
<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card style="min-width: 600px">
      <q-form>
        <q-card-section>
          <div class="text-overline text-weight-bolder text-primary">Edit Shipment Info</div>
          <div class="row q-col-gutter-sm">
            <div v-for="item in inputArr" :key="item.key" :class="'col-' + item.colSpace">
              <q-select v-if="item.inputVModel === 'port_id'" v-model="shipmentForm[item.inputVModel]"
                :readonly="!['Super Admin'].includes(authStore.roleLabel)" :options="portSelectOptions"
                :label="item.label" emit-value map-options outlined />

              <q-select v-else-if="item.inputVModel === 'selectivity'" v-model="shipmentForm[item.inputVModel]"
                :input-class="`text-${props.row?.selectivity.toLowerCase()}`"
                :readonly="!['Super Admin'].includes(authStore.roleLabel)" :options="selectivitySelectOptions"
                :label="item.label" emit-value map-options outlined />

              <q-select v-else-if="item.inputVModel === 'status'" v-model="shipmentForm[item.inputVModel]"
                :readonly="!['Super Admin'].includes(authStore.roleLabel)" :options="statusSelectOptions"
                :label="item.label" emit-value map-options outlined />

              <q-select v-else-if="item.inputVModel === 'volumey'" v-model="shipmentForm[item.inputVModel]"
                :readonly="!['Super Admin'].includes(authStore.roleLabel)" :options="sizeSelectOptions"
                :label="item.label" emit-value map-options outlined />

              <q-select v-else-if="item.inputVModel === 'customer_username'" v-model="shipmentForm[item.inputVModel]"
                :readonly="!['Super Admin'].includes(authStore.roleLabel)" :options="userSelectOptions"
                :label="item.label" emit-value map-options outlined />

              <q-input v-else-if="item.inputVModel === 'estimated_time_arrival'"
                :model-value="shipmentForm[item.inputVModel]?.split('T')[0]" :label="item.label" type="date"
                class="input-uppercase" outlined readonly />

              <q-input v-else-if="item.inputVModel === 'actual_time_arrival'" v-model="shipmentForm[item.inputVModel]"
                :readonly="!['Super Admin'].includes(authStore.roleLabel)" :label="item.label" type="date"
                class="input-uppercase" stack-label outlined />

              <q-input v-else v-model="shipmentForm[item.inputVModel] as any"
                :readonly="!['Super Admin'].includes(authStore.roleLabel)" :label="item.label" type="text"
                class="input-uppercase" outlined />
            </div>
          </div>

          <div v-if="shipmentForm.containers?.length" class="q-pt-sm">
            <div v-for="(item, index) in shipmentForm.containers" :key="index" class="row q-col-gutter-sm q-mb-sm">
              <div class="col-6">
                <q-input v-model="item.container_id" :readonly="!['Super Admin'].includes(authStore.roleLabel)"
                  class="input-uppercase" label="Container ID" outlined />
              </div>

              <div class="col-6">
                <q-input v-model="item.warehouse_id" :readonly="!['Super Admin'].includes(authStore.roleLabel)"
                  class="input-uppercase" label="Warehouse" outlined />
              </div>
            </div>
          </div>

          <div v-if="
            shipmentForm.finances?.length &&
            ['Super Admin', 'Admin'].includes(authStore.roleLabel)
          ">
            <div class="text-overline text-weight-bolder text-primary q-pt-sm">Finance Summary</div>
            <div v-for="(item, index) in shipmentForm.finances" :key="index" class="row q-col-gutter-sm q-mb-sm">
              <div class="col-8">
                <q-input v-model="item.title" :readonly="!['Super Admin'].includes(authStore.roleLabel)"
                  class="input-uppercase" label="Title" outlined />
              </div>

              <div class="col-4">
                <q-input :model-value="item.type === 'percentage'
                  ? (item.value * 100).toFixed(2)
                  : Number(item.value).toFixed(2)
                  " @update:model-value="
                    (val) =>
                      (item.value = item.type === 'percentage' ? Number(val) / 100 : Number(val))
                  " :prefix="item.type === 'percentage' ? '%' : '₱'"
                  :readonly="!['Super Admin'].includes(authStore.roleLabel)" label="Value" type="number" outlined />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline label="Update Shipment Info" style="color: green" @click="updateNewShipmentInfo" />
          <q-btn outline style="color: red" label="Close" @click="closeDialog" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
