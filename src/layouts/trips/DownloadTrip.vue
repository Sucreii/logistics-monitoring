<script lang="ts" setup>
import { ref } from 'vue';
import { useDownloadStore } from 'src/stores/DownloadStore';
import { exportFile, useQuasar } from 'quasar';

const $q = useQuasar();

const downloadStore = useDownloadStore();
const showDownloadTripModal = ref(false);

const yearInput = ref('');

const openDownloadModal = () => {
  showDownloadTripModal.value = true;
};

const closeDialog = () => {
  showDownloadTripModal.value = false;
};

const handleDownload = async () => {
  if (!yearInput.value) {
    $q.notify({
      message: 'Please fill in all fields before downloading.',
      color: 'warning',
    });
    return;
  }

  try {
    const csvData = await downloadStore.fetchCSVFileTrip(yearInput.value);

    const fileName = `Trip_Report_${yearInput.value}.csv`;

    const status = exportFile(fileName, csvData, 'text/csv');

    if (status === true) {
      $q.notify({
        message: 'Download started!',
        color: 'positive',
        icon: 'download',
      });
      closeDialog();
    } else {
      $q.notify({
        message: 'Download was blocked by the browser.',
        color: 'negative',
      });
    }
  } catch (error) {
    console.log('Download error: ', error);
    $q.notify({
      message: 'Error generating CSV file.',
      color: 'negative',
    });
  }
};
</script>

<template>
  <div class="row justify-between items-center filter-form">
    <div class="row">
      <q-btn
        label="DOWNLOAD"
        class="q-px-sm bg-primary"
        flat
        dense
        color="white"
        @click="openDownloadModal"
      />
    </div>
  </div>

  <q-dialog v-model="showDownloadTripModal">
    <q-card style="min-width: 450px" class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Download Trip Report</div>
      </q-card-section>

      <q-form @submit="handleDownload">
        <q-card-section class="q-gutter-y-md">
          <q-input
            class="rounded-input q-mr-sm"
            v-model="yearInput"
            placeholder="Input Year (e.g. 2024)"
            dense
            outlined
            type="text"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-mt-md">
          <q-btn flat label="Cancel" color="grey-7" @click="closeDialog" v-close-popup />
          <q-btn label="Confirm Download" color="primary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
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
