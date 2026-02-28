<script lang="ts" setup>
import { ref } from 'vue';
import { QForm, useDialogPluginComponent, useQuasar, Loading, QSpinnerIos } from 'quasar';
import { useStorablesInfo } from 'src/stores/ShipmentStore';
import { storablesForm } from 'src/stores/AllPostReactive';
import portStoreAddForm from 'src/components/stepper/PortStoreAdd.vue';
import portStoreInfoDisplay from 'src/components/stepper/PortStoreInfoDisplay.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const $q = useQuasar();
const usePortsStorables = useStorablesInfo();
const step = ref(1);
const loading = ref(false);
const FINAL_STEP = 2;
const newPortAddForm = ref<InstanceType<typeof QForm> | null>(null);
const portDisplayFormRef = ref<InstanceType<typeof QForm> | null>(null);

const nextStep = async () => {
  if (step.value === 1) {
    const isValid = await newPortAddForm.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  } else if (step.value === 2) {
    const isValid = await portDisplayFormRef.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  }
};

const submitPortStore = async () => {
  // console.log('Port Store: ', Object.keys(usePortsStorables));

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Creating New Port Store... please wait.',
    backgroundColor: 'primary',
  });

  try {
    await usePortsStorables.submitNewPortStore();

    $q.notify({
      type: 'positive',
      position: 'top',
      message: 'New Port Store has been added.successfully',
      timeout: 3000,
    });
  } catch (err) {
    console.error('Error adding new Truck Profile: ', err);
  } finally {
    Loading.hide();
    onDialogHide();
    storablesForm.value = {
      id: '',
      type: '',
      description: '',
    };
  }
};
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="create-shipment-card">
      <q-card-section class="row items-center">
        <div class="text-weight-bold text-h6 text-primary q-px-md">
          Create New Port Stores <q-icon class="text-weight-bold" name="sym_o_contact_emergency" />
        </div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense @click="onDialogHide()" />
      </q-card-section>

      <div class="q-px-md">
        <q-stepper v-model="step" ref="stepper" color="primary" animated dense flat>
          <q-step :name="1" title="Add New Port" icon="sym_o_unknown_document" :done="step > 1">
            <q-form class="flex" ref="newPortAddForm" @submit.prevent="nextStep">
              <portStoreAddForm />
            </q-form>
          </q-step>

          <q-step :name="2" :done="step > 2" title="Port Information" icon="sym_o_bar_chart_4_bars">
            <q-form ref="portDisplayFormRef" @submit.prevent="nextStep">
              <portStoreInfoDisplay />
            </q-form>
          </q-step>

          <!-- - - - - - - - - - - BUTTON - - - - - - - - - - -->
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === FINAL_STEP"
                @click="submitPortStore"
                :loading="usePortsStorables.loading"
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
