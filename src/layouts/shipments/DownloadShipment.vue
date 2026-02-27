<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { getAllUsers } from 'src/stores/ShipmentStore';
import { useDownloadStore } from 'src/stores/DownloadStore';
import { exportFile, useQuasar } from 'quasar';

const $q = useQuasar();

const shipmentStore = getAllUsers();
const downloadStore = useDownloadStore();
const showDownloadShipmentModal = ref(false);

const dateTo = ref('');
const dateFrom = ref('');
const consignee = ref(null);

onMounted(async () => {
  await shipmentStore.fetchUsers();
});

const userSelectOptions = computed(() => {
  return shipmentStore.user.map((user) => ({
    label: user.username,
    value: user.id,
  }));
});

const openDownloadModal = () => {
  showDownloadShipmentModal.value = true;
};

const closeDialog = () => {
  showDownloadShipmentModal.value = false;
};

const handleDownload = async () => {
  if (!dateTo.value || !dateFrom.value || !consignee.value) {
    $q.notify({
      message: 'Please fill in all fields before downloading.',
      color: 'warning',
    });
    return;
  }

  try {
    const csvData = await downloadStore.fetchCSVFileShipment(
      dateFrom.value,
      dateTo.value,
      consignee.value,
    );

    const fileName = `Shipment_Report_${dateFrom.value}_to_${dateTo.value}.csv`;

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

  <q-dialog v-model="showDownloadShipmentModal">
    <q-card style="min-width: 450px" class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Download Shipment Report</div>
      </q-card-section>

      <q-form @submit="handleDownload">
        <q-card-section class="q-gutter-y-md">
          <q-input v-model="dateFrom" label="Date From" outlined dense readonly>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateFrom" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input v-model="dateTo" label="Date To" outlined dense readonly>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="dateTo" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-select
            v-model="consignee"
            :options="userSelectOptions"
            label="Select Consignee"
            emit-value
            map-options
            dense
            outlined
            clearable
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
