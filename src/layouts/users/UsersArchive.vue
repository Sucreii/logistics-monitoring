<script setup lang="ts">
import { HTTP_API } from 'src/boot/axios';
import { useQuasar, Loading, QSpinnerIos } from 'quasar';
import { getAllUsers } from 'src/stores/ShipmentStore';
import type { Users } from 'src/utils/static/types';

const graphUsers = getAllUsers();
const $q = useQuasar();
const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
  emit('update:modelValue', false);
};

const { modelValue, row } = defineProps<{
  modelValue: boolean;
  row: Users | null;
}>();

console.log('Row object:', row);
console.log('Row ID:', row?.id);

const submitArchive = async () => {
  if (!row?.id) return;
  const id = row?.id;
  console.log('ID to Archive: ', row?.id);

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Authenticating... please wait.',
    backgroundColor: 'primary',
  });
  try {
    const response = await HTTP_API().patch(`/auth/archive/${id}`);

    console.log('ARCHIVE MESSAGE: ', response.data.message);
    $q.notify({
      type: 'positive',
      position: 'top',
      message: response.data.message,
      timeout: 3000,
    });
  } catch (err) {
    console.log('Error archiving user profile: ', err);
    throw err;
  } finally {
    Loading.hide();
    closeDialog();

    await graphUsers.fetchUsers();
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
              <q-input :model-value="row?.role?.title" label="Role Level" outlined readonly />
            </div>
            <div class="col-6">
              <q-input :model-value="row?.username" label="Username" outlined readonly />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline style="color: green" label="Delete Profile" @click="submitArchive" />
          <q-btn outline style="color: red" label="Close" @click="closeDialog" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
