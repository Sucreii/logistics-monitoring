<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { getAllShipment } from 'src/stores/ShipmentStore';
import { tableShipmentConstant } from 'src/utils/index';
import { pagination } from 'src/stores/AllPostReactive';
import type { TableRequestProps } from 'src/utils/static/types';
import type { QTableColumn } from 'quasar';
import type { Shipment } from 'src/utils/static/types';
import searchAddButt from '../shipments/SearchandAdd.vue';
import MoreModal from './MoreInfoModal.vue';

onMounted(async () => {
  // await graphShipment.fetchShipments();
  await onRequest({ pagination: pagination.value });
  console.log('Shipments fetched: ', graphShipment.shipments);
});

const graphShipment = getAllShipment();
const selectedInfoRow = ref<Shipment>();
const showModalMoreInfo = ref(false);
const tableRows = computed(() => {
  return graphShipment.shipments.length > 0 ? graphShipment.shipments : tableShipmentConstant;
});

watch(
  () => graphShipment.totalCount,
  (val) => {
    pagination.value.rowsNumber = val;
  },
);

const onRequest = async (props: TableRequestProps) => {
  const page = props.pagination.page || 1;
  const rowsPerPage = props.pagination.rowsPerPage || 10;
  const skip = (page - 1) * rowsPerPage;
  const take = rowsPerPage;

  await graphShipment.fetchShipments(skip, take);

  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
};

const moreDetails = (row: Shipment) => {
  selectedInfoRow.value = row;
  showModalMoreInfo.value = true;

  console.log('Modal Open: ', showModalMoreInfo.value);
  console.log('I AM SHIPMENT MODAL: ', row.blno);
  console.log('I AM SHIPMENT MODAL: ', row.financeSummary);
};

const columns: QTableColumn[] = [
  { name: 'warehouse_id', label: 'Warehouse', field: 'warehouse_id', align: 'left' },
  { name: 'blno', label: 'B/L No', field: 'blno', align: 'left' },
  { name: 'contract_no', label: 'Contract No', field: 'contract_no', align: 'left' },
  { name: 'entry_no', label: 'Entry No', field: 'entry_no', align: 'left' },
  { name: 'reference', label: 'Reference', field: 'reference', align: 'left' },
  { name: 'registry_no', label: 'Registry No', field: 'registry_no', align: 'center' },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'volumex', label: 'Volume X', field: 'volumex', align: 'center' },
  { name: 'volumey', label: 'Volume Y', field: 'volumey', align: 'center' },
  // { name: 'issuer', label: 'Issuer', field: 'issuer', align: 'left' },
  // { name: 'customer', label: 'Consignee', field: 'customer', align: 'left' },
  {
    name: 'issuer',
    label: 'Issuer',
    field: (row) => row.issuer?.username || '',
    align: 'left',
  },
  {
    name: 'customer',
    label: 'Consignee',
    field: (row) => row.customer?.username || '',
    align: 'left',
  },
  {
    name: 'containers',
    label: 'Containers',
    field: (row: Shipment) => {
      if (!row.containers || !Array.isArray(row.containers)) return 'None';
      return row.containers.map((container) => container.id).join(', ');
    },
    align: 'left',
  },
  { name: 'action', label: 'More Info', field: 'action', align: 'center' },
];
</script>
<template>
  <div class="col-12">
    <q-card flat bordered>
      <q-card-section>
        <searchAddButt />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          v-model:pagination="pagination"
          :rows="tableRows"
          :columns="columns"
          :loading="graphShipment.loading"
          :rows-per-page-options="[10, 20, 50, 100]"
          @request="onRequest"
          row-key="id"
          bordered
          flat
        >
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn icon="info" color="primary" flat round dense @click="moreDetails(props.row)">
                <q-tooltip>View Finance Summary</q-tooltip>
              </q-btn>
            </q-td>
          </template>

          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <MoreModal v-if="selectedInfoRow" v-model="showModalMoreInfo" :row="selectedInfoRow" />
  </div>
</template>
