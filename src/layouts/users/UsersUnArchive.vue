<script setup lang="ts">
import { HTTP_API } from 'src/boot/axios';
import { watch } from 'vue';
import { useQuasar, Loading, QSpinnerIos } from 'quasar';
import { getAllUsers } from 'src/stores/ShipmentStore';
import { editedUsersForm } from 'src/stores/AllPostReactive';
import type { Users } from 'src/utils/static/types';

const graphUsers = getAllUsers();
const $q = useQuasar();
const emit = defineEmits(['update:modelValue', 'clear-row']);
const closeDialog = () => {
  emit('update:modelValue', false);
  emit('clear-row');
};

const props = defineProps<{
  modelValue: boolean;
  row: Users | null;
}>();

watch(
  () => props.row,
  (newVal) => {
    if (newVal) {
      editedUsersForm.value.role_id = newVal.role?.id || null;
      editedUsersForm.value.username = newVal.username || '';
      editedUsersForm.value.first_name = newVal.first_name || '';
      editedUsersForm.value.last_name = newVal.last_name || '';
    }
  },
  { immediate: true },
);

const submitEditedProfile = async () => {
  if (!props.row?.id) return;
  const id = props.row?.id;

  Loading.show({
    spinner: QSpinnerIos,
    message: 'Authenticating... please wait.',
    backgroundColor: 'primary',
  });
  try {
    const payload = editedUsersForm.value;
    const response = await HTTP_API().patch(`/auth/update/${id}`, payload);

    $q.notify({
      type: 'positive',
      position: 'top',
      message: response.data.message,
      timeout: 3000,
    });
  } catch (err) {
    console.error('Error archiving truck profile: ', err);
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
      <q-card-section>
        <div class="text-h6 text-weight-bolder text-primary">Edit User Details</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-input v-model.number="editedUsersForm.role_id" label="Role Level" outlined />
          </div>
          <div class="col-6">
            <q-input v-model="editedUsersForm.username" label="Username" outlined />
          </div>
          <div class="col-6">
            <q-input v-model="editedUsersForm.first_name" label="First Name" outlined />
          </div>
          <div class="col-6">
            <q-input v-model="editedUsersForm.last_name" label="Last Name" outlined />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          outline
          style="color: green"
          label="Submit Edited Profile"
          @click="submitEditedProfile"
        />
        <q-btn outline style="color: red" label="Close" @click="closeDialog" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
