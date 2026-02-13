<script lang="ts" setup>
import { ref } from 'vue';
import { CreateExpensesShipmentsFields } from 'src/utils';
import { shipmentForm } from 'src/stores/AllPostReactive';

const shipInfo = ref(shipmentForm);
console.log('I am Expenses: ', shipInfo);
</script>

<template>
  <div class="row q-col-gutter-sm">
    <div
      v-for="field in CreateExpensesShipmentsFields"
      :class="`col-${field.col}`"
      :key="field.index"
    >
      <div class="row">
        <div class="col-12">
          <div class="text-subtitle3 text-grey-8">{{ field.label }}</div>
        </div>

        <div class="col-12">
          <q-input
            v-model.number="shipInfo.finances[field.index]!.value"
            type="number"
            placeholder="₱"
            dense
            outlined
            clearable
          />
        </div>
      </div>
    </div>
  </div>
</template>
