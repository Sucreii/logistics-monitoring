import { ref } from 'vue';
import { defineStore } from 'pinia';
import { HTTP_API } from 'src/boot/axios';
import { apolloClient } from 'src/boot/apollo';
import { shipmentForm, truckForm, tripsForm, storablesForm, shipmentForm2 } from 'src/stores/AllPostReactive';
import type {
  Shipment,
  Users,
  Storables,
  Trucks,
  DashboardStats,
  Trips,
  SearchShipmentType,
  SearchTripType
} from 'src/utils/static/types';
import gql from 'graphql-tag';

const GET_PAGINATED_SHIPMENTS = gql`
  query FindAllShipments($skip: Int!, $take: Int!) {
    shipments(skip: $skip, take: $take) {
      items {
        id
        blno
        selectivity
        reference
        contract_no
        registry_no
        shipping_line
        entry_no
        status
        volumex
        volumey
        port_id
        warehouse_id
        containers {
          id
          type
          description
        }
        customer {
          id
          username
        }
        issuer {
          id
          username
        }
        financeSummary {
          title
          type
          value
        }
      }
      totalCount
      hasMore
    }
  }
`;

const GET_PAGINATED_TRIPS = gql`
  query GetPaginatedTrips($skip: Int!, $take: Int!) {
    trips(skip: $skip, take: $take) {
      totalCount
      hasMore
      items {
        id
        commodity
        base_rate
        volumex
        volumey
        date_delivered
        truck {
          id
          operator
        }
        warehouse {
          id
          description
        }
        port {
          id
          description
        }
        container {
          id
          description
        }
        financeSummary {
          title
          type
          value
        }
      }
    }
  }
`;

const GET_PAGINATED_USERS = gql`
  query GetPaginated($skip: Int!, $take: Int!) {
    user(skip: $skip, take: $take) {
      totalCount
      hasMore
      items {
        id
        username
        first_name
        middle_name
        last_name
        last_logged_in
        current_session
        role {
          id
          title
        }
      }
    }
  }
`;

const GET_PORT_STORABLES = gql`
  query GetStorables($skip: Int!, $take: Int!, $type: String) {
    storables(skip: $skip, take: $take, type: $type) {
      totalCount
      hasMore
      items {
        id
        type
        description
        date_created
      }
    }
  }
`;

const GET_TRUCK_STORABLES = gql`
  query GetPaginatedShipments($skip: Int!, $take: Int!) {
    trucks(skip: $skip, take: $take, showArchived: true) {
      totalCount
      hasMore
      items {
        id
        operator
        is_archived
        date_added
      }
    }
  }
`;

const POST_NEW_SHIPMENTINFO = gql`
  mutation CreateShipment($input: CreateShipmentInput!) {
    createShipment(input: $input) {
      id
      blno
      selectivity
      reference
      port_id
      warehouse_id
      shipping_line
      status
      customer {
        id
        username
      }
      issuer {
        id
        username
      }
      volumex
      volumey
      estimated_time_arrival
      containers {
        id
        type
        date_created
      }
      financeSummary {
        title
        value
        type
      }
    }
  }
`;

const POST_NEW_TRANSITINFO = gql`
  mutation CreateNewTrip($input: CreateTripInput!) {
    createTrip(input: $input) {
      commodity
      base_rate
      volumex
      volumey
      date_delivered
      truck {
        id
        operator
        is_archived
        date_added
      }
      container {
        id
        type
        description
        date_created
      }
      port {
        id
        type
        description
        date_created
      }
      financeSummary {
        title
        type
        value
      }
    }
  }
`;

const POST_NEW_USERSINFO = gql`
  mutation CreateNewShipment($input: CreateShipmentInput!) {
    createShipment(input: $input) {
      id
      blno
      status
      customer {
        username
      }
      issuer {
        username
      }
    }
  }
`;

const POST_NEW_STORABLES = gql`
  mutation CreateNewStorable($input: CreateStorableInput!) {
    createStorable(input: $input) {
      id
      type
      description
      date_created
      created_by
    }
  }
`;

const POST_NEW_TRUCKS = gql`
  mutation CreateNewTruck($input: CreateTruckInput!) {
    createTruck(input: $input) {
      id
      operator
    }
  }
`;

// - - - - - - - - - - OTHERS - - - - - - - - - -
const ARCHIVE_TRUCKS = gql`
  mutation ArchiveVehicle($id: String!) {
    archiveTruck(id: $id) {
      id
      is_archived
    }
  }
`;

