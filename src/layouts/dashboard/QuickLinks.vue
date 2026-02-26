<script lang="ts" setup>
import { useDocumentDialog } from 'src/utils/composables/dialog';
import { useAuthStore } from 'src/stores/LoginAuth';
import { linksArr } from 'src/utils';
import chart from '../GraphTable.vue';

const authStore = useAuthStore();
const {
  showDocumentDialog,
  showCreateShipmentDialog,
  showCreateNewUsersDialog,
  showCreateNewTrucksDialog,
} = useDocumentDialog();
const dialogMap = {
  shipments: showDocumentDialog,
  trips: showCreateShipmentDialog,
  users: showCreateNewUsersDialog,
  trucks: showCreateNewTrucksDialog,
};
</script>

<template>
  <div class="row q-col-gutter-md">
    <div :class="authStore.roleLabel === 'Viewer' ? 'col-12 column' : 'col-8 column'">
      <q-card flat bordered class="col">
        <q-card-section>
          <chart />
        </q-card-section>
      </q-card>
    </div>

    <div class="col-4 column" v-if="authStore.roleLabel !== 'Viewer'">
      <q-card flat bordered class="col">
        <q-card-section>
          <div class="text-overline text-weight-bolder text-primary">QUICK LINKS</div>
          <div class="column q-gutter-xs">
            <q-btn
              v-for="item in linksArr"
              :key="item.label"
              :label="item.label"
              :icon-right="item.icon"
              align="left"
              color="primary"
              class="text-sm"
              flat
              push
              dense
              @click="dialogMap[item.docDialog]()"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
