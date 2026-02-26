<script lang="ts" setup>
import { onMounted } from 'vue';
import { getAllTrips } from 'src/stores/ShipmentStore';
import filterForm from '../layouts/trips/FilterForm.vue';
import tripsTable from 'src/layouts/trips/TripsTable.vue';

onMounted(async () => {
  await graphShipment.fetchTrips();
  console.log('Trips fetched: ', graphShipment.trips);
});

const graphShipment = getAllTrips();
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
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <filterForm />
              </q-card-section>

              <tripsTable />
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