const UNARCHIVE_TRUCKS = gql`
  mutation RestoreVehicle($id: String!) {
    restoreTruck(id: $id) {
      id
      is_archived
    }
  }
`;

const SEARCH_SHIPMENTS = gql`
  query SearchShipments($searchTerm: String!) {
    shipment(input: $searchTerm) {
      items {
        id
        selectivity
        blno
        reference
        contract_no
        registry_no
        entry_no
        shipping_line
        volumex
        volumey
        status
        warehouse_id
        containers {
          id
          type
          description
        }
        financeSummary {
          title
          type
          value
        }
        customer {
          id
          username
        }
        issuer {
          id
          username
        }
      }
      totalCount
      hasMore
    }
  }
`;

const SEARCH_TRIPS = gql`
query GetPaginatedTrips($query: String) {
  searchTrips(query: $query) {
    totalCount
    hasMore
    items{
        id
        commodity
        date_delivered
        truck {
            id
            operator
        }
        warehouse {
            id
            description
        }
        port {
            id
            description
        }
        container {
            id
            description
        }
        financeSummary {
            title
            type
            value
        }
    }
  }
}
`

const UPDATE_SHIPMENT = gql`
  mutation UpdateMyShipment($input: UpdateShipmentInput!) {
  updateShipment(input: $input) {
    id
    selectivity
    blno
    reference
    shipping_line
    port_id
    warehouse_id
    status
    containers {
        id
        type
        description
    }
    customer{
        id
        username
    }
    issuer{
        id
        username
    }
    volumex
    volumey
    estimated_time_arrival
    containers {
        id 
        type
        date_created
    }
    financeSummary {
      title
      value
      type
    }
  }
}
`

const UPDATE_TRIP = gql`
  mutation UpdateMyTrip($input: UpdateTripInput!) {
    updateTrip(input: $input) {
      id
      commodity
      base_rate
      volumex
      volumey
      date_delivered
      truck {
          id
          operator
          is_archived
          date_added
      }
      container {
          id
          type
          description
          date_created
      }
      port {
          id
          type
          description
          date_created
      }
      
      financeSummary {
        title
        type
        value
      }
    }
  }
`

// - - - - - - - - - - API CALL - - - - - - - - -
export const getDashStats = defineStore('dashStats', () => {
  const stats = ref<DashboardStats | null>(null);

  async function fetchStats() {
    const response = await HTTP_API().get('/dashboard/stats');
    stats.value = response.data;

    console.log('FETCH DASHBOARD STATS:', response.data);
  }

  return { stats, fetchStats };
});

