<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { getAllUsers, getAllPortStorables, getAllShipment } from 'src/stores/ShipmentStore';
import { CreateAdditionalShipments } from 'src/utils';
import { shipmentForm2 } from 'src/stores/AllPostReactive';

onMounted(async () => {
  await graphUsers.fetchUsers();
  await graphPorts.fetchPortStores();
  await graphShipment.fetchShipments();
});

type ShipmentInputKeys = Exclude<keyof typeof shipmentForm2, 'finances' | 'containers'>;
const shipInfo = shipmentForm2;
const graphUsers = getAllUsers();
const graphPorts = getAllPortStorables();
const graphShipment = getAllShipment();

const userSelectOptions = computed(() => {
  return graphUsers.user.map((user) => ({
    label: user.username,
    value: user.username,
  }));
});

const portSelectOptions = computed(() => {
  return graphPorts.storables
    .filter((port) => port.type === 'PORT' || port.type === 'port')
    .map((port) => ({
      label: port.id,
      value: port.id,
    }));
});

console.log('Port select options: ', portSelectOptions);
</script>

<template>
  <div class="row q-col-gutter-sm">
    <div
      v-for="field in CreateAdditionalShipments"
      :class="`col-${field.col}`"
      :key="field.model"
      dense
    >
      <div class="row">
        <div class="col-12">
          <div class="text-subtitle3 text-grey-8">{{ field.label }}</div>
        </div>

        <div class="col-12">
          <q-select
            v-if="field.type === 'select' && field.variant === 'name'"
            v-model="shipInfo[field.model as keyof typeof shipInfo]"
            :options="userSelectOptions"
            :placeholder="field.placeholder"
            :rules="field.rules"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-input
            v-else-if="field.type === 'number'"
            v-model.number="shipInfo[field.model as ShipmentInputKeys]"
            type="number"
            :placeholder="field.placeholder"
            :rules="field.rules"
            dense
            outlined
            clearable
          />

          <q-input
            v-else-if="field.type !== 'date' && field.type !== 'select'"
            v-model="shipInfo[field.model as ShipmentInputKeys]"
            :type="field.type"
            :placeholder="field.placeholder"
            :rules="field.rules"
            class="upper-case"
            dense
            outlined
            clearable
          />

          <!-- - - - - - DATE AND TIME - - - - - -->
          <q-input
            v-else
            v-model="shipInfo[field.model as ShipmentInputKeys]"
            :placeholder="field.placeholder"
            :rules="field.rules"
            class="upper-case"
            dense
            outlined
            clearable
          >
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="shipInfo[field.model as keyof typeof shipInfo]"
                    mask="YYYY-MM-DD"
                  />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
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