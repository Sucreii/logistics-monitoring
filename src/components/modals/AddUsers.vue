<script lang="ts" setup>
import { ref } from 'vue';
import { QForm, useDialogPluginComponent, useQuasar, Loading, QSpinnerIos } from 'quasar';
import { useCreateUserStore } from 'src/stores/UserStore';
import { usersForm } from 'src/stores/AllPostReactive';
import { getAllUsers } from 'src/stores/ShipmentStore';
import usersAddForm from 'src/components/stepper/UsersAdd.vue';
import userInfoDisplay from 'src/components/stepper/UserInfoDisplay.vue';

const { dialogRef, onDialogHide } = useDialogPluginComponent();
const $q = useQuasar();
const usersStore = useCreateUserStore();
const graphUsers = getAllUsers();
const step = ref(1);
const loading = ref(false);
const form = usersForm;
const FINAL_STEP = 2;
const newUsersAddForm = ref<InstanceType<typeof QForm> | null>(null);
const shipFinanceFormRef = ref<InstanceType<typeof QForm> | null>(null);

const nextStep = async () => {
  if (step.value === 1) {
    const isValid = await newUsersAddForm.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  } else if (step.value === 2) {
    const isValid = await shipFinanceFormRef.value?.validate();

    if (!isValid) {
      $q.notify({ type: 'warning', position: 'top', message: 'Please complete all fields.' });
      return;
    }

    step.value++;
  }
};

const submitUser = async () => {
  // console.log('User Store: ', Object.keys(usersStore));

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Creating New user... please wait.',
    backgroundColor: 'primary',
  });

  try {
    Loading.hide();
    if (form.value.role_id === null) {
      throw new Error('Role is required');
    }
    const payload = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      username: form.value.username,
      password: form.value.password,
      role_id: form.value.role_id,
    };

    const result = await usersStore.createUser(payload);
    console.log('Create User result: ', result);

    $q.notify({
      type: 'positive',
      position: 'top',
      message: 'New User has been added.successfully',
      timeout: 3000,
    });
  } catch (err) {
    console.error('Error adding new User: ', err);
  } finally {
    await graphUsers.fetchUsers();

    Loading.hide();
    onDialogHide();
    Object.assign(form.value, {
      first_name: '',
      last_name: '',
      username: '',
      password: '',
      role_id: null,
    });
  }
};
</script>

<template>
  <q-dialog ref="dialogRef" persistent>
    <q-card class="create-shipment-card">
      <q-card-section class="row items-center">
        <div class="text-weight-bold text-h6 text-primary q-px-md">
          Create New User <q-icon class="text-weight-bold" name="add_shopping_cart" />
        </div>
        <q-space />
        <q-btn icon="close" color="primary" flat round dense @click="onDialogHide()" />
      </q-card-section>

      <div class="q-px-md">
        <q-stepper v-model="step" ref="stepper" color="primary" animated dense flat>
          <q-step :name="1" title="Add User Info" icon="sym_o_unknown_document" :done="step > 1">
            <q-form class="flex" ref="newUsersAddForm" @submit.prevent="nextStep">
              <usersAddForm />
            </q-form>
          </q-step>

          <q-step
            :name="2"
            :done="step > 2"
            title=" User Information"
            icon="sym_o_bar_chart_4_bars"
          >
            <q-form ref="shipFinanceFormRef" @submit.prevent="nextStep">
              <userInfoDisplay />
            </q-form>
          </q-step>

          <!-- - - - - - - - - - - BUTTON - - - - - - - - - - -->
          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn
                v-if="step === FINAL_STEP"
                @click="submitUser"
                :loading="usersStore.loading"
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
