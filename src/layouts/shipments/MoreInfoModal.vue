<script setup lang="ts">
import { useAuthStore } from 'src/stores/LoginAuth';
import type { Shipment } from 'src/utils/static/types';

const authStore = useAuthStore();
const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
  emit('update:modelValue', false);
};

const props = defineProps<{
  modelValue: boolean;
  row: Shipment | null;
}>();
</script>

<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card style="min-width: 550px">
      <q-form>
        <q-card-section class="q-pb-sm">
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input
                :model-value="props.row?.selectivity"
                :input-class="`text-${props.row?.selectivity?.toLowerCase()}`"
                class="input-uppercase"
                label="Selectivity"
                outlined
                readonly
              />
            </div>
            <div class="col-6">
              <q-input
                :model-value="props.row?.reference"
                class="input-uppercase"
                label="Reference"
                outlined
                readonly
              />
            </div>
          </div>
        </q-card-section>

        <q-card-section v-if="props.row?.containers?.length" class="q-pt-none">
          <div
            v-for="(item, index) in props.row.containers"
            :key="index"
            class="row q-col-gutter-sm q-mb-sm"
          >
            <div class="col-6">
              <q-input
                :model-value="item.id"
                class="input-uppercase"
                label="Container ID"
                outlined
                readonly
              />
            </div>

            <div class="col-6">
              <q-input
                :model-value="item.warehouse_id || 'N/A'"
                class="input-uppercase"
                label="Warehouse"
                outlined
                readonly
              />
            </div>
          </div>
        </q-card-section>

        <q-card-section
          v-if="
            props.row?.financeSummary?.length &&
            ['Super Admin', 'Admin'].includes(authStore.roleLabel)
          "
          class="q-pt-none"
        >
          <div class="text-overline text-weight-bolder text-primary">Finance Summary</div>

          <div
            v-for="(item, index) in props.row.financeSummary"
            :key="index"
            class="row q-col-gutter-sm q-mb-sm"
          >
            <div class="col-8">
              <q-input
                :model-value="item.title"
                class="input-uppercase"
                label="Title"
                outlined
                readonly
              />
            </div>

            <div class="col-4">
              <q-input
                :model-value="
                  item.type === 'percentage'
                    ? (item.value * 100).toFixed(2) + '%'
                    : item.value.toLocaleString()
                "
                label="Value"
                outlined
                readonly
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn outline style="color: red" label="Close" @click="closeDialog" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
