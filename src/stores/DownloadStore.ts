import { defineStore } from 'pinia';
import { HTTP_API } from 'src/boot/axios';

export const useDownloadStore = defineStore('download', {
    state: () => ({
        loading: false,
    }),

    actions: {
        async fetchCSVFileTrip(year: string) {
            this.loading = true;
            try {
                const response = await HTTP_API().get('/download/trip?year=' + Number(year));

                return response.data;
            } catch (err) {
                console.error('Fetch Dowload Trip Error:', err);
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async fetchCSVFileShipment(dateFrom: string, dateTo: string, consignee: string) {
            this.loading = true;
            try {
                const response = await HTTP_API().get('/download/shipment?dateFrom=' + dateFrom + '&dateTo=' + dateTo + '&customer=' + consignee);

                return response.data;
            } catch (err) {
                console.error('Fetch Dowload Shipment Error:', err);
                throw err;
            } finally {
                this.loading = false;
            }
        },
    },
});
