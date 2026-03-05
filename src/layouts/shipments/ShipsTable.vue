<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { getAllShipment } from 'src/stores/ShipmentStore';
import { searchShipmentsItem } from 'src/stores/ShipmentStore';
import { pagination } from 'src/stores/AllPostReactive';
import type { TableRequestProps } from 'src/utils/static/types';
import type { QTableColumn } from 'quasar';
import type { Shipment } from 'src/utils/static/types';
import searchAddButt from '../shipments/SearchandAdd.vue';
import MoreModal from './MoreInfoModal.vue';
import EditModal from './SearchModal.vue';

onMounted(async () => {
  await onRequest({ pagination: pagination.value });
});

const graphShipment = getAllShipment();
const searchShipStore = searchShipmentsItem();
const selectedInfoRow = ref<Shipment>();
const showModalMoreInfo = ref(false);
const showModalEditInfo = ref(false);
const tableRows = computed(() => {
  if (searchShipStore.searchResults.length > 0) {
    return searchShipStore.searchResults;
  }

  return graphShipment.shipments;
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
};

const editShipmentInfo = (row: Shipment) => {
  selectedInfoRow.value = row;
  showModalEditInfo.value = true;
};

const columns: QTableColumn[] = [
  {
    name: 'selectivity',
    label: 'Selectivity',
    field: 'selectivity',
    align: 'left',
  },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'blno', label: 'B/L No', field: 'blno', align: 'left' },
  { name: 'shipLine', label: 'Shipping Line', field: (row) => row.shipping_line, align: 'left' },
  { name: 'port_id', label: 'Port', field: (row) => row.port_id, align: 'left' },
  { name: 'contract_no', label: 'Contract No', field: 'contract_no', align: 'left' },
  { name: 'entry_no', label: 'Entry No', field: 'entry_no', align: 'left' },
  { name: 'reference', label: 'Reference', field: 'reference', align: 'center' },
  { name: 'registry_no', label: 'Registry No', field: 'registry_no', align: 'center' },
  { name: 'volumex', label: 'Volume', field: 'volumex', align: 'center' },
  { name: 'volumey', label: 'Size', field: 'volumey', align: 'center' },
  {
    name: 'customer',
    label: 'Consignee',
    field: (row) => row.customer?.username || '',
    align: 'left',
  },
  {
    name: 'estimated_time_arrival',
    label: 'ETA',
    field: (row) => row.estimated_time_arrival?.split('T')[0] || 'N/A',
    align: 'center',
  },
  {
    name: 'actual_time_arrival',
    label: 'Date Arrived',
    field: (row) => row.actual_time_arrival?.split('T')[0] || 'N/A',
    align: 'right',
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
          <template v-slot:body-cell-selectivity="props">
            <q-td :props="props">
              <span :class="`text-${props.row.selectivity?.toLowerCase()}`">
                {{ props.row.selectivity }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn icon="info" color="primary" flat round dense @click="moreDetails(props.row)">
                <q-tooltip>View Finance Summary</q-tooltip>
              </q-btn>

              <q-btn
                @click="editShipmentInfo(props.row)"
                icon="sym_o_edit_square"
                color="primary"
                flat
                round
              />
            </q-td>
          </template>

          <template v-slot:loading>
            <q-inner-loading showing color="primary" />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <MoreModal v-model="showModalMoreInfo" :row="selectedInfoRow || null" />
    <EditModal v-model="showModalEditInfo" :row="selectedInfoRow || null" />
  </div>
</template>
