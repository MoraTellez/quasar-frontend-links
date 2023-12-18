import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios.js'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const expiresIn = ref(null)

  const access = async () => {
    try {
      const res = await api.post(`/auth/login`, {
        email: "mora@gmail.com",
        password: "mora123"
      })

      token.value = res.data.token
      expiresIn.value = res.data.expiresIn

      sessionStorage.setItem('user', true)
    } catch (error) {
      console.log(error)
    }
  }

  const refreshToken = async () => {
    try {
      const res = await api.get(`/auth/refresh`)
      token.value = res.data.token
      expiresIn.value = res.data.expiresIn
      sessionStorage.setItem('user', true)
      setTime()
    } catch (error) {
      console.log(error)
      sessionStorage.removeItem('user')
    }
  }

  const setTime = () => {
    setTimeout(() => {
      refreshToken()
    }, expiresIn.value * 1000 - 10000)
  }

  const logout = async () => {
    try {
      await api.get(`/auth/logout`)
    } catch (error) {
      console.log(error)
    } finally {
      resetStore()
      sessionStorage.removeItem('user')
    }
  }

  const resetStore = () => {
    token.value = null
    expiresIn.value = null
  }

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout
  }
})
