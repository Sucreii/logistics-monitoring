<script lang="ts" setup>
import shipsTable from '../layouts/shipments/ShipsTable.vue';
import downloadShipment from '../layouts/shipments/DownloadShipment.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-px-md text-caption">
          Comprehensive overview of logistics status with real-time tools to manage, track, and
          update shipment outcomes.
        </div>

        <div class="row q-pa-md q-gutter-y-md">
          <shipsTable />
          <div class="row q-pt-sm q-gutter-y-md">
            <downloadShipment />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
