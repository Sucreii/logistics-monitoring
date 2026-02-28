<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar, QForm, useDialogPluginComponent, Loading, QSpinnerIos } from 'quasar';
import { useTransitInfo, getAllTrips } from 'src/stores/ShipmentStore';
import { tripsForm } from 'src/stores/AllPostReactive';
import transitDetailsForm from 'src/components/stepper/TransitDetails.vue';
import transitExpenses from 'src/components/stepper/TransitExpenses.vue';
import transitDisplay from 'src/components/stepper/TransitInfoDisplay.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const step = ref(1);
const loading = ref(false);
const $q = useQuasar();
const transitStore = useTransitInfo();
const graphTrips = getAllTrips();
const FINAL_STEP = 3;
const transitAddForm = ref<InstanceType<typeof QForm> | null>(null);
const transitFinanceFormRef = ref<InstanceType<typeof QForm> | null>(null);
const transitDisplayInfoFormRef = ref<InstanceType<typeof QForm> | null>(null);

const nextStep = async () => {
  if (step.value === 1) {
    const isValid = await transitAddForm.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  } else if (step.value === 2) {
    const isValid = await transitFinanceFormRef.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  } else if (step.value === 3) {
    const isValid = await transitDisplayInfoFormRef.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  }
};

const submitAll = async () => {
  // console.log('Store Transit trip: ', Object.keys(transitStore));

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Creating New Transit... please wait.',
    backgroundColor: 'primary',
  });

  try {
    await transitStore.createTrip();

    $q.notify({
      type: 'positive',
      position: 'top',
      message: 'New Transit Order has been added successfully',
      timeout: 3000,
    });
  } catch (err) {
    console.error('Error adding new Transit: ', err);
  } finally {
    Loading.hide();
    onDialogHide();
    Object.assign(tripsForm, {
      container_id: '',
      truck_id: '',
      port_id: '',
      commodity: '',
      warehouse_id: '',
      base_rate: 0,
      volumex: 0,
      volumey: 0,
      finances: [
        {
          title: '',
          type: 'amount',
          value: 0,
        },
      ],
    });

    await graphTrips.fetchTrips();
  }
};
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="create-shipment-card">
      <q-card-section class="row items-center">
        <div class="text-weight-bold text-h6 text-primary q-px-md">
          Create New Transit <q-icon class="text-weight-bold" name="local_shipping" />
        </div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense @click="onDialogHide()" />
      </q-card-section>

      <div class="q-px-md">
        <q-stepper v-model="step" ref="stepper" color="primary" animated dense flat>
          <q-step :name="1" :done="step > 1" title="Transit Information" icon="settings">
            <q-form class="flex" ref="transitAddForm" @submit.prevent="nextStep">
              <transitDetailsForm />
            </q-form>
          </q-step>

          <q-step :name="2" :done="step > 2" title="Transit Expenses" icon="sym_o_unknown_document">
            <q-form ref="transitFinanceFormRef" @submit.prevent="nextStep">
              <transitExpenses />
            </q-form>
          </q-step>

          <q-step :name="3" :done="step > 3" title="Final Details" icon="sym_o_bar_chart_4_bars">
            <q-form ref="transitDisplayInfoFormRef" @submit.prevent="nextStep">
              <transitDisplay />
            </q-form>
          </q-step>

          <!-- - - - - - - - - - - BUTTON - - - - - - - - - - -->
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === FINAL_STEP"
                @click="submitAll"
                :loading="transitStore.loading"
                color="primary"
                label="Submit"
              />
              <q-btn v-else @click="nextStep" :loading="loading" color="primary" label="Proceed" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </q-card>
  </q-dialog>
</template>

<style lang="scss" scoped>
.create-shipment-card {
  width: 750px;
  max-width: 80vw;
  border-radius: 24px;

  .scroll-area {
    height: 600px;
    max-width: 100%;
  }
}
</style>
