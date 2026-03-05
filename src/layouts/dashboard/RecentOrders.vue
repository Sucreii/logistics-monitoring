<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { getAllShipment } from 'src/stores/ShipmentStore';
import { tableShipmentConstant } from 'src/utils/index';
import type { QTableColumn } from 'quasar';

onMounted(async () => {
  await graphShipment.fetchShipments();
});

const graphShipment = getAllShipment();
const tableRows = computed(() => {
  return graphShipment.shipments.length > 0 ? graphShipment.shipments : tableShipmentConstant;
});

const columns: QTableColumn[] = [
  { name: 'selectivity', label: 'Selectivity', field: 'selectivity', align: 'left' },
  { name: 'blno', label: 'B/L No', field: 'blno', align: 'left' },
  { name: 'contract_no', label: 'Contract No', field: 'contract_no', align: 'left' },
  { name: 'entry_no', label: 'Entry No', field: 'entry_no', align: 'left' },
  { name: 'reference', label: 'Reference', field: 'reference', align: 'left' },
  { name: 'registry_no', label: 'Registry No', field: 'registry_no', align: 'center' },
  { name: 'status', label: 'Status', field: 'status', align: 'center' },
  { name: 'volumex', label: 'Volume', field: 'volumex', align: 'center' },
  { name: 'volumey', label: 'Size', field: 'volumey', align: 'center' },
  {
    name: 'customer',
    label: 'Consignee',
    field: (row) => row.customer?.username || '',
    align: 'left',
  },
];
</script>

<style lang="scss" scoped></style>

<template>
  <q-card flat bordered>
    <q-card-section>
      <filterForm />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="text-overline text-weight-bolder text-primary">RECENT SHIPMENT</div>
      <q-table
        :rows="tableRows.slice(0, 5)"
        :columns="columns"
        :loading="graphShipment.loading"
        :rows-per-page-options="[10, 20, 50, 100]"
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

        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
      </q-table>
    </q-card-section>
  </q-card>
</template>
