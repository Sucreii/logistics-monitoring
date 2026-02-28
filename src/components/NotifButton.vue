<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

interface Dummy {
  title: string;
  content: string;
  date: string;
}

const props = defineProps<{
  notifications: Dummy[];
  loading: boolean;
}>();

const router = useRouter();
const itemsToShow = ref(4);
const handleSeeAll = async () => {
  await router.push({ name: 'home.notifications' });
};

const visibleNotifications = computed(() => props.notifications?.slice(0, itemsToShow.value) || []);
</script>

<template>
  <q-menu fit class="notification-menu">
    <div v-if="loading" class="q-pa-md">
      <div class="q-gutter-md row">
        <q-spinner color="primary" size="3em" />

        <q-spinner color="primary" size="3em" :thickness="2" />

        <q-spinner color="primary" size="3em" :thickness="10" />
      </div>
    </div>
    <q-card v-else class="notification-card">
      <q-card-section class="row items-center justify-between">
        <div class="h6 text-bold">Notifications</div>
      </q-card-section>
      <q-separator />
      <q-card-section
        horizontal
        class="notification-card-body"
        v-for="(notif, index) in visibleNotifications"
        :key="index"
      >
        <q-card-section horizontal>
          <q-card-section>
            <div class="text-bold text-caption">{{ notif.title }}</div>
            <div class="text-caption text-grey-8">{{ notif.content }}</div>
          </q-card-section>
        </q-card-section>
        <q-space />
      </q-card-section>

      <q-separator />

      <q-card-section class="flex flex-center q-pa-xs">
        <q-btn dense flat text no-caps color="primary" label="See all" @click="handleSeeAll()" />
      </q-card-section>
    </q-card>
  </q-menu>
</template>

<style lang="scss" scoped>
.notification-menu {
  .notification-card {
    .notification-card-body {
      border-bottom: 1px grey solid;
      margin-bottom: 1px;
    }
  }
}
</style>
