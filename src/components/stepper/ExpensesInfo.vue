<script lang="ts" setup>
import { shipmentForm2 } from 'src/stores/AllPostReactive';

const addFinance = () => {
  shipmentForm2.finances.push({
    title: '',
    type: 'amount',
    value: 0,
  });
};

const removeFinance = (index: number) => {
  shipmentForm2.finances.splice(index, 1);
};

</script>

<template>
  <div class="q-col-gutter-md">
    <div class="row justify-end q-mb-sm">
      <q-btn @click="addFinance" label="Add" color="primary" icon="add" />
    </div>

    <div v-for="(finance, index) in shipmentForm2.finances" :key="index" class="row q-col-gutter-sm">
      <div class="col-4">
        <q-input v-model="finance.title" label="Title" dense outlined />
      </div>

      <div class="col-3">
        <q-select
          v-model="finance.type"
          :options="[
            { label: 'Amount', value: 'amount' },
            { label: 'Percentage', value: 'percentage' },
          ]"
          label="Type"
          emit-value
          map-options
          dense
          outlined
          clearable
        />
      </div>

      <div class="col-4">
        <q-input
          v-model.number="finance.value"
          label="Value"
          type="number"
          dense
          outlined
          clearable
        />
      </div>

      <div class="col-1">
        <q-btn
          v-if="shipmentForm2.finances.length > 1"
          @click="removeFinance(index)"
          icon="delete"
          color="negative"
          flat
          dense
        />
      </div>
    </div>
  </div>
</template>
