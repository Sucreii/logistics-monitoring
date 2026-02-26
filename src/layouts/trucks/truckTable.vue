<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { getTruckStorables } from 'src/stores/ShipmentStore';
import { tableTruckProfileConstants } from 'src/utils/index';
import type { QTableColumn } from 'quasar';
import type { Trucks } from 'src/utils/static/types';
import filterForm from '../../layouts/trips/FilterForm.vue';
import truckHideModal from './TruckArchive.vue';
import truckUnHideModal from './TruckUnArchive.vue';

onMounted(async () => {
  await graphTrucks.fetchTruckStores();
  console.log('Truck Profiles fetched: ', graphTrucks.trucks);
});

const showModalHide = ref(false);
const showModalUnHide = ref(false);
const selectedRow = ref<Trucks | null>(null);
const graphTrucks = getTruckStorables();
const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'operator', label: 'Driver Name', field: 'operator', align: 'left' },
  //   { name: 'is_archived', label: 'Status', field: 'is_archived', align: 'left' },
  { name: 'date_added', label: 'Date Added', field: 'date_added', align: 'left' },
  { name: 'action', label: 'Action', field: 'action', align: 'center' },
];

const tableRows = computed(() => {
  return graphTrucks.trucks.length > 0 ? graphTrucks.trucks : tableTruckProfileConstants;
});
const openArchiveModal = (row: Trucks) => {
  selectedRow.value = row;
  showModalHide.value = true;
};
const openUnArchiveModal = (row: Trucks) => {
  selectedRow.value = row;
  showModalUnHide.value = true;
};
</script>
<template>
  <q-card flat bordered>
    <q-card-section>
      <filterForm />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-table
        :rows="tableRows"
        :columns="columns"
        :loading="graphTrucks.loading"
        :rows-per-page-options="[10, 20, 50, 100]"
        row-key="id"
        bordered
        flat
      >
        <template v-slot:body-cell="props">
          <q-td :props="props" :class="props.row.is_archived === 1 ? 'text-warning' : ''">
            {{ props.value }}
          </q-td>
        </template>

        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              v-if="props.row.is_archived === 0"
              icon="archive"
              color="primary"
              flat
              round
              @click="openArchiveModal(props.row)"
            />
            <q-btn
              v-else
              icon="visibility"
              color="warning"
              flat
              round
              @click="openUnArchiveModal(props.row)"
            />
          </q-td>
        </template>

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </q-card-section>

    <truckHideModal v-model="showModalHide" :row="selectedRow" />
    <truckUnHideModal v-model="showModalUnHide" :row="selectedRow" />
  </q-card>
</template>
