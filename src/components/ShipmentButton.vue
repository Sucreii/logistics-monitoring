<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDocumentDialog } from 'src/utils/composables/dialog';

const route = useRoute();
const {
  showDocumentDialog,
  showCreateShipmentDialog,
  showCreateNewUsersDialog,
  showCreateNewTrucksDialog,
} = useDocumentDialog();

const openDialog = () => {
  if (route.name === 'home.shipments') {
    showDocumentDialog();
  } else if (route.name === 'home.trips') {
    showCreateShipmentDialog();
  } else if (route.name === 'home.users') {
    showCreateNewUsersDialog();
  } else {
    showCreateNewTrucksDialog();
  }
};

const btnVisibility = computed(
  () =>
    route.name === 'home.shipments' ||
    route.name === 'home.trips' ||
    route.name === 'home.users' ||
    route.name === 'home.trucks',
);

const btnLabel = computed(() => {
  if (route.name === 'home.shipments') return 'Create Shipment';
  if (route.name === 'home.trips') return 'Add Transit';
  if (route.name === 'home.users') return 'Add New User';
  if (route.name === 'home.trucks') return 'Add Profile Driver';
  return '';
});

const btnIcon = computed(() => {
  if (route.name === 'home.shipments') return 'add_shopping_cart';
  if (route.name === 'home.trips') return 'local_shipping';
  if (route.name === 'home.users') return 'person_add';
  if (route.name === 'home.trucks') return 'sym_o_contact_emergency';
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
