<script lang="ts" setup>
import { ref } from 'vue';
import { useDocumentDialog } from 'src/utils/composables/dialog';

const test = ref('');
const { showCreatePortStoresDialog } = useDocumentDialog();
const openDialog = () => {
  showCreatePortStoresDialog();
};
</script>

<template>
  <div class="row justify-between items-center filter-form">
    <div class="row">
      <q-input class="rounded-input q-mr-sm" v-model="test" placeholder="Search" dense outlined />
      <q-btn icon="search" class="q-px-sm bg-primary" flat dense color="white" />
    </div>

    <div class="row">
      <q-btn
        @click="openDialog"
        icon-right="add_box"
        color="white"
        class="q-pa-sm bg-primary"
        label="Add New Port"
        no-caps
        flat
        dense
        push
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
