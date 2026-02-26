<script lang="ts" setup>
import { computed } from 'vue';
import { storablesForm } from 'src/stores/AllPostReactive';

const portInfo = computed(() => storablesForm.value);
console.log('Truck Info: ', portInfo.value);
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-3">
      <q-input :model-value="storablesForm.id" label="Port Name" outlined readonly />
    </div>
    <div class="col-3">
      <q-input :model-value="storablesForm.type" label="Type" outlined readonly />
    </div>
    <div class="col-6">
      <q-input
        :model-value="storablesForm.description || 'None'"
        label="Description"
        outlined
        readonly
      />
    </div>
  </div>
</template>
