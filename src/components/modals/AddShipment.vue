<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useQuasar, QForm, useDialogPluginComponent, Loading, QSpinnerIos } from 'quasar';
import { useShipmentInfo, getAllShipment } from 'src/stores/ShipmentStore';
import { shipmentForm2 } from 'src/stores/AllPostReactive';
import { useAuthStore } from 'src/stores/LoginAuth';
import shipAdditionalForm from 'src/components/stepper/ShipAdditionalDetails.vue';
import expensesInformationForm from 'src/components/stepper/ExpensesInfo.vue';
import finalAllDetails from 'src/components/stepper/ShipInfoDisplay.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const step = ref(1);
const loading = ref(false);
const $q = useQuasar();
const authStore = useAuthStore();
const shipmentStore = useShipmentInfo();
const graphShipmentStore = getAllShipment();
const FINAL_STEP = 3;
const shipAddForm = ref<InstanceType<typeof QForm> | null>(null);
const shipFinanceFormRef = ref<InstanceType<typeof QForm> | null>(null);
const shipDisplayInfoFormRef = ref<InstanceType<typeof QForm> | null>(null);
const showFinanceStep = computed(() => {
  const roleId = authStore.roleLabel;

  return roleId === 'Super Admin';
});

const nextStep = async () => {
  if (step.value === 1) {
    const isValid = await shipAddForm.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }
    if (showFinanceStep.value) {
      step.value++;
    } else {
      step.value = 3;
    }
  } else if (step.value === 2) {
    const isValid = await shipFinanceFormRef.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  } else if (step.value === 3) {
    const isValid = await shipDisplayInfoFormRef.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  }
};

const submitAll = async () => {
  console.log('Store Shipment: ', Object.keys(shipmentStore));
  Loading.show({
    spinner: QSpinnerIos,
    message: 'Creating New Shipment... please wait.',
    backgroundColor: 'primary',
  });

  try {
    const res = await shipmentStore.submitShipment();
    if (res.error) {
      $q.notify({
        type: 'negative',
        position: 'top',
        message: 'Error creating Shipment',
        timeout: 3000,
      });
    }

    if (res.id) {
      $q.notify({
        type: 'positive',
        position: 'top',
        message: 'Successfully created Shipment',
        timeout: 3000,
      });
    }
  } catch (err) {
    console.error('Error adding new Shipment: ', err);
    $q.notify({
      type: 'negative',
      position: 'top',
      message: 'Error creating shipment',
      timeout: 3000,
    });
  } finally {
    Loading.hide();
    onDialogHide();
    Object.assign(shipmentForm2, {
      blno: '',
      selectivity: '',
      contract_no: '',
      warehouse_id: '',
      entry_no: '',
      reference: '',
      registry_no: '',
      port_id: '',
      shipping_line: '',
      volumex: null,
      volumey: null,
      estimated_time_arrival: '',
      customer: {
        id: '',
        username: '',
      },
      issuer: {
        id: '',
        username: '',
      },
      containers: [
        {
          id: '',
          type: 'amount',
          description: 0,
        },
      ],
      financeSummary: [
        {
          title: 'BILLING',
          type: 'amount',
          value: 0,
        },
        {
          title: 'COST',
          type: 'amount',
          value: 0,
        },
      ],
    });

    await graphShipmentStore.fetchShipments();
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

      <div class="q-px-md">
        <q-stepper v-model="step" ref="stepper" color="primary" animated dense flat>
          <q-step :name="1" :done="step > 1" title="Shipping Details" icon="sym_o_unknown_document">
            <q-form class="flex" ref="shipAddForm" @submit.prevent="nextStep">
              <shipAdditionalForm />
            </q-form>
          </q-step>

          <q-step
            :name="2"
            :done="step > 2"
            title="Expenses Information"
            icon="sym_o_bar_chart_4_bars"
          >
            <q-form ref="shipFinanceFormRef" @submit.prevent="nextStep">
              <expensesInformationForm />
            </q-form>
          </q-step>

          <q-step
            :name="3"
            :done="step > 3"
            title="Final Details"
            icon="sym_o_published_with_changes"
          >
            <q-form ref="shipDisplayInfoFormRef" @submit.prevent="nextStep">
              <finalAllDetails />
            </q-form>
          </q-step>

          <!-- - - - - - - - - - - BUTTON - - - - - - - - - - -->
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === FINAL_STEP"
                @click="submitAll"
                :loading="shipmentStore.loading"
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
  width: 700px;
  max-width: 75vw;
  border-radius: 5px;

  .scroll-area {
    height: 600px;
    max-width: 100%;
  }
}
</style>
