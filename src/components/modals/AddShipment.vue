<script lang="ts" setup>
import { ref } from 'vue';
import { QForm, useDialogPluginComponent } from 'quasar';
import { useShipmentInfo } from 'src/stores/ShipmentStore';
// import { useQuasar } from 'quasar';
import shipAdditionalForm from 'src/components/stepper/ShipAdditionalDetails.vue';
import expensesInformationForm from 'src/components/stepper/ExpensesInfo.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const step = ref(1);
const loading = ref(false);
// const $q = useQuasar();
const shipmentStore = useShipmentInfo();
const FINAL_STEP = 2;
const shipAddForm = ref<InstanceType<typeof QForm> | null>(null);
const shipFinanceFormRef = ref<InstanceType<typeof QForm> | null>(null);
console.log('shipAddForm ref:', shipAddForm.value);

// const nextStep = async () => {
//   // if (step.value === 1) {
//   //   if (!shipFormRef.value) {
//   //     console.error('shipFormRef is undefined');
//   //     return;
//   //   }

//   //   step.value++;
//   //   return;
//   // } else
//   if (step.value === 1) {
//     const valid = await shipAddForm.value?.validate();
//   if (!valid) return;
//   step.value++;
//   } else if (step.value === 2) {
//     if (!shipFinanceFormRef.value || !shipFinanceFormRef.value.shipmentData) {
//       console.error('shipFinanceFormRef or formData is undefined.');
//       return;
//     }

//     console.log('shipFinanceFormRef.value.formData', shipFinanceFormRef.value.shipmentData);

//     try {
//       loading.value = true;
//       const response = await shipmentStore.createFinanceToApi(
//         shipFinanceFormRef.value.shipmentData,
//         String(shipFinanceFormRef.value.shipmentData?.shipmentId),
//       );

//       const allSuccess = Array.isArray(response) && response.every((res) => res?.status === 200);

//       if (allSuccess) {
//         console.log('success');
//       }
//     } catch (error) {
//       console.error('Error during Finance API call:', error);
//     } finally {
//       loading.value = false;
//     }
//   }
// };

// const shipFormRef = ref<InstanceType<typeof shipInformationForm> | null>(null);

const nextStep = async () => {
  if (step.value === 1) {
    console.log('shipAddForm', shipAddForm.value);
    const valid = await shipAddForm.value?.validate();

    try {
      console.log('I AM INSIDE');
    } catch (err) {
      console.error('Post API declined, try again.', err);
      if (!valid) {
        console.warn('❌ step 1 validation failed');
        return;
      }
    }
    step.value++;
  } else if (step.value === 2) {
    // if (!shipAddForm) {
    //   $q.notify({ type: 'warning', message: 'Please complete all fields.' });
    //   return;
    // }

    step.value++;
  }
};
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="create-shipment-card">
      <q-card-section class="row items-center">
        <div class="text-weight-bold text-h6 text-primary q-px-md">
          Create New Shipment <q-icon class="text-weight-bold" name="add_shopping_cart" />
        </div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense @click="onDialogHide()" />
      </q-card-section>

      <!-- <q-separator inset /> -->

      <div class="q-px-md">
        <q-stepper v-model="step" ref="stepper" color="primary" animated dense flat>
          <!-- <q-step :name="1" title="Shipping Information" icon="settings" :done="step > 1">
			<q-form @submit.prevent="nextStep">
			<shipInformationForm ref="shipFormRef" />
			</q-form>
		</q-step> -->

          <q-step :name="1" title="Shipping Details" icon="sym_o_unknown_document" :done="step > 1">
            <q-form ref="shipAddForm" @submit.prevent="nextStep">
              <shipAdditionalForm />
            </q-form>
          </q-step>

          <q-step
            :name="2"
            title=" Financial Report"
            icon="sym_o_bar_chart_4_bars"
            :done="step > 2"
          >
            <q-form ref="shipFinanceFormRef" @submit.prevent="nextStep">
              <expensesInformationForm />
            </q-form>
          </q-step>

          <!-- - - - - - - - - - - BUTTON - - - - - - - - - - -->
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === FINAL_STEP"
                color="primary"
                label="Submit"
                :loading="shipmentStore.loading"
                @click="shipmentStore.submitShipment"
              />
              <q-btn v-else :loading="loading" color="primary" label="Proceed" @click="nextStep" />
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
