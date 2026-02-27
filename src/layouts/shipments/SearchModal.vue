<script setup lang="ts">
import type { SearchShipmentType } from 'src/utils/static/types';

defineProps<{
  modelValue: boolean;
  results: SearchShipmentType[];
}>();

defineEmits(['update:modelValue']);
</script>
<template>
  <q-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <q-card style="min-width: 450px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Search Results</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-list bordered separator v-if="results && results.length > 0">
          <q-item v-for="item in results" :key="item.id">
            <q-item-section>
              <q-item-label class="text-weight-bold">{{ item.blno }}</q-item-label>
              <q-item-label caption>Reference: {{ item.reference }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-badge color="teal" :label="item.status" />
            </q-item-section>
          </q-item>
        </q-list>

        <div v-else class="text-center q-pa-md">
          <q-icon name="warning" color="warning" size="40px" />
          <p>No shipments found.</p>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
