<script lang="ts" setup>
import { ref } from 'vue';
import { useDialogPluginComponent } from 'quasar';
// import { useShipmentStore } from 'src/stores/ShipmentStore';
import transitDetailsForm from 'src/components/stepper/TransitDetails.vue';
import shipAdditionalForm from 'src/components/stepper/ShipAdditionalDetails.vue';
import expensesInformationForm from 'src/components/stepper/ExpensesInfo.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
// const shipmentStore = useShipmentStore();
const step = ref(1);
const loading = ref(false);

const nextStep = () => {
  if (step.value === 1) {
    if (!transitFormRef.value) {
      console.error('transitFormRef is undefined');
      return;
    }

    step.value++;
    return;
  } else if (step.value === 2) {
    if (!shipAddForm.value) {
      console.error('shipAddForm is undefined');
      return;
    }

    step.value++;
    return;
  }
};

const transitFormRef = ref<InstanceType<typeof transitDetailsForm> | null>(null);
const shipAddForm = ref<InstanceType<typeof shipAdditionalForm> | null>(null);
const shipFinanceFormRef = ref<InstanceType<typeof expensesInformationForm> | null>(null);
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

      <!-- <q-separator inset /> -->

      <div class="q-px-md">
        <q-stepper v-model="step" ref="stepper" color="primary" animated dense flat>
          <q-step :name="1" title="Shipping Information" icon="settings" :done="step > 1">
            <q-form @submit.prevent="nextStep">
              <transitDetailsForm ref="transitFormRef" />
            </q-form>
          </q-step>

          <q-step :name="2" title="Shipping Details" icon="sym_o_unknown_document" :done="step > 2">
            <q-form @submit.prevent="nextStep">
              <shipAdditionalForm ref="shipAddForm" />
            </q-form>
          </q-step>

          <q-step
            :name="3"
            title=" Financial Report"
            icon="sym_o_bar_chart_4_bars"
            :done="step > 3"
          >
            <q-form @submit.prevent="nextStep">
              <expensesInformationForm ref="shipFinanceFormRef" />
            </q-form>
          </q-step>

          <!-- - - - - - - - - - - BUTTON - - - - - - - - - - -->
          <template v-slot:navigation v-if="step < 3">
            <q-stepper-navigation>
              <q-btn
                @click="nextStep"
                color="primary"
                :label="step === 4 ? 'Finish' : 'Continue'"
                :loading="loading"
              />
              <!-- <q-btn
                v-if="step > 1"
                flat
                color="primary"
                @click="prevStep"
                label="Back"
                class="q-ml-sm"
              /> -->
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
