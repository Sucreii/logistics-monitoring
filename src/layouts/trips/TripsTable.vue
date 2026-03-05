<script lang="ts" setup>
import { computed, ref, watch, onMounted } from 'vue';
import { getAllTrips, searchTripsItem } from 'src/stores/ShipmentStore';
import { pagination } from 'src/stores/AllPostReactive';
import { useAuthStore } from 'src/stores/LoginAuth';
import type { TableRequestProps } from 'src/utils/static/types';
import type { QTableColumn } from 'quasar';
import type { Trips } from 'src/utils/static/types';
import MoreModal from './TripsInfoModal.vue';
import EditModal from './EditTripsModal.vue';

onMounted(async () => {
  await onRequest({ pagination: pagination.value });
});

const graphTrips = getAllTrips();
const authStore = useAuthStore();
const searchTripStore = searchTripsItem();
const selectedTripInfoRow = ref<Trips>();
const showModalMoreInfo = ref(false);
const showModalEditInfo = ref(false);
const tableRows = computed(() => {
  if (searchTripStore.searchResults.length > 0) {
    return (searchTripStore.searchResults || []).map((item) => ({
      ...item,
      truckId: item.truck?.id ?? '-',
      warehouseId: item.warehouse?.id ?? '-',
      containerId: item.container?.id ?? '-',
      portId: item.port?.id ?? '-',
      dateDelivered: unixToYMD(Number(item.date_delivered)) ?? '-',
    }));
  }

  return (graphTrips.trips || []).map((item) => ({
    ...item,
    truckId: item.truck?.id ?? '-',
    warehouseId: item.warehouse?.id ?? '-',
    containerId: item.container?.id ?? '-',
    portId: item.port?.id ?? '-',
    dateDelivered: unixToYMD(Number(item.date_delivered)) ?? '-',
  }));
});

function unixToYMD(unixSeconds: number) {
  const date = new Date(unixSeconds);

  const formattedDate = date.toISOString().split('T')[0];
  if (formattedDate === '1970-01-01') {
    return 'IN-TRANSIT';
  } else {
    return formattedDate;
  }
}

watch(
  () => graphTrips.totalCount,
  (val) => {
    pagination.value.rowsNumber = val;
  },
  { immediate: true },
);

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
  // { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'truckId', label: 'Truck', field: 'truckId', align: 'left' },
  { name: 'commodity', label: 'Commodity', field: 'commodity', align: 'left' },
  { name: 'warehouseId', label: 'Warehouse', field: 'warehouseId', align: 'left' },
  { name: 'containerId', label: 'Container', field: 'containerId', align: 'left' },
  { name: 'portId', label: 'Port', field: 'portId', align: 'left' },
  { name: 'dateDelivered', label: 'Date Delivered', field: 'dateDelivered', align: 'left' },
  { name: 'action', label: 'More Info', field: 'action', align: 'left' },
];

const moreDetails = (row: Trips) => {
  selectedTripInfoRow.value = row;
  showModalMoreInfo.value = true;
};

const editShipmentInfo = (row: Trips) => {
  selectedTripInfoRow.value = row;
  showModalEditInfo.value = true;
};
</script>
<template>
  <q-card-section class="q-pt-none">
    <q-table
      v-model:pagination="pagination"
      class="input-uppercase"
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

          <q-btn
            v-if="authStore.roleLabel !== 'Worker'"
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
  <MoreModal v-if="selectedTripInfoRow" v-model="showModalMoreInfo" :row="selectedTripInfoRow" />
  <EditModal v-if="selectedTripInfoRow" v-model="showModalEditInfo" :row="selectedTripInfoRow" />
</template>
