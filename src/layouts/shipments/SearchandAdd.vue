<script lang="ts" setup>
import { ref } from 'vue';
import { Loading, QSpinnerIos } from 'quasar';
// import { useDocumentDialog } from 'src/utils/composables/dialog';
import { searchShipmentsItem } from 'src/stores/ShipmentStore';

const searchValue = ref('');
const searchShipStore = searchShipmentsItem();
// const { showCreatePortStoresDialog } = useDocumentDialog();
// const openDialog = () => {
//   showCreatePortStoresDialog();
// };

const handlSearchButton = async () => {
  if (!searchValue.value?.trim()) return;
  Loading.show({
    spinner: QSpinnerIos,
    message: 'Creating New Shipment... please wait.',
    backgroundColor: 'primary',
  });

  try {
    await searchShipStore.searchForShipments(searchValue.value);
  } catch (err) {
    console.error('Search function encountered an error: ', err);
    throw err;
  } finally {
    Loading.hide();
  }
};

const handleClear = () => {
  searchValue.value = '';
  searchShipStore.searchResults = [];
  searchShipStore.totalCount = 0;
};
</script>

<template>
  <div class="row justify-between items-center filter-form">
    <div class="row">
      <q-input
        @keyup.enter="handlSearchButton"
        @clear="handleClear"
        class="rounded-input q-mr-sm"
        v-model="searchValue"
        placeholder="Search"
        dense
        outlined
        clearable
      />
      <q-btn
        @click="handlSearchButton"
        :loading="searchShipStore.loading"
        icon="search"
        class="q-px-sm bg-primary"
        color="white"
        flat
        dense
      />
    </div>

    <div class="row">
      <!-- <q-btn
        @click="openDialog"
        icon-right="add_box"
        color="white"
        class="q-pa-sm bg-primary"
        label="Add New Port"
        no-caps
        flat
        dense
        push
      /> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-form {
  .q-field--outlined .q-field__control {
    padding: 0 12px;
    border-radius: 15px !important;
    border-width: 3px !important;
  }
}
</style>
