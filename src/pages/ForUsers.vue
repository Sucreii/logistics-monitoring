<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { getAllUsers } from 'src/stores/ShipmentStore';
import { tableUsersConstants } from 'src/utils/index';
import { pagination } from 'src/stores/AllPostReactive';
import type { TableRequestProps } from 'src/utils/static/types';
import type { QTableColumn } from 'quasar';
import type { Users } from 'src/utils/static/types';
import archiveUsers from 'src/layouts/users/UsersArchive.vue';
import unArchiveUsers from 'src/layouts/users/UsersUnArchive.vue';

onMounted(async () => {
  await onRequest({ pagination: pagination.value });
  console.log('Users fetched: ', graphUsers.user);
});

const selectedRow = ref<Users | null>(null);
const showModalHide = ref(false);
const showModalUnHide = ref(false);
const graphUsers = getAllUsers();
const tableRows = computed(() => {
  return graphUsers.user.length > 0 ? graphUsers.user : tableUsersConstants;
});

const columns: QTableColumn[] = [
  { name: 'id', label: 'ID', field: 'id', align: 'left' },
  { name: 'role', label: 'Role', field: (row) => row.role?.title ?? '', align: 'left' },
  { name: 'username', label: 'Username', field: 'username', align: 'left' },
  { name: 'first_name', label: 'First Name', field: 'first_name', align: 'left' },
  // { name: 'middle_name', label: 'Middle Name', field: 'middle_name', align: 'left' },
  { name: 'last_name', label: 'Last Name', field: 'last_name', align: 'left' },
  { name: 'last_logged_in', label: 'Last logged In', field: 'last_logged_in', align: 'left' },
  { name: 'action', label: 'Action', field: 'action', align: 'center' },
];

watch(
  () => graphUsers.totalCount,
  (val) => {
    pagination.value.rowsNumber = val;
  },
);

const onRequest = async (props: TableRequestProps) => {
  const page = props.pagination.page || 1;
  const rowsPerPage = props.pagination.rowsPerPage || 10;
  const skip = (page - 1) * rowsPerPage;
  const take = rowsPerPage;

  await graphUsers.fetchUsers(skip, take);

  pagination.value.page = page;
  pagination.value.rowsPerPage = rowsPerPage;
};

const openArchiveModal = (row: Users) => {
  selectedRow.value = row;
  showModalHide.value = true;

  console.log('I AM OPEN ARCHIVE: ', selectedRow.value);
};

const openUnArchiveModal = (row: Users) => {
  selectedRow.value = row;
  showModalUnHide.value = true;
};
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page>
        <div class="q-px-md text-caption">
          A unified view of user profiles with real-time controls for management, permissions, and
          status.
        </div>

        <div class="row q-pa-md q-gutter-y-md">
          <div class="col-12">
            <q-card flat bordered>
              <q-card-section>
                <!-- <filterForm /> -->
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-table
                  v-model:pagination="pagination"
                  :rows="tableRows"
                  :columns="columns"
                  :loading="graphUsers.loading"
                  :rows-per-page-options="[10, 20, 50, 100]"
                  @request="onRequest"
                  row-key="id"
                  bordered
                  flat
                >
                  <template v-slot:body-cell="props">
                    <q-td :props="props">
                      {{ props.value }}
                    </q-td>
                  </template>

                  <template v-slot:body-cell-action="props">
                    <q-td :props="props">
                      <q-btn
                        icon="sym_o_delete_forever"
                        color="primary"
                        flat
                        round
                        @click="openArchiveModal(props.row)"
                      />
                      <q-btn
                        icon="sym_o_person_edit"
                        color="warning"
                        flat
                        round
                        @click="openUnArchiveModal(props.row)"
                      />
                    </q-td>
                  </template>

                  <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                  </template>
                </q-table>
              </q-card-section>

              <archiveUsers v-model="showModalHide" :row="selectedRow" />
              <unArchiveUsers v-model="showModalUnHide" :row="selectedRow" @clear-row="selectedRow = null" />
            </q-card>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
