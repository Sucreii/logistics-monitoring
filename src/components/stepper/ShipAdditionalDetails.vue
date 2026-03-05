<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { getAllUsers, getAllShipment } from 'src/stores/ShipmentStore';
import { CreateAdditionalShipments, portArr, selectivityArr, sizeArr } from 'src/utils';
import { shipmentForm2 } from 'src/stores/AllPostReactive';

onMounted(async () => {
  await graphUsers.fetchUsers();
  await graphShipment.fetchShipments();
});

type ShipmentInputKeys = Exclude<keyof typeof shipmentForm2, 'finances' | 'containers'>;
const shipInfo = shipmentForm2;
const graphUsers = getAllUsers();
const graphShipment = getAllShipment();
const portOptions = ref(portArr);
const selectivityOptions = ref(selectivityArr);
const sizeOptions = ref(sizeArr);
const userSelectOptions = computed(() => {
  return graphUsers.user
    .filter((user) => {
      if (Number(user.role.id) == 4) {
        return user;
      }
    })
    .map((user) => ({
      label: user.username,
      value: user.username,
    }));
});

const addConWare = () => {
  shipmentForm2.containers.push({
    container_id: '',
    warehouse_id: '',
  });
};

const removeConWare = (index: number) => {
  shipmentForm2.containers.splice(index, 1);
};
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
          <div class="text-subtitle4 text-grey-8">{{ field.label }}</div>
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
            v-else-if="field.variant === 'selectivity'"
            v-model="shipInfo[field.model as keyof typeof shipInfo]"
            :options="selectivityOptions"
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
            :options="portOptions"
            :placeholder="field.placeholder"
            :rules="field.rules"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-select
            v-else-if="field.variant === 'sizeForVol'"
            v-model="shipInfo[field.model as keyof typeof shipInfo]"
            :options="sizeOptions"
            :placeholder="field.placeholder"
            :rules="field.rules"
            option-value="size"
            option-label="label"
            emit-value
            map-options
            dense
            outlined
            clearable
          />

          <q-input
            v-else-if="field.type !== 'date'"
            v-model="shipInfo[field.model as ShipmentInputKeys]"
            :placeholder="field.placeholder"
            :rules="field.rules"
            class="input-uppercase"
            dense
            outlined
            clearable
          />

          <q-input
            v-else
            v-model="shipInfo[field.model as ShipmentInputKeys]"
            :placeholder="field.placeholder"
            :rules="field.rules"
            class="input-uppercase"
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

    <!-- - - - - - - - - - - ADD CONTAINERS / WAREHOUSE - - - - - - - - - -->
    <div class="col-12 q-col-gutter-sm">
      <div class="row justify-end q-mb-sm">
        <q-btn @click="addConWare" color="primary" icon="add" />
      </div>

      <div
        v-for="(containers, index) in shipmentForm2.containers"
        :key="index"
        class="row q-col-gutter-sm"
      >
        <div class="col-6">
          <q-input
            v-model="containers.container_id"
            :rules="[
              (val) => !!val || 'Container ID is required',
              (val) =>
                (val && /^[A-Za-z]{4}\d{7}$/.test(val as string)) ||
                'Format should be: ABCD1234567',
            ]"
            class="input-uppercase"
            label="Container ID"
            dense
            outlined
          />
        </div>

        <div class="col-5">
          <q-input
            v-model="containers.warehouse_id"
            class="input-uppercase"
            label="Warehouse"
            dense
            outlined
          />
        </div>

        <div class="col-1">
          <q-btn
            v-if="shipmentForm2.containers.length > 1"
            @click="removeConWare(index)"
            icon="delete"
            color="negative"
            flat
            dense
          />
        </div>
      </div>
    </div>
  </div>
</template>
