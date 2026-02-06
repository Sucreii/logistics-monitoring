<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useShipmentStore } from 'src/stores/ShipmentStore';
import { shipmentForm } from 'src/stores/AllPostReactive';
// import { useShipmentInfo } from 'src/stores/ShipmentStore';

const shipmentStore = useShipmentStore();
const { shipmentData } = storeToRefs(shipmentStore);
// const {finalSubmissionReport} = storeToRefs(useShipmentInfo);

defineExpose({ shipmentData });

const shipInfo = ref(shipmentForm);
console.log('shipmentData', shipmentData.value);
console.log('shipInfo.value', shipInfo.value);

// const res = finalSubmissionReport()
</script>

<template>
  <div class="row q-col-gutter-x-md q-col-gutter-y-md">
    <div class="col-6">
      <div class="col-12 text-h6 text-center">Expense Information</div>
      <div
        class="row q-gutter-y-md q-col-gutter-x-sm q-col-gutter-y-sm"
        v-for="item in shipmentData?.shipmentExpense"
        :key="item.id"
      >
        <div class="col-6">
          <q-input label="Name" v-model="item.name" outlined readonly />
        </div>
        <div class="col-6">
          <q-input label="Value" v-model="item.value" outlined />
        </div>
      </div>
    </div>

    <div class="col-6">
      <div class="col-12 text-h6 text-center">Revenue Information</div>
      <div
        class="row q-gutter-y-md q-col-gutter-x-sm q-col-gutter-y-sm"
        v-for="item in shipmentData?.shipmentRevenue"
        :key="item.id"
      >
        <div class="col-6">
          <q-input label="Name" v-model="item.name" outlined readonly />
        </div>
        <div class="col-6">
          <q-input label="Value" v-model="item.value" outlined />
        </div>
      </div>
    </div>

    <!-- <div class="col-12">
      <q-btn color="primary" label="Finish" type="submit" />
    </div> -->
  </div>
</template>
