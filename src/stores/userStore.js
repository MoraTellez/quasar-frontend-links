import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'src/boot/axios.js'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const expiresIn = ref(null)

  const access = async (email, password) => {
    try {
      const res = await api.post(`/auth/login`, {
        email,
        password
      })

      token.value = res.data.token
      expiresIn.value = res.data.expiresIn

      sessionStorage.setItem('user', true)
    } catch (error) {
      if(error.response) {
        throw error.response.data
      } else if ( error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }

      console.log(error.config)
    }
  }

  const register = async (email, password, repassword) => {
    try {
      const res = await api.post(`/auth/register`, {
        email,
        password,
        repassword
      })

      token.value = res.data.token
      expiresIn.value = res.data.expiresIn

      sessionStorage.setItem('user', true)
    } catch (error) {
      if(error.response) {
        throw error.response.data
      } else if ( error.request) {
        console.log(error.request)
      } else {
        console.log('Error', error.message)
      }

      console.log(error.config)
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
    logout,
    register
  }
})
