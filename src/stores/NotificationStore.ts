import { defineStore } from 'pinia';
import { HTTP_API } from 'src/boot/axios';

interface NotifResponse {
    date: string
    rawData: {
        update_id: number
        callback_query: {
            id: string,
            from: {
                username: string
            }
            message: {
                telegramId: string,
                title: string
                details: string
            }
            data: string
        }
    }
}

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        loading: false,
        notifications: [
            {
                title: "",
                content: "",
                date: ""
            }
        ],
        rawResponse: {}
    }),

    actions: {
        async fetchNotifications(username: string) {
            this.loading = true;
            try {
                const response = await HTTP_API().get('/notifications?username=' + username);

                this.notifications = response.data.map((n: NotifResponse) => ({
                    date: n.date || '',
                    title: n.rawData.callback_query.message.title || '',
                    content: n.rawData.callback_query.message.details || '',
                }));

                console.log("NOTIFSS::", response.data.map((n: NotifResponse) => ({
                    date: n.date || '',
                    title: n.rawData.callback_query.message.title || '',
                    content: n.rawData.callback_query.message.details || '',
                })))

                this.rawResponse = response.data;


                return response.data;
            } catch (err) {
                console.error('Fetch Notifications Error:', err);
                throw err;
            } finally {
                this.loading = false;
            }
        },
    },
});
