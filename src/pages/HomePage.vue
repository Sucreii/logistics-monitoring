<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { useAuthStore } from 'src/stores/LoginAuth';
import { getDashStats, getAllShipment } from 'src/stores/ShipmentStore';
import quickLinks from '../layouts/dashboard/QuickLinks.vue';
import recentOrders from '../layouts/dashboard/RecentOrders.vue';
import recentOnline from '../layouts/dashboard/RecentOnline.vue';

onMounted(async () => {
  await graphShipment.fetchShipments();
  await dashboard.fetchStats();

  console.log('Shipments fetched: ', graphShipment.shipments);
  console.log('Dashboard: ', dashboard.stats);
});

const authStore = useAuthStore();
const dashboard = getDashStats();
const graphShipment = getAllShipment();
const statisticsCard = computed(() => {
  if (!dashboard.stats) return [];

  return [
    {
      title: 'Total Pending',
      caption: 'The item or request has been received but is not yet processed or dispatched.',
      value: dashboard.stats.TotalPending,
      icon: 'sym_o_deployed_code_history',
    },
    {
      title: 'Total Transit',
      caption:
        'The item or request is on its way to the destination and is actively being transported.',
      value: dashboard.stats.TotalTransit,
      icon: 'sym_o_delivery_truck_speed',
    },
    {
      title: 'Total Delivered',
      caption:
        'The item or request has reached its final destination and has been successfully received.',
      value: dashboard.stats.TotalDelivered,
      icon: 'sym_o_inventory',
    },
    {
      title: 'Total Notification',
      caption: 'The item or request has been received but is not yet processed or dispatched.',
      value: '0',
      icon: 'sym_o_chat',
    },
  ];
});
</script>

<style lang="scss" scoped>
.dashboard-page {
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  .stats-card {
    display: flex;
    flex-direction: column;
  }
}
</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-px-md text-caption">
          Overview of delivered, in-transit, and pending logistics status.
        </div>
        <div class="row q-pa-md dashboard-page q-col-gutter-md">
          <div class="col-3" v-for="items in statisticsCard" :key="items.title">
            <q-card class="stats-card" flat bordered>
              <q-card-section>
                <div class="row">
                  <div class="col-6">
                    <div class="text-overline text-weight-bolder text-primary">
                      {{ items.title }}
                    </div>
                    <div class="text-h4 text-weight-bolder text-primary">{{ items.value }}</div>
                  </div>
                  <div class="col-6 text-right">
                    <q-icon :name="items.icon" color="primary" size="50px" />
                  </div>
                </div>
              </q-card-section>

              <q-card-section>
                <div class="text-caption text-mini-caption">{{ items.caption }}</div>
              </q-card-section>
            </q-card>
          </div>

          <div class="column col-12" v-if="authStore.roleLabel !== 'Viewer'">
            <quickLinks />
          </div>

          <div class="column col-12" v-if="authStore.roleLabel === 'Viewer'">
            <recentOnline />
          </div>

          <div class="col-12">
            <recentOrders />
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