export const getAllShipment = defineStore('shipment', {
  state: () => ({
    shipments: [] as Shipment[],
    totalCount: 0,
    hasMore: false,
    loading: false,
    skip: 0,
    take: 10,
  }),

  actions: {
    async fetchShipments(skip: number = 0, take: number = 10) {
      this.loading = true;
      try {
        const { data } = await apolloClient.query({
          query: GET_PAGINATED_SHIPMENTS,
          variables: { skip, take },
          fetchPolicy: 'network-only',
        });

        if (data?.shipments) {
          this.shipments = data.shipments.items;
          this.totalCount = data.shipments.totalCount;
          this.hasMore = data.shipments.hasMore;
        }
        console.log('SHIPMENTS RESPONSE: ', data);
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});

export const getAllTrips = defineStore('trips', {
  state: () => ({
    trips: [] as Trips[],
    totalCount: 0,
    hasMore: false,
    loading: false,
    skip: 0,
    take: 10,
  }),

  actions: {
    async fetchTrips(skip: number = 0, take: number = 10) {
      this.loading = true;
      try {
        const { data } = await apolloClient.query({
          query: GET_PAGINATED_TRIPS,
          variables: { skip, take },
          fetchPolicy: 'network-only',
        });

        if (data?.trips) {
          this.trips = data.trips.items;
          this.totalCount = data.trips.totalCount;
          this.hasMore = data.trips.hasMore;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});

export const getAllUsers = defineStore('users', {
  state: () => ({
    user: [] as Users[],
    totalCount: 0,
    hasMore: false,
    loading: false,
    skip: 0,
    take: 10,
  }),

  actions: {
    async fetchUsers(skip: number = 0, take: number = 10) {
      this.loading = true;
      try {
        const { data } = await apolloClient.query({
          query: GET_PAGINATED_USERS,
          variables: { skip, take },
          fetchPolicy: 'network-only',
        });

        if (data?.user) {
          this.user = data.user.items;
          this.totalCount = data.user.totalCount;
          this.hasMore = data.user.hasMore;
        }
        console.log('USERS RESPONSE: ', data);
      } catch (error) {
        console.error('Error fetching Users data: ', error);
      } finally {
        this.loading = false;
      }
    },
  },
});

export const getAllPortStorables = defineStore('portStorables', {
  state: () => ({
    storables: [] as Storables[],
    totalCount: 0,
    hasMore: false,
    loading: false,
    skip: 0,
    take: 50,
  }),

  actions: {
    async fetchPortStores(type?: string) {
      this.loading = true;
      try {
        const { data } = await apolloClient.query({
          query: GET_PORT_STORABLES,
          variables: {
            skip: 0,
            take: 50,
            type: type || null,
          },
          fetchPolicy: 'network-only',
        });

        if (data?.storables?.items) {
          this.storables = data.storables.items;
        }
        console.log('PORT RESPONSE: ', data.data);
      } catch (error) {
        console.error('Fetching Port Error: ', error);
      } finally {
        this.loading = false;
      }
    },
  },
});

export const getTruckStorables = defineStore('truckStorables', {
  state: () => ({
    trucks: [] as Trucks[],
    totalCount: 0,
    hasMore: false,
    loading: false,
    skip: 0,
    take: 50,
  }),

  actions: {
    async fetchTruckStores(type?: string) {
      this.loading = true;
      try {
        const { data } = await apolloClient.query({
          query: GET_TRUCK_STORABLES,
          variables: {
            skip: 0,
            take: 50,
            type: type || null,
          },
          fetchPolicy: 'network-only',
        });

        if (data?.trucks?.items) {
          this.trucks = data.trucks.items;
        }
        console.log('TRUCK RESPONSE: ', data);
      } catch (error) {
        console.error('Fetching Port Error: ', error);
      } finally {
        this.loading = false;
      }
    },
  },
});

export const useShipmentInfo = defineStore('postShipment', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async submitShipment() {
      // const payload = {
      //   ...shipmentForm2,
      //   // containers: shipmentForm2.containers.map(c => typeof c === 'object' ? String(c.id) : String(c)),
      //   containers: Array.isArray(shipmentForm2.containers) ? shipmentForm2.containers : [],

      //   finances: shipmentForm2.finances.map((f) => ({
      //     title: f.title,
      //     type: f.type,
      //     value: Number(f.value),
      //   })),
      // };

      const input = {
        blno: shipmentForm2.blno,
        selectivity: shipmentForm2.selectivity,
        contract_no: shipmentForm2.contract_no?.trim() || 'N/A', 
        entry_no: shipmentForm2.entry_no,
        registry_no: shipmentForm2.registry_no,
        port_id: shipmentForm2.port_id,
        warehouse_id: shipmentForm2.warehouse_id,
        shipping_line: shipmentForm2.shipping_line,
        volumex: Number(shipmentForm2.volumex),
        volumey: Number(shipmentForm2.volumey),
        customer_username: shipmentForm2.customer_username,
        issuer_username: shipmentForm2.issuer_username,
        estimated_time_arrival: shipmentForm2.estimated_time_arrival,

        containers: shipmentForm2.containers 
          ? [String(shipmentForm2.containers)] 
          : [],

        finances: shipmentForm2.finances.map((f) => ({
          title: f.title,
          type: f.type,
          value: Number(f.value),
        })),
      }
      console.log('I AM PAYLOAD SHIPMENT: ', input)

      const { data } = await apolloClient.mutate({
        mutation: POST_NEW_SHIPMENTINFO,
        variables: { input },
      });

      return data.createShipment;
    },
  },
});

export const useTransitInfo = defineStore('postTransit', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async createTrip() {
      const payload = {
        ...tripsForm,

        finances: tripsForm.finances.map((f) => ({
          title: f.title,
          type: f.type,
          value: Number(f.value),
        })),
      };

      const { data } = await apolloClient.mutate({
        mutation: POST_NEW_TRANSITINFO,
        variables: { input: payload },
      });

      return data.createTrip;
    },
  },
});

export const useStorablesInfo = defineStore('postPortStore', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async submitNewPortStore() {
      this.loading = true;

      try {
        const { data } = await apolloClient.mutate({
          mutation: POST_NEW_STORABLES,
          variables: { input: storablesForm.value },
        });

        console.log('New Port Storables created: ', data.createStorable);
        return data.createStorable;
      } catch (err) {
        console.error(err);

        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

export const useUsersInfo = defineStore('postUsers', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async submitUser() {
      // const $q = useQuasar();
      this.loading = true;
      console.log(typeof shipmentForm.volumex, typeof shipmentForm.volumey);

      try {
        const { data } = await apolloClient.mutate({
          mutation: POST_NEW_USERSINFO,
          variables: {
            input: {
              ...shipmentForm,
              volumex: Number(shipmentForm.volumex),
              volumey: Number(shipmentForm.volumey),
            },
          },
        });
        console.log('New User created: ', data.createShipment);
        return data.createShipment;
      } catch (err) {
        console.error(err);

        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

export const useTrucksInfo = defineStore('postTrucking', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async submitTrucking() {
      this.loading = true;

      try {
        const { data } = await apolloClient.mutate({
          mutation: POST_NEW_TRUCKS,
          variables: { input: truckForm.value },
        });

        console.log('New Truck created: ', data.createTruck);
        return data.createTruck;
      } catch (err) {
        console.error(err);

        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

// - - - - - - - - - - OTHERS API CALL - - - - - - - - -
export const hideTrucksProfile = defineStore('hideTrucking', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async hideTrucking(id: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient.mutate({
          mutation: ARCHIVE_TRUCKS,
          variables: { id },
        });

        console.log('Truck Profile hidden: ', data.archiveTruck);
        return data.archiveTruck;
      } catch (err) {
        console.error(err);

        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

export const unHideTrucksProfile = defineStore('unHideTrucking', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async unHideTrucking(id: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient.mutate({
          mutation: UNARCHIVE_TRUCKS,
          variables: { id },
        });

        console.log('Truck Profile hidden: ', data.restoreTruck);
        return data.restoreTruck;
      } catch (err) {
        console.error(err);

        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

export const searchShipmentsItem = defineStore('searchShipmentsFunction', {
  state: () => ({
    loading: false,
    searchResults: [] as SearchShipmentType[],
    totalCount: 0,
  }),

  actions: {
    async searchForShipments(searchTerm: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient.query<{
          shipment: { items: SearchShipmentType[]; totalCount: number };
        }>({
          query: SEARCH_SHIPMENTS,
          variables: { searchTerm },
        });

        console.log('SEARCH TERM: ', data.shipment);
        if (data?.shipment) {
          this.searchResults = data.shipment.items;
          this.totalCount = data.shipment.totalCount;
        }

        return data.shipment;
      } catch (err) {
        console.error('Error on Searching for Shipment Term: ', err);

        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

export const searchTripsItem = defineStore('searchTripsFunction', {
  state: () => ({
    loading: false,
    searchResults: [] as SearchTripType[],
    totalCount: 0,
  }),

  actions: {
    async searchForTrips(query: string) {
      this.loading = true;

      try {
        const { data } = await apolloClient.query<{
          searchTrips: { items: SearchTripType[]; totalCount: number };
        }>({
          query: SEARCH_TRIPS,
          variables: { query },
        });

        console.log('SEARCH TRIP TERM: ', data.searchTrips);
        if (data?.searchTrips) {
          this.searchResults = data.searchTrips.items;
          this.totalCount = data.searchTrips.totalCount;
        }

        return data.searchTrips;
      } catch (err) {
        console.error('Error on Searching for Trips Term: ', err);

        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

export const updateShipmentForm = defineStore('updateShipmentForm', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async submitUpdateShipment() {
      this.loading = true;

      try {
        const payload = {
          ...shipmentForm,
          volumex: Number(shipmentForm.volumex),
          volumey: Number(shipmentForm.volumey),
          containers: Array.isArray(shipmentForm.containers) ? shipmentForm.containers : []
        }

        const { data } = await apolloClient.mutate({
          mutation: UPDATE_SHIPMENT,
          variables: { input: payload },
        });

        console.log('Updated Shipment: ', data.updateShipment);
        return data.updateShipment;
      } catch (err) {
        console.error(err);

        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});

export const updateTripsForm = defineStore('updateTripsForm', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async submitUpdateTrip() {
      if (this.loading) return
      this.loading = true;

      try {
        const payload = {
          ...tripsForm,
          base_rate: Number(tripsForm.base_rate),
          volumex: Number(tripsForm.volumex),
          volumey: Number(tripsForm.volumey),
          finances: tripsForm.finances.map(f => ({
            title: f.title,
            type: f.type,
            value: Number(f.value)
          }))
        }

        const { data } = await apolloClient.mutate({
          mutation: UPDATE_TRIP,
          variables: { input: payload },
          fetchPolicy: 'no-cache'
        });

        return data.updateTrip;

      } catch (err) {
        console.error('Error updating trip:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});