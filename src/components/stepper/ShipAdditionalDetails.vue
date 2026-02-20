<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { getAllUsers, getAllPortStorables, getAllShipment } from 'src/stores/ShipmentStore';
import { CreateAdditionalShipments } from 'src/utils';
import { shipmentForm } from 'src/stores/AllPostReactive';

onMounted(async () => {
  await graphUsers.fetchUsers();
  await graphPorts.fetchPortStores();
  await graphShipment.fetchShipments();

  console.log('Shipments fetched: ', graphShipment.shipments);
  console.log('Users fetched: ', graphUsers.user);
  console.log('Ports fetched: ', graphPorts.storables);
});

type ShipmentInputKeys = Exclude<keyof typeof shipmentForm, 'finances'>;
const shipInfo = ref(shipmentForm);
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
  return graphPorts.storables.map((port) => ({
    label: port.id,
    value: port.id,
  }));
});

console.log('I am Users: ', graphUsers);
console.log('I am ShipInfo: ', shipInfo);
console.log('I am User select Options: ', userSelectOptions);
console.log('I am Port select Options: ', portSelectOptions);
</script>

<template>
  <div class="row q-col-gutter-sm">
    <div v-for="field in CreateAdditionalShipments" :class="`col-${field.col}`" :key="field.model">
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

          <q-select
            v-else-if="field.variant === 'port'"
            v-model="shipInfo[field.model as keyof typeof shipInfo]"
            :options="portSelectOptions"
            :placeholder="field.placeholder"
            :rules="field.rules"
            emit-value
            map-options
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
            dense
            outlined
            clearable
          >
            <template #append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="shipInfo[field.model as keyof typeof shipInfo]"
                    mask="YYYY-MM-DD HH:mm"
                  />
                </q-popup-proxy>
              </q-icon>

              <q-icon name="schedule" class="cursor-pointer q-ml-sm">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time
                    v-model="shipInfo[field.model as ShipmentInputKeys]"
                    mask="YYYY-MM-DD HH:mm"
                    format24h
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
