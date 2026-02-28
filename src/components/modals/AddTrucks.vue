<script lang="ts" setup>
import { ref } from 'vue';
import { QForm, useDialogPluginComponent, useQuasar, Loading, QSpinnerIos } from 'quasar';
import { useTrucksInfo, getTruckStorables } from 'src/stores/ShipmentStore';
import { truckForm } from 'src/stores/AllPostReactive';
import truckAddForm from 'src/components/stepper/TruckProfileAdd.vue';
import truckInfoDisplay from 'src/components/stepper/TruckInfoDisplay.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const $q = useQuasar();
const useTrucks = useTrucksInfo();
const graphTrucks = getTruckStorables();
const step = ref(1);
const loading = ref(false);
const FINAL_STEP = 2;
const newTrucksAddForm = ref<InstanceType<typeof QForm> | null>(null);
const truckDisplayFormRef = ref<InstanceType<typeof QForm> | null>(null);

const nextStep = async () => {
  if (step.value === 1) {
    const isValid = await newTrucksAddForm.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  } else if (step.value === 2) {
    const isValid = await truckDisplayFormRef.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  }
};

const submitUser = async () => {
  // console.log('Trucks Store: ', Object.keys(useTrucks));

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Creating New Truck Profile... please wait.',
    backgroundColor: 'primary',
  });

  try {
    await useTrucks.submitTrucking();

    $q.notify({
      type: 'positive',
      position: 'top',
      message: 'New Truck Profile has been added successfully',
      timeout: 3000,
    });
  } catch (err) {
    console.error('Error adding new Truck Profile: ', err);
  } finally {
    Loading.hide();
    onDialogHide();
    truckForm.value = {
      id: '',
      operator: '',
      date_added: '',
    };

    await graphTrucks.fetchTruckStores();
  }
};
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="create-shipment-card">
      <q-card-section class="row items-center">
        <div class="text-weight-bold text-h6 text-primary q-px-md">
          Create New Truck <q-icon class="text-weight-bold" name="sym_o_contact_emergency" />
        </div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense @click="onDialogHide()" />
      </q-card-section>

      <div class="q-px-md">
        <q-stepper v-model="step" ref="stepper" color="primary" animated dense flat>
          <q-step
            :name="1"
            title="Add Truck Profile"
            icon="sym_o_unknown_document"
            :done="step > 1"
          >
            <q-form class="flex" ref="newTrucksAddForm" @submit.prevent="nextStep">
              <truckAddForm />
            </q-form>
          </q-step>

          <q-step
            :name="2"
            :done="step > 2"
            title="Truck Information"
            icon="sym_o_bar_chart_4_bars"
          >
            <q-form ref="truckDisplayFormRef" @submit.prevent="nextStep">
              <truckInfoDisplay />
            </q-form>
          </q-step>

          <!-- - - - - - - - - - - BUTTON - - - - - - - - - - -->
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === FINAL_STEP"
                @click="submitUser"
                :loading="useTrucks.loading"
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
