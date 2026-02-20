import { ref } from 'vue';
import { defineStore } from 'pinia';
import { HTTP_API } from 'src/boot/axios';
import { apolloClient } from 'src/boot/apollo';
import { shipmentForm, truckForm } from 'src/stores/AllPostReactive';
import type {
  Shipment,
  Users,
  Storables,
  Trucks,
  DashboardStats,
  Trips,
} from 'src/utils/static/types';
import gql from 'graphql-tag';

const GET_PAGINATED_SHIPMENTS = gql`
  query GetPaginated($skip: Int!, $take: Int!) {
    shipments(skip: $skip, take: $take) {
      totalCount
      hasMore
      items {
        id
        blno
        contract_no
        entry_no
        reference
        registry_no
      }
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

const POST_NEW_TRUCKS = gql`
  mutation CreateNewTruck($input: CreateTruckInput!) {
    createTruck(input: $input) {
      id
      operator
    }
  }
`;

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
    async updateRowsPerPage(newLimit: number) {
      this.take = newLimit;
      this.skip = 0;
      await this.fetchShipments(false);
    },

    async fetchShipments(isLoadMore = false) {
      this.loading = true;
      try {
        const response = await apolloClient.query({
          query: GET_PAGINATED_SHIPMENTS,
          variables: {
            skip: this.skip,
            take: this.take,
          },
          fetchPolicy: 'network-only',
        });

        console.log('I AM GRAPHQL SHIPMENTS RESPONSE: ', response.data);
        const data = response.data?.shipments;
        const incomingItems = data?.items ?? [];

        if (isLoadMore) {
          this.shipments.push(...incomingItems);
        } else {
          this.shipments = incomingItems;
        }

        this.totalCount = data?.totalCount ?? 0;
        this.hasMore = data?.hasMore ?? false;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
});

export const getAllTrips = defineStore('shipment', {
  state: () => ({
    trips: [] as Trips[],
    totalCount: 0,
    hasMore: false,
    loading: false,
    skip: 0,
    take: 10,
  }),

  actions: {
    async updateRowsPerPage(newLimit: number) {
      this.take = newLimit;
      this.skip = 0;
      await this.fetchShipments(false);
    },

    async fetchShipments(isLoadMore = false) {
      this.loading = true;
      try {
        const response = await apolloClient.query({
          query: GET_PAGINATED_TRIPS,
          variables: {
            skip: this.skip,
            take: this.take,
          },
          fetchPolicy: 'network-only',
        });

        console.log('I AM GRAPHQL SHIPMENTS RESPONSE: ', response.data);
        const data = response.data?.trips;
        const incomingItems = data?.items ?? [];

        if (isLoadMore) {
          this.trips.push(...incomingItems);
        } else {
          this.trips = incomingItems;
        }

        this.totalCount = data?.totalCount ?? 0;
        this.hasMore = data?.hasMore ?? false;
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
    async updateRowsPerPage(newLimit: number) {
      this.take = newLimit;
      this.skip = 0;
      await this.fetchUsers(false);
    },

    async fetchUsers(isLoadMore = false) {
      this.loading = true;
      try {
        const response = await apolloClient.query({
          query: GET_PAGINATED_USERS,
          variables: {
            skip: this.skip,
            take: this.take,
          },
          fetchPolicy: 'network-only',
        });

        console.log('I AM GRAPHQL USERS RESPONSE: ', response.data);
        const data = response.data?.user;
        const incomingItems = data?.items ?? [];

        if (isLoadMore) {
          this.user.push(...incomingItems);
        } else {
          this.user = incomingItems;
        }

        this.totalCount = data?.totalCount ?? 0;
        this.hasMore = data?.hasMore ?? false;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    async goToPage(page: number) {
      this.skip = (page - 1) * this.take;
      await this.fetchUsers();
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
        console.log('I AM GRAPHQL PORT RESPONSE: ', data.data);
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
        console.log('I AM GRAPHQL PORT RESPONSE: ', data);
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
    // async submitShipment() {
    //   this.loading = true;
    //   console.log(typeof shipmentForm.volumex, typeof shipmentForm.volumey);

    //   try {
    //     const { data } = await apolloClient.mutate({
    //       mutation: POST_NEW_SHIPMENTINFO,
    //       variables: {
    //         input: {
    //           ...shipmentForm,
    //           volumex: Number(shipmentForm.volumex),
    //           volumey: Number(shipmentForm.volumey),
    //         },
    //       },
    //     });

    //     console.log('Shipment created: ', data.createShipment);
    //     return data.createShipment;
    //   } catch (err) {
    //     console.error(err);

    //     throw err;
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    async submitShipment() {
      const payload = {
        ...shipmentForm,
        estimated_time_arrival: new Date(shipmentForm.estimated_time_arrival).toISOString(),

        finances: shipmentForm.finances.map((f) => ({
          title: f.title,
          type: f.type,
          value: Number(f.value),
        })),
      };

      const { data } = await apolloClient.mutate({
        mutation: POST_NEW_SHIPMENTINFO,
        variables: { input: payload },
      });

      return data.createShipment;
    },
  },
});

export const useUsersInfo = defineStore('postShipment', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async submitShipment() {
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
