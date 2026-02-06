<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDocumentDialog } from 'src/utils/composables/dialog';

const route = useRoute();
const { showDocumentDialog, showCreateShipmentDialog } = useDocumentDialog();

const openDialog = () => {
  if (route.name === 'home.shipments') {
    showDocumentDialog();
  } else {
    showCreateShipmentDialog();
  }
};

const btnVisibility = computed(
  () => route.name === 'home.shipments' || route.name === 'home.trips',
);
</script>

<template>
  <div>
    <q-btn
      v-if="btnVisibility"
      class="q-pa-sm bg-primary"
      color="white"
      :label="route.name === 'home.shipments' ? 'Create Shipment' : 'Add Transit'"
      :icon-right="route.name === 'home.shipments' ? 'add_shopping_cart' : 'local_shipping'"
      flat
      dense
      no-caps
      push
      @click="openDialog"
    />
  </div>
</template>

<style lang="scss" scoped></style>
