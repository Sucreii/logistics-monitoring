<script lang="ts" setup>
import truckProfileTable from '../layouts/trucks/truckTable.vue';
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-px-md text-caption">
          A unified view of driver profiles with real-time controls for dispatch management, access
          permissions, and truck status.
        </div>

        <div class="row q-pa-md q-gutter-y-md">
          <div class="col-12">
            <truckProfileTable />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
