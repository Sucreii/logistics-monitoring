<script lang="ts" setup>
import { computed } from 'vue';
import { truckForm } from 'src/stores/AllPostReactive';

const truckInfo = computed(() => truckForm.value);
console.log('Truck Info: ', truckInfo.value);
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-4">
      <q-input :model-value="truckForm.id" label="Truck Name" outlined readonly />
    </div>
    <div class="col-5">
      <q-input :model-value="truckForm.operator" label="Operator Name" outlined readonly />
    </div>
    <div class="col-3">
      <q-input :model-value="truckForm.date_added" label="Date Created" outlined readonly />
    </div>
  </div>
</template>
