<script lang="ts" setup>
import { ref } from 'vue';
import { CreateAdditionalPort } from 'src/utils';
import { storablesForm } from 'src/stores/AllPostReactive';

const truckInfo = ref(storablesForm);
</script>
<template>
  <div class="row q-col-gutter-sm">
    <div v-for="field in CreateAdditionalPort" :class="`col-${field.col}`" :key="field.model">
      <div class="row">
        <div class="col-12">
          <div class="text-subtitle3 text-grey-8">{{ field.label }}</div>
        </div>

        <div class="col-12">
          <q-input
            v-if="field.model === 'type'"
            v-model="truckInfo[field.model as keyof typeof truckInfo]"
            :type="field.type"
            :placeholder="field.placeholder"
            :rules="field.rules"
            readonly
            dense
            outlined
          />
          <q-input
            v-else
            v-model="truckInfo[field.model as keyof typeof truckInfo]"
            :type="field.type"
            :placeholder="field.placeholder"
            :rules="field.rules"
            class="upper-case"
            dense
            outlined
            clearable
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upper-case :deep(input) {
  text-transform: uppercase;
}
</style>