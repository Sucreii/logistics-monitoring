<script setup lang="ts">
import { useQuasar, Loading, QSpinnerIos } from 'quasar';
import { hideTrucksProfile, getTruckStorables } from 'src/stores/ShipmentStore';
import type { Trucks } from 'src/utils/static/types';

const hideTruckProfile = hideTrucksProfile();
const graphTrucks = getTruckStorables();
const $q = useQuasar();
const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
  emit('update:modelValue', false);
};

const { modelValue, row } = defineProps<{
  modelValue: boolean;
  row: Trucks | null;
}>();

console.log('Row object:', row);
console.log('Row ID:', row?.id);

const submitArchive = async () => {
  if (!row?.id) return;
  const id = String(row.id);
  console.log('ID to Archive: ', row?.id);

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Authenticating... please wait.',
    backgroundColor: 'primary',
  });
  try {
    await hideTruckProfile.hideTrucking(id);

    $q.notify({
      type: 'positive',
      position: 'top',
      message: 'Truck Profile archived successfully',
      timeout: 3000,
    });
  } catch (err) {
    console.log('Error archiving truck profile: ', err);
    throw err;
  } finally {
    Loading.hide();
    closeDialog();
    await graphTrucks.fetchTruckStores();
  }
};
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card style="min-width: 400px">
      <q-form @submit.prevent="submitArchive">
        <q-card-section>
          <div class="text-h6 text-weight-bolder text-primary">Archive this Profile?</div>
        </q-card-section>

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input :model-value="row?.id" label="Truck Name" outlined readonly />
            </div>
            <div class="col-6">
              <q-input :model-value="row?.operator" label="Operator Name" outlined readonly />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline style="color: green" label="Hide Profile" @click="submitArchive" />
          <q-btn outline style="color: red" label="Close" @click="closeDialog" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
