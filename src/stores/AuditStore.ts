import { defineStore } from 'pinia';
import { HTTP_API } from 'src/boot/axios';

export const useAuditStore = defineStore('audit', {
    state: () => ({
        monthlySales: {},
        loading: false,
    }),

    actions: {
        async fetchMonthlySales(year: string) {
            this.loading = true;
            try {
                const response = await HTTP_API().get('/audit/monthly_sales/' + Number(year));
                this.monthlySales = response.data;

                console.log('MONTHLY SALES:: ', response.data);

                return response.data;
            } catch (err) {
                console.error('Fetch Monthly Sales Error:', err);
                throw err;
            } finally {
                this.loading = false;
            }
        },
    },
});
