<script lang="ts" setup>
import { ref } from 'vue';
import { Loading, QSpinnerIos } from 'quasar';
import { searchTripsItem } from 'src/stores/ShipmentStore';

const searchValue = ref('');
const searchTripStore = searchTripsItem();

const handlSearchButton = async () => {
  if (!searchValue.value?.trim()) return;
  Loading.show({
    spinner: QSpinnerIos,
    message: 'Creating New Shipment... please wait.',
    backgroundColor: 'primary',
  });

  try {
    await searchTripStore.searchForTrips(searchValue.value);

    console.log('I AM SEARCHED TRIPS: ', searchValue.value);
  } catch (err) {
    console.error('Search function encountered an error: ', err);
    throw err;
  } finally {
    Loading.hide();
  }
};

const handleClear = () => {
  searchValue.value = '';
  searchTripStore.searchResults = [];
  searchTripStore.totalCount = 0;
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
        :loading="searchTripStore.loading"
        icon="search"
        class="q-px-sm bg-primary"
        color="white"
        flat
        dense
      />
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
