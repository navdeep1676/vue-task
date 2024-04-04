import { apiService } from '@/helpers/apiCallHander'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({ token: '' }),
  persist: true,

  actions: {
    clearToken() {
      this.token = ''
    },
    setToken(token: any) {
      this.token = token
    },
    async createUser(data: any) {
      const res = await apiService.POST('/api/register', data)
      return res
    },
    async loginUser(data: any) {
      const res = await apiService.POST('/api/login', data)
      return res
    }
  },
  getters: {
    IS_USER_AUTHENTICATE_GETTER(state) {
      return !!state.token
    },
    GET_TOKEN_GETTER(state) {
      return state.token
    }
  }
})
