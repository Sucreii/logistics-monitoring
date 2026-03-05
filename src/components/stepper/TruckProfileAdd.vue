<script lang="ts" setup>
import { ref } from 'vue';
import { date } from 'quasar';
import { CreateAdditionalTrucks } from 'src/utils';
import { truckForm } from 'src/stores/AllPostReactive';

const truckInfo = ref(truckForm);
const now = new Date();
truckForm.value.date_added = date.formatDate(now, 'YYYY-MM-DD');
</script>

<template>
  <div class="row q-col-gutter-sm">
    <div v-for="field in CreateAdditionalTrucks" :class="`col-${field.col}`" :key="field.model">
      <div class="row">
        <div class="col-12">
          <div class="text-subtitle3 text-grey-8">{{ field.label }}</div>
        </div>

        <div class="col-12">
          <q-input
            v-if="field.variant === 'date'"
            v-model="truckInfo.date_added"
            outlined
            dense
            readonly
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date v-model="truckInfo.date_added" mask="MMM DD, YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-else
            v-model="truckInfo[field.model as keyof typeof truckInfo]"
            :type="field.type"
            :placeholder="field.placeholder"
            :rules="field.rules"
            class="input-uppercase"
            dense
            outlined
            clearable
          />
        </div>
      </div>
    </div>
  </div>
</template>
