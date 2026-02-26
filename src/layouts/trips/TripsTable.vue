<script lang="ts" setup>
import { computed, ref } from 'vue';
import { getAllTrips } from 'src/stores/ShipmentStore';
// import { tableTripsConstant } from 'src/utils/index';
import type { QTableColumn } from 'quasar';
import type { Trips } from 'src/utils/static/types';
import MoreModal from './TripsInfoModal.vue';

const graphTrips = getAllTrips();
const selectedTripInfoRow = ref<Trips>();
const showModalMoreInfo = ref(false);

// const tableRows = computed(() => {
//   const sourceData =
//     graphTrips.trips?.length > 0
//       ? graphTrips.trips
//       : tableTripsConstant.map((item) => ({
//           id: item.id,
//           commodity: item.commodity ?? '',
//           truck: { id: item.truckId ?? '-', operator: null },
//           warehouse: { id: item.warehouse ?? '-', description: null },
//           container: { id: item.container ?? '-', description: null },
//           port: { id: item.port ?? '-', description: null },
//           financeSummary: [],
//         }));

//   if (!sourceData) return [];

//   return sourceData.map((item: Trips) => ({
//     id: item.id,
//     commodity: item.commodity,
//     truckId: item.truck?.id ?? '-',
//     warehouse: item.warehouse?.id ?? '-',
//     container: item.container?.id ?? '-',
//     port: item.port?.id ?? '-',
//     financeSummary: item.financeSummary ?? [],
//   }));
// });

const tableRows = computed(() => {
  const sourceData = graphTrips.trips?.length > 0 ? graphTrips.trips : [];

  return sourceData.map((item: Trips) => ({
    ...item,

    truckId: item.truck?.id ?? '-',
    warehouse: item.warehouse?.id ?? '-',
    container: item.container?.id ?? '-',
    port: item.port?.id ?? '-',
  }));
});

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

console.log('I AM TRIPS TABLE ROWS: ', tableRows);
</script>
<template>
  <q-card-section class="q-pt-none">
    <q-table
      :rows="tableRows"
      :columns="columns"
      :loading="graphTrips.loading"
      :rows-per-page-options="[10, 20, 50, 100]"
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
