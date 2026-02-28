<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useNotificationStore } from 'src/stores/NotificationStore';
import { useAuthStore } from 'src/stores/LoginAuth';
import type { QTableColumn } from 'quasar';

interface TableRow {
  id: number;
  date: string;
  title: string;
  details: string;
}

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const { notifications, loading } = storeToRefs(notificationStore);

const rows = ref<TableRow[]>([]);

const columns: QTableColumn[] = [
  { name: 'ID', label: '#', field: 'id', align: 'left' },
  { name: 'Date', label: 'Date', field: 'date', align: 'left' },
  { name: 'Title', label: 'Title', field: 'title', align: 'left' },
  { name: 'Details', label: 'Details', field: 'details', align: 'left' },
];

watch(
  notifications,
  (newNotifs) => {
    rows.value = newNotifs.map((notif, index) => ({
      id: index + 1,
      date: notif.date,
      title: notif.title,
      details: notif.content,
    }));
  },
  { immediate: true },
);

onMounted(async () => {
  await notificationStore.fetchNotifications(authStore.username?.username);
});
</script>
<template>
  <q-card-section class="q-pt-none">
    <q-table
      :rows="rows"
      :columns="columns"
      :loading="loading"
      row-key="id"
      bordered
      flat
      :pagination="{ rowsPerPage: 0 }"
      hide-pagination
    >
    </q-table>
  </q-card-section>
</template>
