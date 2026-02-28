<script setup lang="ts">
import type { Shipment } from 'src/utils/static/types';

const emit = defineEmits(['update:modelValue']);
const closeDialog = () => {
  emit('update:modelValue', false);
};

const props = defineProps<{
  modelValue: boolean;
  row: Shipment | null;
}>();

console.log('Display More Modal: ', props.row)
</script>

<template>
  <q-dialog :model-value="props.modelValue" @update:model-value="emit('update:modelValue', $event)">
    <q-card style="min-width: 400px">
      <q-form>
        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-6">
              <q-input
                :model-value="props.row?.selectivity"
                class="upper-case"
                label="Selectivity"
                outlined
                readonly
              />
            </div>
            <div class="col-6">
              <q-input
                :model-value="props.row?.warehouse_id"
                class="upper-case"
                label="Warehouse ID"
                outlined
                readonly
              />
            </div>
          </div>
        </q-card-section>

        <q-card-section v-if="props.row?.financeSummary?.length">
          <div class="text-overline text-weight-bolder text-primary">Finance Summary</div>

          <div
            v-for="(item, index) in props.row.financeSummary"
            :key="index"
            class="row q-col-gutter-sm q-mb-sm"
          >
            <div class="col-8">
              <q-input :model-value="item.title" label="Title" outlined readonly />
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

<style scoped>
.upper-case :deep(input) {
  text-transform: uppercase;
}
</style>