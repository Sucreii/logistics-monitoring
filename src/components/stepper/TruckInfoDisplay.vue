<script lang="ts" setup>
import { computed } from 'vue';
import { truckForm } from 'src/stores/AllPostReactive';

const truckInfo = computed(() => truckForm.value);
const truckInfoArr = computed(() => [
  { label: 'Truck ID', modelVal: truckForm.value.id, col: `7` },
  { label: 'Date Created', modelVal: truckForm.value.date_added, col: `5` },
]);
console.log('Truck Info: ', truckInfo.value);
</script>

<template>
  <div class="row q-col-gutter-sm">
    <div v-for="item in truckInfoArr" :key="item.label" :class="`col-${item.col}`">
      <q-input
        :model-value="item.modelVal"
        :label="item.label"
        class="input-uppercase"
        outlined
        readonly
      />
    </div>
  </div>
</template>
