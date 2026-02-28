<script lang="ts" setup>
import notificationTable from '../layouts/notifications/NotificationTable.vue';
</script>
<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-px-md text-caption"></div>

        <div class="row q-pa-md q-gutter-y-md">
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <notificationTable />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
