import { defineStore } from 'pinia';
import { HTTP_API } from 'src/boot/axios';

type CreateUsersPayload = {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  role_id: number;
};

export const useCreateUserStore = defineStore('createUserInfo', {
  state: () => ({
    loading: false,
  }),

  actions: {
    async createUser(payload: CreateUsersPayload) {
      this.loading = true;

      try {
        const { data } = await HTTP_API().post('/auth/register', payload);

        return data;
      } catch (err) {
        console.error('Login Error:', err);
        throw err;
      } finally {
        this.loading = false;
      }
    },
  },
});
