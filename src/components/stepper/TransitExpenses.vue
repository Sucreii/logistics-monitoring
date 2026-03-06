<script lang="ts" setup>
import { tripsForm2 } from 'src/stores/AllPostReactive';

const shipInfo = tripsForm2;
const addFinance = () => {
  tripsForm2.finances.push({
    title: '',
    type: 'amount',
    value: 0,
  });
};

// const removeFinance = (index: number) => {
//   tripsForm2.finances.splice(index, 1);
// };
</script>
<template>
  <div class="q-col-gutter-md">
    <div class="row justify-start">
      <q-input :rules="[
        (val) => (val !== null && val !== '') || 'Value is required',
        (val) => parseFloat(val) > 0 || 'Value cannot be zero',
      ]" v-model="shipInfo.base_rate" type="number" label="Base Rate" dense outlined clearable />
    </div>
    <!-- - - - - - - - - - - ADD EXPENSES - - - - - - - - - - -->
    <div class="row justify-end q-mb-sm">
      <q-btn @click="addFinance" label="Add" color="primary" icon="add" />
    </div>

    <div v-for="(finance, index) in tripsForm2.finances" :key="index" class="row q-col-gutter-sm">
      <div class="col-4">
        <q-input class="input-uppercase" v-model="finance.title" label="Title" dense readonly outlined />
      </div>

      <div class="col-3">
        <q-input class="input-uppercase" v-model="finance.type" emit-value map-options dense outlined readonly />
      </div>

      <div class="col-4">
        <q-input v-model.number="finance.value" :rules="[
          (val) => (val !== null && val !== '') || 'Value is required',
          (val) => val !== 0 || 'Value cannot be zero',
        ]" label="Value" type="number" dense outlined clearable />
      </div>

      <div class="col-1">
        <!-- <q-btn v-if="tripsForm2.finances.length > 1" @click="removeFinance(index)" icon="delete" color="negative" flat
          dense /> -->
      </div>
    </div>
  </div>
</template>
