<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDocumentDialog } from 'src/utils/composables/dialog';

const route = useRoute();
const { showDocumentDialog, showCreateShipmentDialog, showCreateNewUsersDialog } =
  useDocumentDialog();

const openDialog = () => {
  if (route.name === 'home.shipments') {
    showDocumentDialog();
  } else if (route.name === 'home.trips') {
    showCreateShipmentDialog();
  } else {
    showCreateNewUsersDialog();
  }
};

const btnVisibility = computed(
  () =>
    route.name === 'home.shipments' || route.name === 'home.trips' || route.name === 'home.users',
);

const btnLabel = computed(() => {
  if (route.name === 'home.shipments') return 'Create Shipment';
  if (route.name === 'home.trips') return 'Add Transit';
  if (route.name === 'home.users') return 'Add New User';
  return '';
});

const btnIcon = computed(() => {
  if (route.name === 'home.shipments') return 'add_shopping_cart';
  if (route.name === 'home.trips') return 'local_shipping';
  if (route.name === 'home.users') return 'person_add';
  return '';
});
</script>

<template>
  <div>
    <q-btn
      v-if="btnVisibility"
      class="q-pa-sm bg-primary"
      color="white"
      :label="btnLabel"
      :icon-right="btnIcon"
      flat
      dense
      no-caps
      push
      @click="openDialog"
    />
  </div>
</template>

<style lang="scss" scoped></style>
