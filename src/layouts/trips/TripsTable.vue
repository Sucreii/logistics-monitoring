<script lang="ts" setup>
import { computed, ref, watch, onMounted } from 'vue';
import { getAllTrips } from 'src/stores/ShipmentStore';
import { pagination } from 'src/stores/AllPostReactive';
import type { TableRequestProps } from 'src/utils/static/types';
import type { QTableColumn } from 'quasar';
import type { Trips } from 'src/utils/static/types';
import MoreModal from './TripsInfoModal.vue';

const graphTrips = getAllTrips();
const selectedTripInfoRow = ref<Trips>();
const showModalMoreInfo = ref(false);
const tableRows = computed(() => {
  // const sourceData = graphTrips.trips || [];

  return (graphTrips.trips || []).map((item) => ({
    ...item,
    truckId: item.truck?.id ?? '-',
    warehouse: item.warehouse?.id ?? '-',
    container: item.container?.id ?? '-',
    port: item.port?.id ?? '-',
  }));
});

const onRequest = async (props: TableRequestProps) => {
  const page = props.pagination.page || 1;
  const rowsPerPage = props.pagination.rowsPerPage || 10;
  const skip = (page - 1) * rowsPerPage;
  const take = rowsPerPage;

  await graphTrips.fetchTrips(skip, take);

  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
};

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'commodity', label: 'Commodity', field: 'commodity', align: 'left' },
  { name: 'truckId', label: 'Truck', field: 'truckId', align: 'left' },
  { name: 'warehouse', label: 'Warehouse', field: 'warehouse', align: 'left' },
  { name: 'container', label: 'Container', field: 'container', align: 'left' },
  { name: 'port', label: 'Port', field: 'port', align: 'left' },
  { name: 'action', label: 'More Info', field: 'action', align: 'left' },
];

const moreDetails = (row: Trips) => {
  selectedTripInfoRow.value = row;
  showModalMoreInfo.value = true;

  console.log('Modal Open: ', selectedTripInfoRow.value);
};

onMounted(async () => {
  await onRequest({ pagination: pagination.value });
  console.log('Trips fetched: ', graphTrips.trips);
});

watch(
  () => graphTrips.totalCount,
  (val) => {
    console.log('Total Count Updated:', val);
    pagination.value.rowsNumber = val;
  },
  { immediate: true },
);
</script>
<template>
  <q-card-section class="q-pt-none">
    <q-table
      v-model:pagination="pagination"
      :rows="tableRows"
      :columns="columns"
      :loading="graphTrips.loading"
      :rows-per-page-options="[10, 20, 50, 100]"
      @request="onRequest"
      row-key="id"
      bordered
      flat
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-sm"> </q-td>
      </template>

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
  <MoreModal v-if="selectedTripInfoRow" v-model="showModalMoreInfo" :row="selectedTripInfoRow" />
</template>
