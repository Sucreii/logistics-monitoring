import { useQuasar } from 'quasar';
import type { ShipmentList } from '../static/types';
import CreateShipmentComponent from 'src/components/modals/AddShipment.vue';
import CreateTripsComponent from 'src/components/modals/AddOrders.vue';
import CreateNewUsersComponent from 'src/components/modals/AddUsers.vue';
import CreateNewTrucksComponent from 'src/components/modals/AddTrucks.vue';
import statusValidationModal from 'src/components/modals/StatusValidation.vue';
// import createValidationModal from 'src/components/modals/AddValidation.vue';

export function useDocumentDialog() {
  const $q = useQuasar();

  const showDocumentDialog = () => {
    $q.dialog({
      component: CreateShipmentComponent,
    }).onOk((data) => {
      console.log('Create new Shipment data: ', data);
    });
  };

  const showCreateShipmentDialog = () => {
    $q.dialog({
      component: CreateTripsComponent,
    }).onOk((data) => {
      console.log('Create New Trips data: ', data);
    });
  };

  const showCreateNewUsersDialog = () => {
    $q.dialog({
      component: CreateNewUsersComponent,
    }).onOk((data) => {
      console.log('Additional User Data: ', data);
    });
  };

  const showCreateNewTrucksDialog = () => {
    $q.dialog({
      component: CreateNewTrucksComponent,
    }).onOk((data) => {
      console.log('Additional Driver Profile: ', data);
    });
  };

  const showStatusValidationDialog = (props: ShipmentList, status: unknown) => {
    $q.dialog({
      component: statusValidationModal,
      componentProps: {
        shipmentData: props,
        shipmentStatus: status,
      },
    }).onOk((data) => {
      console.log('DINE', data);
    });
    console.log('status', status);
  };

  // const showCreateValidationDialog = () => {
  //   // console.log('PROPS', props)
  //   $q.dialog({
  //     component: createValidationModal,
  //   }).onOk((data) => {
  //     console.log('DINE', data);
  //   });
  // };

  return {
    showDocumentDialog,
    showCreateShipmentDialog,
    showStatusValidationDialog,
    showCreateNewUsersDialog,
    showCreateNewTrucksDialog,
    // showCreateValidationDialog,
  };
}
