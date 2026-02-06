<script lang="ts" setup>
import { ref } from 'vue';
import { CreateTransitDetailsFields } from 'src/utils';

const formData = ref<Record<string, string | number>>({});
</script>

<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="field in CreateTransitDetailsFields"
      :class="['col-' + field.col, field.label]"
      :key="field.model"
      dense
    >
      <div class="row">
        <div class="col-12">
          <div class="text-subtitle2 q-ml-xs text-grey-8">{{ field.label }}</div>
        </div>

        <div class="col-12">
          <q-input
            v-model="formData[field.model]"
            :placeholder="field.placeholder"
            :icon="field.icon"
            dense
            outlined
            clearable
          />
        </div>
      </div>
    </div>
  </div>
</template>
