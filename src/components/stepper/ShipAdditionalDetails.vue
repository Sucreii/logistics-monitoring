<script lang="ts" setup>
import { ref } from 'vue';
import { CreateAdditionalShipments } from 'src/utils';
import { shipmentForm } from 'src/stores/AllPostReactive';

const shipInfo = ref(shipmentForm);
</script>

<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="field in CreateAdditionalShipments"
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
            v-model="shipInfo[field.model as keyof typeof shipInfo]"
            :placeholder="field.placeholder"
            :rules="field.rules"
            dense
            outlined
            clearable
          />
        </div>
      </div>
    </div>
  </div>
</template>
